import { create } from "zustand";

import type { DesktopIconPosition } from "@/components/desktop-icon";
import {
  desktopMenuEasterEggMessage,
  getImagePreviewAssistantMessage,
  getProjectPreviewAssistantMessage,
  getWindowAssistantMessage,
} from "@/components/desktop/desktop-assistant-messages";
import {
  desktopWindows,
  initialIconPositions,
  initialMinimizedWindowState,
  initialWindowOrder,
  initialWindowState,
} from "@/components/desktop/desktop-config";
import type { LocalizedText, WindowId } from "@/components/desktop/types";
import { imagesWindowPreviewItems } from "@/components/desktop/windows/images/images-config";
import { trashPreviewItems } from "@/components/desktop/windows/trash/trash-config";

type StateUpdater<T> = T | ((currentState: T) => T);

interface DesktopState {
  openWindows: Record<WindowId, boolean>;
  minimizedWindows: Record<WindowId, boolean>;
  activeWindowId: WindowId | null;
  iconPositions: Record<WindowId, DesktopIconPosition>;
  windowOrder: Record<WindowId, number>;
  selectedProjectName: string | null;
  projectPreviewZIndex: number;
  selectedImageId: string | null;
  imagePreviewZIndex: number;
  assistantExternalMessage: LocalizedText | null;
  setActiveWindowId: (windowId: WindowId | null) => void;
  setIconPositions: (
    positions: StateUpdater<Record<WindowId, DesktopIconPosition>>,
  ) => void;
  setAssistantExternalMessage: (message: LocalizedText | null) => void;
  bringWindowToFront: (windowId: WindowId) => void;
  openWindow: (windowId: WindowId) => void;
  minimizeWindow: (windowId: WindowId) => void;
  closeWindow: (windowId: WindowId) => void;
  updateIconPosition: (windowId: string, position: DesktopIconPosition) => void;
  openProjectPreview: (projectName: string) => void;
  closeProjectPreview: () => void;
  bringProjectPreviewToFront: () => void;
  openImagePreview: (imageId: string) => void;
  closeImagePreview: () => void;
  bringImagePreviewToFront: () => void;
  showDesktopMenuEasterEggMessage: () => void;
}

const getNextState = <T>(updater: StateUpdater<T>, currentState: T): T =>
  typeof updater === "function"
    ? (updater as (currentState: T) => T)(currentState)
    : updater;

export const useDesktopStore = create<DesktopState>((set) => ({
  openWindows: initialWindowState,
  minimizedWindows: initialMinimizedWindowState,
  activeWindowId: "about",
  iconPositions: initialIconPositions,
  windowOrder: initialWindowOrder,
  selectedProjectName: null,
  projectPreviewZIndex: 90,
  selectedImageId: null,
  imagePreviewZIndex: 95,
  assistantExternalMessage: null,
  setActiveWindowId: (windowId) => set(() => ({ activeWindowId: windowId })),
  setIconPositions: (positions) =>
    set((state) => ({
      iconPositions: getNextState(positions, state.iconPositions),
    })),
  setAssistantExternalMessage: (message) =>
    set(() => ({ assistantExternalMessage: message })),
  bringWindowToFront: (windowId) =>
    set((state) => ({
      activeWindowId: windowId,
      windowOrder: {
        ...state.windowOrder,
        [windowId]: Math.max(...Object.values(state.windowOrder)) + 1,
      },
    })),
  openWindow: (windowId) =>
    set((state) => ({
      openWindows: {
        ...state.openWindows,
        [windowId]: true,
      },
      minimizedWindows: {
        ...state.minimizedWindows,
        [windowId]: false,
      },
      activeWindowId: windowId,
      windowOrder: {
        ...state.windowOrder,
        [windowId]: Math.max(...Object.values(state.windowOrder)) + 1,
      },
      assistantExternalMessage: getWindowAssistantMessage(windowId),
    })),
  minimizeWindow: (windowId) =>
    set((state) => ({
      minimizedWindows: {
        ...state.minimizedWindows,
        [windowId]: true,
      },
    })),
  closeWindow: (windowId) =>
    set((state) => ({
      openWindows: {
        ...state.openWindows,
        [windowId]: false,
      },
      minimizedWindows: {
        ...state.minimizedWindows,
        [windowId]: false,
      },
    })),
  updateIconPosition: (windowId, position) => {
    if (!desktopWindows.some((windowItem) => windowItem.id === windowId)) {
      return;
    }

    set((state) => ({
      iconPositions: {
        ...state.iconPositions,
        [windowId as WindowId]: position,
      },
    }));
  },
  openProjectPreview: (projectName) =>
    set((state) => ({
      selectedProjectName: projectName,
      assistantExternalMessage: getProjectPreviewAssistantMessage(projectName),
      projectPreviewZIndex:
        Math.max(...Object.values(state.windowOrder), state.projectPreviewZIndex) +
        1,
    })),
  closeProjectPreview: () => set(() => ({ selectedProjectName: null })),
  bringProjectPreviewToFront: () =>
    set((state) => ({
      projectPreviewZIndex:
        Math.max(...Object.values(state.windowOrder), state.projectPreviewZIndex) +
        1,
    })),
  openImagePreview: (imageId) =>
    set((state) => {
      const image = [...imagesWindowPreviewItems, ...trashPreviewItems].find(
        (item) => item.id === imageId,
      );

      return {
        selectedImageId: imageId,
        assistantExternalMessage: getImagePreviewAssistantMessage(image?.title),
        imagePreviewZIndex:
          Math.max(
            ...Object.values(state.windowOrder),
            state.projectPreviewZIndex,
            state.imagePreviewZIndex,
          ) + 1,
      };
    }),
  closeImagePreview: () => set(() => ({ selectedImageId: null })),
  bringImagePreviewToFront: () =>
    set((state) => ({
      imagePreviewZIndex:
        Math.max(
          ...Object.values(state.windowOrder),
          state.projectPreviewZIndex,
          state.imagePreviewZIndex,
        ) + 1,
    })),
  showDesktopMenuEasterEggMessage: () =>
    set(() => ({
      assistantExternalMessage: desktopMenuEasterEggMessage,
    })),
}));
