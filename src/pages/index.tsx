import {
  useCallback,
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
import {
  desktopApps,
} from "@/components/desktop/desktop-config";
import { initialIconPositions } from "@/components/desktop/desktop-icon-positions";
import type {
  DesktopAppConfig,
  LocalizedText,
  WindowId,
} from "@/components/desktop/types";
import {
  assistantCharactersById,
  genericAssistantActivationMessage,
} from "@/components/floating-assistant/assistant-messages";
import { getWindowAssistantMessage } from "@/components/desktop/desktop-assistant-messages";
import { FloatingAssistant } from "@/components/floating-assistant/floating-assistant";
import { RetroMenu } from "@/components/retro-menu";
import { RetroWindow } from "@/components/retro-window";
import { Taskbar } from "@/components/taskbar";
import { useTranslation } from "@/hooks/use-translation";
import { useAssistantStore } from "@/store/assistant-store";
import { useDesktopStore } from "@/store/desktop-store";
import { useWindowStore, type WindowInstance } from "@/store/window-store";
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
  desktopApps
    .reduce<Record<WindowId, DesktopIconPosition>>(
      (positions, desktopApp) => {
        const maxDesignX = ICON_DESIGN_WIDTH - DESKTOP_ICON_WIDTH;
        const maxDesignY =
          ICON_DESIGN_HEIGHT - DESKTOP_ICON_HEIGHT - DESKTOP_TASKBAR_HEIGHT;
        const maxViewportX = Math.max(
          0,
          window.innerWidth - DESKTOP_ICON_WIDTH,
        );
        const maxViewportY = Math.max(
          0,
          window.innerHeight - DESKTOP_ICON_HEIGHT - DESKTOP_TASKBAR_HEIGHT,
        );

        return {
          ...positions,
          [desktopApp.id]: clampIconPosition({
            x: (desktopApp.iconPosition.x / maxDesignX) * maxViewportX,
            y: (desktopApp.iconPosition.y / maxDesignY) * maxViewportY,
          }),
        };
      },
      initialIconPositions,
    );

const getTopVisibleWindowId = (
  windows: WindowInstance[],
): WindowId | null => {
  const visibleWindows = windows.filter((windowItem) => !windowItem.isMinimized);

  if (visibleWindows.length === 0) return null;

  return visibleWindows.reduce((topWindow, windowItem) =>
    windowItem.zIndex > topWindow.zIndex
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
  const setAssistantMessage = useAssistantStore(
    (state) => state.setAssistantMessage,
  );
  const toggleAssistant = useAssistantStore((state) => state.toggleAssistant);
  const windows = useWindowStore((state) => state.windows);
  const activeWindowId = useWindowStore((state) => state.activeWindowId);
  const iconPositions = useDesktopStore((state) => state.iconPositions);
  const setActiveWindowId = useWindowStore(
    (state) => state.setActiveWindowId,
  );
  const setIconPositions = useDesktopStore((state) => state.setIconPositions);
  const bringWindowToFront = useWindowStore(
    (state) => state.bringWindowToFront,
  );
  const openWindow = useWindowStore((state) => state.openWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const updateIconPosition = useDesktopStore(
    (state) => state.updateIconPosition,
  );
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const hasDraggedIconRef = useRef(false);
  const desktopLongPressRef = useRef<DesktopLongPressState | null>(null);
  const desktopLongPressTimerRef = useRef<number | null>(null);
  const hasOpenedInitialWindowRef = useRef(false);
  const [assistantContextMenuPosition, setAssistantContextMenuPosition] =
    useState<{ left: number; top: number } | null>(null);

  const t = useCallback(
    ({ pt, en }: LocalizedText) =>
      handleTranslation({ text: pt, translation: en }),
    [handleTranslation],
  );

  const handleOpenDesktopApp = useCallback(
    (desktopApp: DesktopAppConfig) => {
      openWindow({
        id: desktopApp.id,
        title: desktopApp.title,
        icon: desktopApp.icon,
        content: desktopApp.content,
        defaultPosition: desktopApp.centerOnOpen
          ? undefined
          : desktopApp.position,
        sizePreset: desktopApp.sizePreset,
      });
      setAssistantMessage(getWindowAssistantMessage(desktopApp.id));
    },
    [openWindow, setAssistantMessage],
  );

  const selectedAssistant = assistantCharactersById[selectedAssistantId];
  const allMinimizedAssistantMessage =
    selectedAssistant.allMinimizedMessage ?? genericAllMinimizedMessage;
  const hasVisibleDesktopWindow = windows.some(
    (windowItem) => !windowItem.isMinimized,
  );
  const hasMinimizedDesktopWindow = windows.some(
    (windowItem) => windowItem.isMinimized,
  );
  const areAllDesktopWindowsMinimized =
    hasMinimizedDesktopWindow &&
    !hasVisibleDesktopWindow;

  const hasOpenWindow = windows.length > 0;

  useEffect(() => {
    if (hasOpenWindow) return;

    setAssistantMessage({
      pt: "Todas as janelas foram fechadas. Minimalismo radical ou você só está me deixando sozinho?",
      en: "All windows are closed. Radical minimalism, or are you just leaving me alone?",
    });
  }, [hasOpenWindow, setAssistantMessage]);

  useEffect(() => {
    if (hasOpenedInitialWindowRef.current) return;

    const aboutApp = desktopApps.find((desktopApp) => desktopApp.id === "about");

    if (!aboutApp) return;

    hasOpenedInitialWindowRef.current = true;
    handleOpenDesktopApp(aboutApp);
  }, [handleOpenDesktopApp]);

  useEffect(() => {
    if (!areAllDesktopWindowsMinimized) return;

    setAssistantMessage(allMinimizedAssistantMessage);
  }, [
    allMinimizedAssistantMessage,
    areAllDesktopWindowsMinimized,
    setAssistantMessage,
  ]);

  useEffect(() => {
    const updateResponsiveIconPositions = () => {
      if (hasDraggedIconRef.current) {
        setIconPositions((currentPositions) =>
          desktopApps
            .reduce<Record<WindowId, DesktopIconPosition>>(
              (positions, desktopApp) => ({
                ...positions,
                [desktopApp.id]: clampIconPosition(
                  currentPositions[desktopApp.id],
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
      windows.some(
        (windowItem) =>
          windowItem.id === activeWindowId && !windowItem.isMinimized,
      )
    ) {
      return;
    }

    setActiveWindowId(
      getTopVisibleWindowId(windows),
    );
  }, [
    activeWindowId,
    setActiveWindowId,
    windows,
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
    setAssistantMessage(
      selectedAssistant.activationMessage ?? genericAssistantActivationMessage,
    );
    toggleAssistant();
    setAssistantContextMenuPosition(null);
  };

  const handleHideAssistantFromDesktop = () => {
    toggleAssistant();
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
        {desktopApps
          .map((desktopApp) => (
            <DesktopIcon
              key={desktopApp.id}
              id={desktopApp.id}
              label={t(desktopApp.label)}
              icon={desktopApp.icon}
              position={iconPositions[desktopApp.id]}
              onPositionChange={(id, position) => {
                hasDraggedIconRef.current = true;
                updateIconPosition(id, position);
              }}
              onOpen={() => handleOpenDesktopApp(desktopApp)}
            />
          ))}
      </div>

      <FloatingAssistant translateMessage={t} />

      {windows.map((windowItem) => (
        <RetroWindow
          key={windowItem.id}
          id={windowItem.id}
          title={t(windowItem.title)}
          icon={windowItem.icon}
          isOpen
          isMinimized={windowItem.isMinimized}
          onMinimize={() => minimizeWindow(windowItem.id)}
          onClose={() => closeWindow(windowItem.id)}
          onFocus={() => bringWindowToFront(windowItem.id)}
          defaultPosition={windowItem.defaultPosition}
          sizePreset={windowItem.sizePreset}
          zIndex={windowItem.zIndex}
        >
          {windowItem.content(t)}
        </RetroWindow>
      ))}

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
