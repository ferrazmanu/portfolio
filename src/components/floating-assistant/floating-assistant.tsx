import Image from "next/image";
import type {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
} from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  usePortalPosition,
  type PortalResolverContext,
} from "@/hooks/use-portal-position";
import { RetroMessage } from "@/components/retro-message";
import { RetroMenu, type RetroMenuItemConfig } from "@/components/retro-menu";
import { useAssistantStore } from "@/store/assistant-store";

import { getPokeMessage } from "./assistant-message-utils";
import {
  assistantCharacters,
  assistantCharactersById,
  genericAssistantActivationMessage,
  type AssistantCharacterId,
  type AssistantMessage,
} from "./assistant-messages";
import { PixelDissolvePresence } from "./pixel-dissolve-presence";
import { useRandomAssistantMessage } from "./use-random-assistant-message";

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
const ASSISTANT_RENDER_SIZE = 100;
const MESSAGE_WIDTH = 260;
const MESSAGE_HEIGHT = 96;
const MENU_WIDTH = 220;
const DEFAULT_ASSISTANT_GAP = 16;
const VIEWPORT_MARGIN = 8;
const OVERLAY_GAP = 8;
const SHAKE_AXIS_DISTANCE_THRESHOLD = 18;
const SHAKE_DIRECTION_WINDOW = 700;
const SHAKE_MESSAGE_COOLDOWN = 2200;
const SHAKE_REQUIRED_DIRECTION_CHANGES = 3;
const LONG_PRESS_MENU_DELAY = 550;
const DISMISS_ANIMATION_DELAY = 1100;
const RESTORE_ANIMATION_DELAY = 900;

const clampValue = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export const FloatingAssistant = ({
  externalMessage,
  translateMessage,
}: FloatingAssistantProps) => {
  const activeMessage = useAssistantStore((state) => state.activeMessage);
  const assistantHideRequestId = useAssistantStore(
    (state) => state.assistantHideRequestId,
  );
  const isAssistantHidden = useAssistantStore(
    (state) => state.isAssistantHidden,
  );
  const selectedAssistantId = useAssistantStore(
    (state) => state.selectedAssistantId,
  );
  const hideAssistant = useAssistantStore((state) => state.hideAssistant);
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
  const dismissTimerRef = useRef<number | null>(null);
  const lastHideRequestIdRef = useRef(assistantHideRequestId);
  const longPressTimerRef = useRef<number | null>(null);
  const shookDuringDragRef = useRef(false);
  const openedMenuFromLongPressRef = useRef(false);
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
  const [isDismissing, setIsDismissing] = useState(false);
  const [isMessageCollapsed, setIsMessageCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAssistantSwitcherOpen, setIsAssistantSwitcherOpen] = useState(false);

  const selectedAssistant = assistantCharactersById[selectedAssistantId];
  const selectedMessages = selectedAssistant.messages;
  const getRandomMoveMessage = useRandomAssistantMessage(
    selectedMessages.move,
    selectedAssistantId,
  );
  const getRandomShakeMessage = useRandomAssistantMessage(
    selectedMessages.shake,
    selectedAssistantId,
  );
  const getRandomAdviceMessage = useRandomAssistantMessage(
    selectedMessages.advice,
    selectedAssistantId,
  );
  const message = translateMessage(
    activeMessage ?? selectedAssistant.initialMessage,
  );
  const [messagePlacement, setMessagePlacement] = useState<"left" | "right">(
    "left",
  );
  const [menuPlacement, setMenuPlacement] = useState<"left" | "right">("right");

  const resolveAssistantPosition = useCallback(
    ({ portalRect, viewportWidth, viewportHeight }: PortalResolverContext) => {
      const portalWidth = portalRect?.width || ASSISTANT_SIZE;
      const portalHeight = portalRect?.height || ASSISTANT_SIZE;
      const maxLeft = viewportWidth - portalWidth - VIEWPORT_MARGIN;
      const maxTop = viewportHeight - portalHeight - TASKBAR_HEIGHT;
      const rawLeft =
        desiredPosition?.x ??
        viewportWidth - portalWidth - DEFAULT_ASSISTANT_GAP;
      const rawTop = desiredPosition?.y ?? DEFAULT_ASSISTANT_GAP;

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
      setMenuPlacement(hasSpaceRight ? "right" : "left");
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
    setIsMessageCollapsed(false);
  }, [externalMessage, setActiveAssistantMessage]);

  useEffect(() => {
    setPokeCount(0);
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

  useEffect(
    () => () => {
      if (longPressTimerRef.current) {
        window.clearTimeout(longPressTimerRef.current);
      }

      if (dismissTimerRef.current) {
        window.clearTimeout(dismissTimerRef.current);
      }

    },
    [],
  );

  const clearLongPressTimer = () => {
    if (!longPressTimerRef.current) return;

    window.clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = null;
  };

  const handlePoke = () => {
    setPokeCount((currentCount) => {
      const nextCount = currentCount + 1;

      setActiveAssistantMessage(getPokeMessage(selectedAssistantId, nextCount));
      setIsMessageCollapsed(false);

      return nextCount;
    });
  };

  const openAssistantMenu = () => {
    setIsMenuOpen(true);
    setIsAssistantSwitcherOpen(false);
    prepareMenuPosition();
  };

  const startHideAssistant = useCallback(() => {
    if (isDismissing || isAssistantHidden) return;

    setActiveAssistantMessage(
      selectedAssistant.farewellMessage ?? {
        pt: "Tudo bem. Vou sumir em pixels por um tempo.",
        en: "Fine. I will disappear into pixels for a while.",
      },
    );
    setIsMessageCollapsed(false);
    setIsMenuOpen(false);
    setIsAssistantSwitcherOpen(false);
    setIsDismissing(true);

    dismissTimerRef.current = window.setTimeout(() => {
      hideAssistant();
      setIsDismissing(false);
      dismissTimerRef.current = null;
    }, DISMISS_ANIMATION_DELAY);
  }, [
    hideAssistant,
    isAssistantHidden,
    isDismissing,
    selectedAssistant.farewellMessage,
    setActiveAssistantMessage,
  ]);

  useEffect(() => {
    if (lastHideRequestIdRef.current === assistantHideRequestId) return;

    lastHideRequestIdRef.current = assistantHideRequestId;
    startHideAssistant();
  }, [assistantHideRequestId, startHideAssistant]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (isDismissing) return;
    if (event.button !== 0) return;

    clearLongPressTimer();
    event.currentTarget.setPointerCapture(event.pointerId);
    shookDuringDragRef.current = false;
    openedMenuFromLongPressRef.current = false;
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

    if (event.pointerType !== "mouse") {
      longPressTimerRef.current = window.setTimeout(() => {
        if (wasDraggedRef.current) return;

        longPressTimerRef.current = null;
        openedMenuFromLongPressRef.current = true;
        openAssistantMenu();
      }, LONG_PRESS_MENU_DELAY);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    if (openedMenuFromLongPressRef.current) return;

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
      clearLongPressTimer();
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

    clearLongPressTimer();
    event.currentTarget.releasePointerCapture(event.pointerId);
    setDragState(null);

    if (openedMenuFromLongPressRef.current) {
      openedMenuFromLongPressRef.current = false;
      shookDuringDragRef.current = false;
      wasDraggedRef.current = false;
      return;
    }

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
    openAssistantMenu();
  };

  const handleAdviceClick = () => {
    setActiveAssistantMessage(getRandomAdviceMessage());
    setIsMessageCollapsed(false);
    setIsMenuOpen(false);
  };

  const handleAssistantSelect = (assistantId: AssistantCharacterId) => {
    const assistant = assistantCharactersById[assistantId];

    setSelectedAssistantId(assistantId);
    setActiveAssistantMessage(
      assistant.activationMessage ?? genericAssistantActivationMessage,
    );
    setIsMessageCollapsed(false);
    setIsMenuOpen(false);
    setIsAssistantSwitcherOpen(false);
  };

  const assistantRect = assistantRef.current?.getBoundingClientRect();
  const messageRect = messageRef.current?.getBoundingClientRect();
  const assistantLeft = assistantPosition.left ?? VIEWPORT_MARGIN;
  const assistantTop = assistantPosition.top;
  const assistantWidth = assistantRect?.width ?? ASSISTANT_RENDER_SIZE;
  const assistantHeight = assistantRect?.height ?? ASSISTANT_RENDER_SIZE;
  const messageLeft = messagePosition.left ?? assistantLeft - MESSAGE_WIDTH;
  const messageTop = messagePosition.top;
  const messageWidth = messagePosition.width ?? MESSAGE_WIDTH;
  const messageHeight = messageRect?.height ?? MESSAGE_HEIGHT;
  const presenceLeft = Math.floor(Math.min(assistantLeft, messageLeft));
  const presenceTop = Math.floor(Math.min(assistantTop, messageTop));
  const presenceRight = Math.ceil(
    Math.max(assistantLeft + assistantWidth, messageLeft + messageWidth),
  );
  const presenceBottom = Math.ceil(
    Math.max(assistantTop + assistantHeight, messageTop + messageHeight),
  );
  const presenceWidth = Math.max(1, presenceRight - presenceLeft);
  const presenceHeight = Math.max(1, presenceBottom - presenceTop);
  const assistantStyle: CSSProperties = {
    left: assistantLeft - presenceLeft,
    opacity: isPositionReady ? 1 : 0,
    top: assistantTop - presenceTop,
  };
  const messageStyle: CSSProperties = {
    left: messageLeft - presenceLeft,
    opacity: hasAssistantPosition && hasMessagePosition ? 1 : 0,
    position: "absolute",
    top: messageTop - presenceTop,
    width: messageWidth,
  };
  const messageArrowPlacement = messagePlacement === "left" ? "right" : "left";
  const menuArrowPlacement = menuPlacement === "right" ? "left" : "right";

  const menuItems: RetroMenuItemConfig[] = [
    {
      id: "advice",
      icon: "?",
      label: translateMessage({
        pt: "Me dê um conselho",
        en: "Give me advice",
      }),
      onClick: handleAdviceClick,
    },
    {
      id: "switch-assistant",
      icon: "<>",
      label: translateMessage({
        pt: "Trocar assistente",
        en: "Switch assistant",
      }),
      onClick: () => setIsAssistantSwitcherOpen((isOpen) => !isOpen),
    },
    {
      id: "hide-assistant",
      icon: "_",
      label: translateMessage({
        pt: "Ocultar assistente",
        en: "Hide assistant",
      }),
      onClick: startHideAssistant,
    },
  ];

  const assistantSwitcherItems: RetroMenuItemConfig[] = assistantCharacters.map(
    (assistant) => ({
      disabled: assistant.id === selectedAssistantId,
      id: assistant.id,
      label: assistant.name,
      onClick: () => handleAssistantSelect(assistant.id),
    }),
  );

  if (isAssistantHidden && !isDismissing) return null;

  return (
    <>
      <div
        ref={viewportAnchorRef}
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
      />

      <PixelDissolvePresence
        data-floating-assistant="true"
        className="assistant-pixel-presence pointer-events-none fixed z-[120]"
        dismissDurationMs={DISMISS_ANIMATION_DELAY}
        height={presenceHeight}
        pixelSize={8}
        restoreDurationMs={RESTORE_ANIMATION_DELAY}
        style={{
          height: presenceHeight,
          left: presenceLeft,
          top: presenceTop,
          width: presenceWidth,
        }}
        visible={!isDismissing}
        width={presenceWidth}
      >
        <div
          ref={assistantRef}
          className="pointer-events-auto absolute z-[120] h-[6vw] w-[6vw] min-h-[100px] min-w-[100px] touch-none select-none font-retro"
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

        <RetroMessage
          ref={messageRef}
          arrowPlacement={messageArrowPlacement}
          className={`pointer-events-auto ${
            isMessageCollapsed ? "assistant-message-collapsed" : ""
          }`}
          style={messageStyle}
          title={selectedAssistant.name}
          titleAccessory={
            <button
              type="button"
              className={`flex h-4 w-4 items-center justify-center bg-retro-gray text-[10px] text-black ${
                isMessageCollapsed
                  ? "retro-border bg-[#f1f1f1]"
                  : "retro-border-inset"
              }`}
              aria-label={
                isMessageCollapsed
                  ? translateMessage({
                      pt: "Mostrar mensagem do assistente",
                      en: "Show assistant message",
                    })
                  : translateMessage({
                      pt: "Ocultar mensagem do assistente",
                      en: "Hide assistant message",
                    })
              }
              aria-pressed={isMessageCollapsed}
              onClick={() =>
                setIsMessageCollapsed((currentValue) => !currentValue)
              }
            >
              !
            </button>
          }
        >
          <p>{message}</p>
        </RetroMessage>
      </PixelDissolvePresence>

      {isMenuOpen ? (
        <RetroMenu
          ref={menuRef}
          arrowPlacement={menuArrowPlacement}
          style={menuPosition}
          items={menuItems}
          onPointerDown={(event) => event.stopPropagation()}
          title={selectedAssistant.name}
          titleAccessory={
            <span className="retro-border-inset flex h-4 w-4 items-center justify-center bg-retro-gray text-[10px] text-black">
              ?
            </span>
          }
        >
          {isAssistantSwitcherOpen ? (
            <RetroMenu
              arrowPlacement={menuArrowPlacement}
              className="static mt-1 border-t border-[#6f6f6f] bg-white pt-[2px] shadow-none after:hidden"
              items={assistantSwitcherItems}
            />
          ) : null}
        </RetroMenu>
      ) : null}
    </>
  );
};
