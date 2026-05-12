import Image from "next/image";
import type {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
} from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  usePortalPosition,
  type PortalResolverContext,
} from "@/hooks/use-portal-position";
import { useAssistantStore } from "@/store/assistant-store";

import {
  getPokeMessage,
  getRandomAssistantMessage,
} from "./assistant-message-utils";
import {
  assistantCharacters,
  assistantCharactersById,
  genericAssistantActivationMessage,
  type AssistantCharacterId,
  type AssistantMessage,
} from "./assistant-messages";

interface FloatingAssistantProps {
  externalMessage?: AssistantMessage;
  translateMessage: (message: AssistantMessage) => string;
}

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
}

interface AssistantPosition {
  x: number;
  y: number;
}

interface ShakeTracker {
  directionChanges: number;
  firstDirectionChangeAt: number;
  lastDirectionX: number;
  lastDirectionY: number;
  lastMessageAt: number;
  lastX: number;
  lastY: number;
}

const TASKBAR_HEIGHT = 48;
const ASSISTANT_SIZE = 80;
const MESSAGE_WIDTH = 260;
const MENU_WIDTH = 220;
const DEFAULT_ASSISTANT_GAP = 16;
const VIEWPORT_MARGIN = 8;
const OVERLAY_GAP = 8;
const SHAKE_AXIS_DISTANCE_THRESHOLD = 18;
const SHAKE_DIRECTION_WINDOW = 700;
const SHAKE_MESSAGE_COOLDOWN = 2200;
const SHAKE_REQUIRED_DIRECTION_CHANGES = 3;

const clampValue = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export const FloatingAssistant = ({
  externalMessage,
  translateMessage,
}: FloatingAssistantProps) => {
  const activeMessage = useAssistantStore((state) => state.activeMessage);
  const selectedAssistantId = useAssistantStore(
    (state) => state.selectedAssistantId,
  );
  const setActiveAssistantMessage = useAssistantStore(
    (state) => state.setActiveAssistantMessage,
  );
  const setSelectedAssistantId = useAssistantStore(
    (state) => state.setSelectedAssistantId,
  );
  const assistantRef = useRef<HTMLDivElement>(null);
  const viewportAnchorRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastMoveMessageIndexRef = useRef<number | null>(null);
  const lastShakeMessageIndexRef = useRef<number | null>(null);
  const shookDuringDragRef = useRef(false);
  const wasDraggedRef = useRef(false);
  const shakeTrackerRef = useRef<ShakeTracker>({
    directionChanges: 0,
    firstDirectionChangeAt: 0,
    lastDirectionX: 0,
    lastDirectionY: 0,
    lastMessageAt: 0,
    lastX: 0,
    lastY: 0,
  });
  const [pokeCount, setPokeCount] = useState(0);
  const [desiredPosition, setDesiredPosition] =
    useState<AssistantPosition | null>(null);
  const [isPositionReady, setIsPositionReady] = useState(false);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAssistantSwitcherOpen, setIsAssistantSwitcherOpen] = useState(false);

  const selectedAssistant = assistantCharactersById[selectedAssistantId];
  const selectedMessages = selectedAssistant.messages;
  const message = translateMessage(
    activeMessage ?? selectedAssistant.initialMessage,
  );
  const [messagePlacement, setMessagePlacement] = useState<"left" | "right">(
    "left",
  );

  const resolveAssistantPosition = useCallback(
    ({ portalRect, viewportWidth, viewportHeight }: PortalResolverContext) => {
      const portalWidth = portalRect?.width || ASSISTANT_SIZE;
      const portalHeight = portalRect?.height || ASSISTANT_SIZE;
      const maxLeft = viewportWidth - portalWidth - VIEWPORT_MARGIN;
      const maxTop = viewportHeight - portalHeight - TASKBAR_HEIGHT;
      const rawLeft =
        desiredPosition?.x ??
        viewportWidth - portalWidth - DEFAULT_ASSISTANT_GAP;
      const rawTop =
        desiredPosition?.y ?? DEFAULT_ASSISTANT_GAP;

      return {
        left: clampValue(
          rawLeft,
          VIEWPORT_MARGIN,
          Math.max(VIEWPORT_MARGIN, maxLeft),
        ),
        top: clampValue(
          rawTop,
          VIEWPORT_MARGIN,
          Math.max(VIEWPORT_MARGIN, maxTop),
        ),
      };
    },
    [desiredPosition],
  );

  const resolveMessagePosition = useCallback(
    ({
      triggerRect,
      portalRect,
      viewportWidth,
      viewportHeight,
    }: PortalResolverContext) => {
      const portalWidth = portalRect?.width || MESSAGE_WIDTH;
      const portalHeight = portalRect?.height || 0;
      const hasSpaceLeft =
        triggerRect.left >= portalWidth + OVERLAY_GAP + VIEWPORT_MARGIN;
      setMessagePlacement(hasSpaceLeft ? "left" : "right");

      const rawLeft = hasSpaceLeft
        ? triggerRect.left - portalWidth - OVERLAY_GAP
        : triggerRect.right + OVERLAY_GAP;
      const maxLeft = viewportWidth - portalWidth - VIEWPORT_MARGIN;
      const rawTop =
        triggerRect.top + triggerRect.height - portalHeight - OVERLAY_GAP;
      const maxTop = viewportHeight - portalHeight - TASKBAR_HEIGHT;

      return {
        left: clampValue(
          rawLeft,
          VIEWPORT_MARGIN,
          Math.max(VIEWPORT_MARGIN, maxLeft),
        ),
        top: clampValue(
          rawTop,
          VIEWPORT_MARGIN,
          Math.max(VIEWPORT_MARGIN, maxTop),
        ),
        width: MESSAGE_WIDTH,
      };
    },
    [],
  );

  const resolveMenuPosition = useCallback(
    ({
      triggerRect,
      portalRect,
      viewportWidth,
      viewportHeight,
    }: PortalResolverContext) => {
      const portalWidth = portalRect?.width || MENU_WIDTH;
      const portalHeight = portalRect?.height || 0;
      const hasSpaceRight =
        viewportWidth - triggerRect.right >= portalWidth + OVERLAY_GAP;
      const rawLeft = hasSpaceRight
        ? triggerRect.right + OVERLAY_GAP
        : triggerRect.left - portalWidth - OVERLAY_GAP;
      const maxLeft = viewportWidth - portalWidth - VIEWPORT_MARGIN;
      const rawTop = triggerRect.top;
      const maxTop = viewportHeight - portalHeight - TASKBAR_HEIGHT;

      return {
        left: clampValue(
          rawLeft,
          VIEWPORT_MARGIN,
          Math.max(VIEWPORT_MARGIN, maxLeft),
        ),
        top: clampValue(
          rawTop,
          VIEWPORT_MARGIN,
          Math.max(VIEWPORT_MARGIN, maxTop),
        ),
        width: MENU_WIDTH,
      };
    },
    [],
  );

  const {
    hasPosition: hasAssistantPosition,
    position: assistantPosition,
    updatePosition: updateAssistantPosition,
  } = usePortalPosition({
    triggerRef: viewportAnchorRef,
    portalRef: assistantRef,
    isOpen: isPositionReady,
    resolvePosition: resolveAssistantPosition,
    watchDeps: [desiredPosition?.x, desiredPosition?.y],
  });

  const {
    hasPosition: hasMessagePosition,
    position: messagePosition,
    updatePosition: updateMessagePosition,
  } = usePortalPosition({
    triggerRef: assistantRef,
    portalRef: messageRef,
    isOpen: hasAssistantPosition,
    resolvePosition: resolveMessagePosition,
    watchDeps: [
      message,
      assistantPosition.left,
      assistantPosition.top,
      selectedAssistantId,
    ],
  });

  const { position: menuPosition, prepareOpenPosition: prepareMenuPosition } =
    usePortalPosition({
      triggerRef: assistantRef,
      portalRef: menuRef,
      isOpen: isMenuOpen,
      resolvePosition: resolveMenuPosition,
      watchDeps: [
        isAssistantSwitcherOpen,
        assistantPosition.left,
        assistantPosition.top,
      ],
    });

  useEffect(() => {
    if (!externalMessage) return;

    setActiveAssistantMessage(externalMessage);
  }, [externalMessage, setActiveAssistantMessage]);

  useEffect(() => {
    setPokeCount(0);
    lastMoveMessageIndexRef.current = null;
    lastShakeMessageIndexRef.current = null;
  }, [selectedAssistantId]);

  useIsomorphicLayoutEffect(() => {
    updateAssistantPosition();
    setIsPositionReady(true);
  }, [updateAssistantPosition]);

  useIsomorphicLayoutEffect(() => {
    if (!hasAssistantPosition) return;

    updateMessagePosition();
  }, [
    assistantPosition.left,
    assistantPosition.top,
    hasAssistantPosition,
    message,
    selectedAssistantId,
    updateMessagePosition,
  ]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleOutsideClick = (event: globalThis.MouseEvent) => {
      if (menuRef.current?.contains(event.target as Node)) return;
      if (assistantRef.current?.contains(event.target as Node)) return;

      setIsMenuOpen(false);
      setIsAssistantSwitcherOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMenuOpen]);

  const handlePoke = () => {
    setPokeCount((currentCount) => {
      const nextCount = currentCount + 1;

      setActiveAssistantMessage(getPokeMessage(selectedAssistantId, nextCount));

      return nextCount;
    });
  };

  const getRandomMoveMessage = () => {
    const result = getRandomAssistantMessage(
      selectedMessages.move,
      lastMoveMessageIndexRef.current,
    );

    lastMoveMessageIndexRef.current = result.index;

    return result.message;
  };

  const getRandomShakeMessage = () => {
    const result = getRandomAssistantMessage(
      selectedMessages.shake,
      lastShakeMessageIndexRef.current,
    );

    lastShakeMessageIndexRef.current = result.index;

    return result.message;
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    shookDuringDragRef.current = false;
    wasDraggedRef.current = false;
    shakeTrackerRef.current = {
      directionChanges: 0,
      firstDirectionChangeAt: 0,
      lastDirectionX: 0,
      lastDirectionY: 0,
      lastMessageAt: shakeTrackerRef.current.lastMessageAt,
      lastX: event.clientX,
      lastY: event.clientY,
    };
    setDragState({
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: assistantPosition.left ?? VIEWPORT_MARGIN,
      originY: assistantPosition.top,
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const distanceX = event.clientX - dragState.startX;
    const distanceY = event.clientY - dragState.startY;
    const now = performance.now();
    const shakeTracker = shakeTrackerRef.current;
    const segmentX = event.clientX - shakeTracker.lastX;
    const segmentY = event.clientY - shakeTracker.lastY;
    const directionX =
      Math.abs(segmentX) >= SHAKE_AXIS_DISTANCE_THRESHOLD
        ? Math.sign(segmentX)
        : 0;
    const directionY =
      Math.abs(segmentY) >= SHAKE_AXIS_DISTANCE_THRESHOLD
        ? Math.sign(segmentY)
        : 0;

    if (Math.abs(distanceX) > 3 || Math.abs(distanceY) > 3) {
      wasDraggedRef.current = true;
    }

    if (directionX !== 0 || directionY !== 0) {
      const changedDirection =
        (directionX !== 0 &&
          shakeTracker.lastDirectionX !== 0 &&
          directionX !== shakeTracker.lastDirectionX) ||
        (directionY !== 0 &&
          shakeTracker.lastDirectionY !== 0 &&
          directionY !== shakeTracker.lastDirectionY);

      if (
        changedDirection &&
        now - shakeTracker.firstDirectionChangeAt > SHAKE_DIRECTION_WINDOW
      ) {
        shakeTracker.directionChanges = 0;
        shakeTracker.firstDirectionChangeAt = now;
      }

      if (changedDirection) {
        shakeTracker.directionChanges += 1;

        if (shakeTracker.firstDirectionChangeAt === 0) {
          shakeTracker.firstDirectionChangeAt = now;
        }
      }

      if (directionX !== 0) {
        shakeTracker.lastDirectionX = directionX;
      }

      if (directionY !== 0) {
        shakeTracker.lastDirectionY = directionY;
      }

      if (
        shakeTracker.directionChanges >= SHAKE_REQUIRED_DIRECTION_CHANGES &&
        now - shakeTracker.firstDirectionChangeAt <= SHAKE_DIRECTION_WINDOW &&
        now - shakeTracker.lastMessageAt >= SHAKE_MESSAGE_COOLDOWN
      ) {
        setActiveAssistantMessage(getRandomShakeMessage());
        shookDuringDragRef.current = true;
        shakeTracker.directionChanges = 0;
        shakeTracker.firstDirectionChangeAt = 0;
        shakeTracker.lastMessageAt = now;
      }

      shakeTracker.lastX = event.clientX;
      shakeTracker.lastY = event.clientY;
    }

    setDesiredPosition({
      x: dragState.originX + distanceX,
      y: dragState.originY + distanceY,
    });
    updateAssistantPosition();
    updateMessagePosition();
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    event.currentTarget.releasePointerCapture(event.pointerId);
    setDragState(null);

    if (wasDraggedRef.current) {
      wasDraggedRef.current = false;

      if (!shookDuringDragRef.current) {
        setActiveAssistantMessage(getRandomMoveMessage());
      }

      shookDuringDragRef.current = false;
      return;
    }

    shookDuringDragRef.current = false;
    handlePoke();
  };

  const handleAssistantKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    handlePoke();
  };

  const handleContextMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsMenuOpen(true);
    setIsAssistantSwitcherOpen(false);
    prepareMenuPosition();
  };

  const handleAdviceClick = () => {
    const result = getRandomAssistantMessage(selectedMessages.advice, null);

    setActiveAssistantMessage(result.message);
    setIsMenuOpen(false);
  };

  const handleAssistantSelect = (assistantId: AssistantCharacterId) => {
    const assistant = assistantCharactersById[assistantId];

    setSelectedAssistantId(assistantId);
    setActiveAssistantMessage(
      assistant.activationMessage ?? genericAssistantActivationMessage,
    );
    setIsMenuOpen(false);
    setIsAssistantSwitcherOpen(false);
  };

  const assistantStyle: CSSProperties = {
    ...assistantPosition,
    opacity: isPositionReady ? 1 : 0,
  };
  const messageStyle: CSSProperties = {
    ...messagePosition,
    opacity: hasAssistantPosition && hasMessagePosition ? 1 : 0,
  };
  const messageArrowClassName =
    messagePlacement === "left"
      ? "after:right-[-7px] after:border-r-2 after:border-t-2"
      : "after:left-[-7px] after:border-b-2 after:border-l-2";

  return (
    <>
      <div
        ref={viewportAnchorRef}
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
      />

      <div
        ref={assistantRef}
        className="fixed z-[120] h-20 w-20 touch-none select-none font-retro"
        style={assistantStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <button
          type="button"
          className="floating-assistant-sprite relative h-full w-full"
          aria-label={translateMessage(selectedAssistant.ariaLabel)}
          onContextMenu={handleContextMenu}
          onKeyDown={handleAssistantKeyDown}
        >
          <Image
            src={selectedAssistant.image}
            alt={translateMessage(selectedAssistant.alt)}
            fill
            className="object-contain"
            draggable={false}
            sizes="200px"
          />
        </button>
      </div>

      <div
        ref={messageRef}
        className={`retro-border fixed z-[119] bg-retro-gray p-1 font-retro text-xs leading-snug text-black shadow-retro after:absolute after:bottom-3 after:h-3 after:w-3 after:rotate-45 after:border-black after:bg-retro-gray after:content-[''] ${messageArrowClassName}`}
        style={messageStyle}
      >
        <div className="retro-titlebar h-5 px-1">
          <span className="truncate">{selectedAssistant.name}</span>
          <span className="retro-border-inset flex h-4 w-4 items-center justify-center bg-retro-gray text-[10px] text-black">
            !
          </span>
        </div>
        <div className="retro-border-inset bg-white p-2">
          <p>{message}</p>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          ref={menuRef}
          className="retro-border fixed z-[140] bg-retro-gray font-retro text-xs text-black shadow-retro"
          style={menuPosition}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="retro-titlebar h-6">
            <span>{selectedAssistant.name}</span>
            <span className="retro-border-inset flex h-4 w-4 items-center justify-center bg-retro-gray text-[10px] text-black">
              ?
            </span>
          </div>

          <div className="p-1">
            <button
              type="button"
              className="flex h-8 w-full items-center gap-2 px-2 text-left hover:bg-[#0b6f35] hover:text-white focus:bg-[#0b6f35] focus:text-white focus:outline-none"
              onClick={handleAdviceClick}
            >
              <span className="retro-border-inset flex h-5 w-5 items-center justify-center bg-white text-black">
                ?
              </span>
              <span className="truncate font-bold">
                {translateMessage({
                  pt: "Me dê um conselho",
                  en: "Give me advice",
                })}
              </span>
            </button>

            <button
              type="button"
              className="flex h-8 w-full items-center gap-2 px-2 text-left hover:bg-[#0b6f35] hover:text-white focus:bg-[#0b6f35] focus:text-white focus:outline-none"
              onClick={() => setIsAssistantSwitcherOpen((isOpen) => !isOpen)}
            >
              <span className="retro-border-inset flex h-5 w-5 items-center justify-center bg-white text-black">
                ↔
              </span>
              <span className="truncate font-bold">
                {translateMessage({
                  pt: "Trocar assistente",
                  en: "Switch assistant",
                })}
              </span>
            </button>

            {isAssistantSwitcherOpen ? (
              <div className="my-1 border-t border-[#6f6f6f] bg-white pt-[2px]">
                {assistantCharacters.map((assistant) => {
                  const isSelected = assistant.id === selectedAssistantId;

                  return (
                    <button
                      key={assistant.id}
                      type="button"
                      className="flex h-7 w-full items-center px-2 text-left font-bold hover:bg-[#0b6f35] hover:text-white focus:bg-[#0b6f35] focus:text-white focus:outline-none disabled:text-gray-500 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                      disabled={isSelected}
                      onClick={() => handleAssistantSelect(assistant.id)}
                    >
                      <span className="truncate">{assistant.name}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};
