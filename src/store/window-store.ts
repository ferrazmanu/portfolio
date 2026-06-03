import type { ReactNode } from "react";
import { create } from "zustand";

import type {
  RetroWindowPosition,
  RetroWindowSizePreset,
} from "@/components/retro-window";
import type {
  LocalizedText,
  TranslateFn,
  WindowId,
} from "@/components/desktop/types";

export interface WindowInstance {
  id: WindowId;
  title: LocalizedText;
  icon?: ReactNode;
  content: (t: TranslateFn) => ReactNode;
  defaultPosition?: RetroWindowPosition;
  sizePreset: RetroWindowSizePreset;
  zIndex: number;
  isMinimized: boolean;
}

export interface OpenWindowOptions {
  id: WindowId;
  title: LocalizedText;
  icon?: ReactNode;
  content: (t: TranslateFn) => ReactNode;
  defaultPosition?: RetroWindowPosition;
  sizePreset: RetroWindowSizePreset;
}

interface WindowState {
  windows: WindowInstance[];
  activeWindowId: WindowId | null;
  setActiveWindowId: (windowId: WindowId | null) => void;
  bringWindowToFront: (windowId: WindowId) => void;
  openWindow: (options: OpenWindowOptions) => void;
  minimizeWindow: (windowId: WindowId) => void;
  closeWindow: (windowId: WindowId) => void;
}

export const WINDOW_Z_INDEX_BASE = 200;

export const getHighestWindowOrder = (windows: WindowInstance[]) =>
  Math.max(
    WINDOW_Z_INDEX_BASE,
    ...windows.map((windowItem) => windowItem.zIndex),
  );

const getTopVisibleWindowId = (windows: WindowInstance[]) => {
  const visibleWindows = windows.filter((windowItem) => !windowItem.isMinimized);

  if (visibleWindows.length === 0) return null;

  return visibleWindows.reduce((topWindow, windowItem) =>
    windowItem.zIndex > topWindow.zIndex ? windowItem : topWindow,
  ).id;
};

export const useWindowStore = create<WindowState>((set) => ({
  windows: [],
  activeWindowId: null,
  setActiveWindowId: (windowId) => set(() => ({ activeWindowId: windowId })),
  bringWindowToFront: (windowId) =>
    set((state) => ({
      activeWindowId: windowId,
      windows: state.windows.map((windowItem) =>
        windowItem.id === windowId
          ? {
              ...windowItem,
              zIndex: getHighestWindowOrder(state.windows) + 1,
            }
          : windowItem,
      ),
    })),
  openWindow: (options) =>
    set((state) => {
      const nextZIndex = getHighestWindowOrder(state.windows) + 1;
      const existingWindow = state.windows.find(
        (windowItem) => windowItem.id === options.id,
      );

      if (existingWindow) {
        return {
          activeWindowId: options.id,
          windows: state.windows.map((windowItem) =>
            windowItem.id === options.id
              ? {
                  ...windowItem,
                  ...options,
                  zIndex: nextZIndex,
                  isMinimized: false,
                }
              : windowItem,
          ),
        };
      }

      return {
        activeWindowId: options.id,
        windows: [
          ...state.windows,
          {
            ...options,
            zIndex: nextZIndex,
            isMinimized: false,
          },
        ],
      };
    }),
  minimizeWindow: (windowId) =>
    set((state) => {
      const windows = state.windows.map((windowItem) =>
        windowItem.id === windowId
          ? {
              ...windowItem,
              isMinimized: true,
            }
          : windowItem,
      );

      return {
        activeWindowId: getTopVisibleWindowId(windows),
        windows,
      };
    }),
  closeWindow: (windowId) =>
    set((state) => {
      const windows = state.windows.filter(
        (windowItem) => windowItem.id !== windowId,
      );

      return {
        activeWindowId: getTopVisibleWindowId(windows),
        windows,
      };
    }),
}));
