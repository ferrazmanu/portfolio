import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";

import {
  DESKTOP_ICON_HEIGHT,
  DESKTOP_ICON_WIDTH,
  DESKTOP_TASKBAR_HEIGHT,
  DesktopIcon,
  type DesktopIconPosition,
} from "@/components/desktop-icon";
import { DesktopWindowContent } from "@/components/desktop/desktop-window-content";
import { desktopWindows, initialIconPositions } from "@/components/desktop/desktop-config";
import type { LocalizedText, WindowId } from "@/components/desktop/types";
import { ProjectPreviewWindow } from "@/components/desktop/windows/projects/project-preview-window";
import {
  assistantCharactersById,
  genericAssistantActivationMessage,
} from "@/components/floating-assistant/assistant-messages";
import { FloatingAssistant } from "@/components/floating-assistant/floating-assistant";
import { ImagePreviewWindow } from "@/components/image-preview-window";
import { RetroMenu } from "@/components/retro-menu";
import { RetroWindow } from "@/components/retro-window";
import { Taskbar } from "@/components/taskbar";
import { useTranslation } from "@/hooks/use-translation";
import { useAssistantStore } from "@/store/assistant-store";
import { useDesktopStore } from "@/store/desktop-store";
import { retroTheme } from "@/theme/retro-theme";

const ICON_DESIGN_WIDTH = 1200;
const ICON_DESIGN_HEIGHT = 620;
const DESKTOP_CONTEXT_MENU_WIDTH = 190;
const DESKTOP_CONTEXT_MENU_MARGIN = 8;
const DESKTOP_CONTEXT_MENU_HEIGHT = 80;
const DESKTOP_LONG_PRESS_MENU_DELAY = 550;
const DESKTOP_LONG_PRESS_MOVE_THRESHOLD = 8;

interface DesktopLongPressState {
  pointerId: number;
  startX: number;
  startY: number;
}

const genericAllMinimizedMessage: LocalizedText = {
  pt: "Tudo minimizado. Nova fase: contemplar o vazio organizado.",
  en: "Everything minimized. New phase: contemplating the organized void.",
};

const clampIconPosition = (
  position: DesktopIconPosition,
): DesktopIconPosition => {
  const maxX = Math.max(0, window.innerWidth - DESKTOP_ICON_WIDTH);
  const maxY = Math.max(
    0,
    window.innerHeight - DESKTOP_ICON_HEIGHT - DESKTOP_TASKBAR_HEIGHT,
  );

  return {
    x: Math.min(maxX, Math.max(0, position.x)),
    y: Math.min(maxY, Math.max(0, position.y)),
  };
};

const getResponsiveIconPositions = (): Record<WindowId, DesktopIconPosition> =>
  desktopWindows.reduce<Record<WindowId, DesktopIconPosition>>(
    (positions, windowItem) => {
      const maxDesignX = ICON_DESIGN_WIDTH - DESKTOP_ICON_WIDTH;
      const maxDesignY =
        ICON_DESIGN_HEIGHT - DESKTOP_ICON_HEIGHT - DESKTOP_TASKBAR_HEIGHT;
      const maxViewportX = Math.max(0, window.innerWidth - DESKTOP_ICON_WIDTH);
      const maxViewportY = Math.max(
        0,
        window.innerHeight - DESKTOP_ICON_HEIGHT - DESKTOP_TASKBAR_HEIGHT,
      );

      return {
        ...positions,
        [windowItem.id]: clampIconPosition({
          x: (windowItem.iconPosition.x / maxDesignX) * maxViewportX,
          y: (windowItem.iconPosition.y / maxDesignY) * maxViewportY,
        }),
      };
    },
    initialIconPositions,
  );

const getTopVisibleWindowId = (
  openWindows: Record<WindowId, boolean>,
  minimizedWindows: Record<WindowId, boolean>,
  windowOrder: Record<WindowId, number>,
): WindowId | null => {
  const visibleWindows = desktopWindows.filter(
    (windowItem) =>
      openWindows[windowItem.id] && !minimizedWindows[windowItem.id],
  );

  if (visibleWindows.length === 0) return null;

  return visibleWindows.reduce((topWindow, windowItem) =>
    windowOrder[windowItem.id] > windowOrder[topWindow.id]
      ? windowItem
      : topWindow,
  ).id;
};

export default function Home() {
  const { handleTranslation } = useTranslation();
  const selectedAssistantId = useAssistantStore(
    (state) => state.selectedAssistantId,
  );
  const isAssistantHidden = useAssistantStore(
    (state) => state.isAssistantHidden,
  );
  const setActiveAssistantMessage = useAssistantStore(
    (state) => state.setActiveAssistantMessage,
  );
  const requestHideAssistant = useAssistantStore(
    (state) => state.requestHideAssistant,
  );
  const showAssistant = useAssistantStore((state) => state.showAssistant);
  const openWindows = useDesktopStore((state) => state.openWindows);
  const minimizedWindows = useDesktopStore((state) => state.minimizedWindows);
  const activeWindowId = useDesktopStore((state) => state.activeWindowId);
  const iconPositions = useDesktopStore((state) => state.iconPositions);
  const windowOrder = useDesktopStore((state) => state.windowOrder);
  const selectedProjectName = useDesktopStore(
    (state) => state.selectedProjectName,
  );
  const selectedImageId = useDesktopStore((state) => state.selectedImageId);
  const assistantExternalMessage = useDesktopStore(
    (state) => state.assistantExternalMessage,
  );
  const setActiveWindowId = useDesktopStore(
    (state) => state.setActiveWindowId,
  );
  const setIconPositions = useDesktopStore((state) => state.setIconPositions);
  const setAssistantExternalMessage = useDesktopStore(
    (state) => state.setAssistantExternalMessage,
  );
  const bringWindowToFront = useDesktopStore(
    (state) => state.bringWindowToFront,
  );
  const openWindow = useDesktopStore((state) => state.openWindow);
  const minimizeWindow = useDesktopStore((state) => state.minimizeWindow);
  const closeWindow = useDesktopStore((state) => state.closeWindow);
  const updateIconPosition = useDesktopStore(
    (state) => state.updateIconPosition,
  );
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const hasDraggedIconRef = useRef(false);
  const desktopLongPressRef = useRef<DesktopLongPressState | null>(null);
  const desktopLongPressTimerRef = useRef<number | null>(null);
  const [assistantContextMenuPosition, setAssistantContextMenuPosition] =
    useState<{ left: number; top: number } | null>(null);

  const t = ({ pt, en }: LocalizedText) =>
    handleTranslation({ text: pt, translation: en });

  const selectedAssistant = assistantCharactersById[selectedAssistantId];
  const allMinimizedAssistantMessage =
    selectedAssistant.allMinimizedMessage ?? genericAllMinimizedMessage;
  const hasVisibleDesktopWindow = desktopWindows.some(
    (windowItem) =>
      openWindows[windowItem.id] && !minimizedWindows[windowItem.id],
  );
  const hasMinimizedDesktopWindow = desktopWindows.some(
    (windowItem) =>
      openWindows[windowItem.id] && minimizedWindows[windowItem.id],
  );
  const areAllDesktopWindowsMinimized =
    hasMinimizedDesktopWindow &&
    !hasVisibleDesktopWindow &&
    !selectedProjectName &&
    !selectedImageId;

  const hasOpenWindow =
    Object.values(openWindows).some(Boolean) ||
    Boolean(selectedProjectName) ||
    Boolean(selectedImageId);

  useEffect(() => {
    if (hasOpenWindow) return;

    setAssistantExternalMessage({
      pt: "Todas as janelas foram fechadas. Minimalismo radical ou você só está me deixando sozinho?",
      en: "All windows are closed. Radical minimalism, or are you just leaving me alone?",
    });
  }, [hasOpenWindow, setAssistantExternalMessage]);

  useEffect(() => {
    if (!areAllDesktopWindowsMinimized) return;

    setAssistantExternalMessage(allMinimizedAssistantMessage);
  }, [
    allMinimizedAssistantMessage,
    areAllDesktopWindowsMinimized,
    setAssistantExternalMessage,
  ]);

  useEffect(() => {
    const updateResponsiveIconPositions = () => {
      if (hasDraggedIconRef.current) {
        setIconPositions((currentPositions) =>
          desktopWindows.reduce<Record<WindowId, DesktopIconPosition>>(
            (positions, windowItem) => ({
              ...positions,
              [windowItem.id]: clampIconPosition(
                currentPositions[windowItem.id],
              ),
            }),
            currentPositions,
          ),
        );
        return;
      }

      setIconPositions(getResponsiveIconPositions());
    };

    updateResponsiveIconPositions();
    window.addEventListener("resize", updateResponsiveIconPositions);

    return () =>
      window.removeEventListener("resize", updateResponsiveIconPositions);
  }, [setIconPositions]);

  useEffect(() => {
    if (
      activeWindowId &&
      openWindows[activeWindowId] &&
      !minimizedWindows[activeWindowId]
    ) {
      return;
    }

    setActiveWindowId(
      getTopVisibleWindowId(openWindows, minimizedWindows, windowOrder),
    );
  }, [
    activeWindowId,
    minimizedWindows,
    openWindows,
    setActiveWindowId,
    windowOrder,
  ]);

  useEffect(() => {
    if (!assistantContextMenuPosition) return;

    const handleOutsideClick = (event: globalThis.MouseEvent) => {
      if (contextMenuRef.current?.contains(event.target as Node)) return;

      setAssistantContextMenuPosition(null);
    };

    const handleResize = () => setAssistantContextMenuPosition(null);

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [assistantContextMenuPosition]);

  useEffect(() => {
    return () => {
      if (desktopLongPressTimerRef.current) {
        window.clearTimeout(desktopLongPressTimerRef.current);
      }
    };
  }, []);

  const clearDesktopLongPressTimer = () => {
    if (!desktopLongPressTimerRef.current) return;

    window.clearTimeout(desktopLongPressTimerRef.current);
    desktopLongPressTimerRef.current = null;
  };

  const isDesktopContextMenuTarget = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;

    return !target.closest(
      "button, a, footer, [role='dialog'], [data-floating-assistant='true']",
    );
  };

  const openDesktopAssistantMenu = (clientX: number, clientY: number) => {
    const maxLeft = Math.max(
      DESKTOP_CONTEXT_MENU_MARGIN,
      window.innerWidth - DESKTOP_CONTEXT_MENU_WIDTH - DESKTOP_CONTEXT_MENU_MARGIN,
    );
    const maxTop = Math.max(
      DESKTOP_CONTEXT_MENU_MARGIN,
      window.innerHeight - DESKTOP_CONTEXT_MENU_HEIGHT - DESKTOP_CONTEXT_MENU_MARGIN,
    );

    setAssistantContextMenuPosition({
      left: Math.min(maxLeft, Math.max(DESKTOP_CONTEXT_MENU_MARGIN, clientX)),
      top: Math.min(maxTop, Math.max(DESKTOP_CONTEXT_MENU_MARGIN, clientY)),
    });
  };

  const handleDesktopContextMenu = (event: MouseEvent<HTMLElement>) => {
    if (!isDesktopContextMenuTarget(event.target)) return;

    event.preventDefault();
    openDesktopAssistantMenu(event.clientX, event.clientY);
  };

  const handleDesktopPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") return;
    if (!isDesktopContextMenuTarget(event.target)) return;

    clearDesktopLongPressTimer();
    desktopLongPressRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
    desktopLongPressTimerRef.current = window.setTimeout(() => {
      openDesktopAssistantMenu(event.clientX, event.clientY);
      desktopLongPressTimerRef.current = null;
      desktopLongPressRef.current = null;
    }, DESKTOP_LONG_PRESS_MENU_DELAY);
  };

  const handleDesktopPointerMove = (event: PointerEvent<HTMLElement>) => {
    const longPress = desktopLongPressRef.current;

    if (!longPress || longPress.pointerId !== event.pointerId) return;

    const distanceX = Math.abs(event.clientX - longPress.startX);
    const distanceY = Math.abs(event.clientY - longPress.startY);

    if (
      distanceX > DESKTOP_LONG_PRESS_MOVE_THRESHOLD ||
      distanceY > DESKTOP_LONG_PRESS_MOVE_THRESHOLD
    ) {
      clearDesktopLongPressTimer();
      desktopLongPressRef.current = null;
    }
  };

  const handleDesktopPointerUp = (event: PointerEvent<HTMLElement>) => {
    const longPress = desktopLongPressRef.current;

    if (!longPress || longPress.pointerId !== event.pointerId) return;

    clearDesktopLongPressTimer();
    desktopLongPressRef.current = null;
  };

  const handleShowAssistant = () => {
    setActiveAssistantMessage(
      selectedAssistant.activationMessage ?? genericAssistantActivationMessage,
    );
    showAssistant();
    setAssistantContextMenuPosition(null);
  };

  const handleHideAssistantFromDesktop = () => {
    requestHideAssistant();
    setAssistantContextMenuPosition(null);
  };

  return (
    <main
      className="desktop-texture min-h-screen overflow-hidden p-4 pb-14 font-retro text-retro-text sm:p-6"
      onContextMenu={handleDesktopContextMenu}
      onPointerCancel={handleDesktopPointerUp}
      onPointerDown={handleDesktopPointerDown}
      onPointerMove={handleDesktopPointerMove}
      onPointerUp={handleDesktopPointerUp}
      style={{
        ["--retro-desktop" as string]: retroTheme.desktopBackground,
        ["--retro-titlebar" as string]: retroTheme.titlebarBlue,
        ["--retro-window-gray" as string]: retroTheme.windowGray,
        ["--retro-border-light" as string]: retroTheme.borderLight,
        ["--retro-border-dark" as string]: retroTheme.borderDark,
        ["--retro-text" as string]: retroTheme.text,
      }}
    >
      <h1 className="sr-only">Portfólio de Manuela Ferraz</h1>

      <div className="absolute inset-x-0 bottom-12 top-0 z-10">
        {desktopWindows.map((windowItem) => (
          <DesktopIcon
            key={windowItem.id}
            id={windowItem.id}
            label={t(windowItem.label)}
            icon={windowItem.icon}
            position={iconPositions[windowItem.id]}
            onPositionChange={(id, position) => {
              hasDraggedIconRef.current = true;
              updateIconPosition(id, position);
            }}
            onOpen={() => openWindow(windowItem.id)}
          />
        ))}
      </div>

      <FloatingAssistant
        externalMessage={assistantExternalMessage ?? undefined}
        translateMessage={t}
      />

      {desktopWindows.map((windowItem) => (
        <RetroWindow
          key={windowItem.id}
          id={windowItem.id}
          title={t(windowItem.title)}
          icon={windowItem.icon}
          isOpen={openWindows[windowItem.id]}
          isMinimized={minimizedWindows[windowItem.id]}
          onMinimize={() => minimizeWindow(windowItem.id)}
          onClose={() => closeWindow(windowItem.id)}
          onFocus={() => bringWindowToFront(windowItem.id)}
          defaultPosition={
            windowItem.id === "about" ? undefined : windowItem.position
          }
          sizePreset={windowItem.sizePreset}
          zIndex={windowOrder[windowItem.id]}
        >
          <DesktopWindowContent windowId={windowItem.id} t={t} />
        </RetroWindow>
      ))}

      <ProjectPreviewWindow />

      <ImagePreviewWindow />

      {assistantContextMenuPosition ? (
        <RetroMenu
          ref={contextMenuRef}
          arrowPlacement="left"
          className="after:hidden"
          style={{
            ...assistantContextMenuPosition,
            width: DESKTOP_CONTEXT_MENU_WIDTH,
          }}
          items={[
            isAssistantHidden
              ? {
                  id: "show-assistant",
                  icon: "!",
                  label: t({
                    pt: "Mostrar assistente",
                    en: "Show assistant",
                  }),
                  onClick: handleShowAssistant,
                }
              : {
                  id: "hide-assistant",
                  icon: "_",
                  label: t({
                    pt: "Ocultar assistente",
                    en: "Hide assistant",
                  }),
                  onClick: handleHideAssistantFromDesktop,
                },
          ]}
          title={t({
            pt: "Desktop",
            en: "Desktop",
          })}
        />
      ) : null}

      <Taskbar />
    </main>
  );
}
