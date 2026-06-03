import { create } from "zustand";

import type { DesktopIconPosition } from "@/components/desktop-icon";
import { initialIconPositions } from "@/components/desktop/desktop-icon-positions";
import {
  desktopMenuEasterEggMessage,
  getImagePreviewAssistantMessage,
  getProjectPreviewAssistantMessage,
} from "@/components/desktop/desktop-assistant-messages";
import type { LocalizedText, WindowId } from "@/components/desktop/types";
import { imagesWindowPreviewItems } from "@/components/desktop/windows/images/images-config";
import { trashPreviewItems } from "@/components/desktop/windows/trash/trash-config";
import {
  getHighestWindowOrder,
  useWindowStore,
  WINDOW_Z_INDEX_BASE,
} from "./window-store";

type StateUpdater<T> = T | ((currentState: T) => T);

interface DesktopState {
  iconPositions: Record<WindowId, DesktopIconPosition>;
  selectedProjectName: string | null;
  projectPreviewZIndex: number;
  selectedImageId: string | null;
  imagePreviewZIndex: number;
  assistantExternalMessage: LocalizedText | null;
  setIconPositions: (
    positions: StateUpdater<Record<WindowId, DesktopIconPosition>>,
  ) => void;
  setAssistantExternalMessage: (message: LocalizedText | null) => void;
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
  iconPositions: initialIconPositions,
  selectedProjectName: null,
  projectPreviewZIndex: WINDOW_Z_INDEX_BASE,
  selectedImageId: null,
  imagePreviewZIndex: WINDOW_Z_INDEX_BASE,
  assistantExternalMessage: null,
  setIconPositions: (positions) =>
    set((state) => ({
      iconPositions: getNextState(positions, state.iconPositions),
    })),
  setAssistantExternalMessage: (message) =>
    set(() => ({ assistantExternalMessage: message })),
  updateIconPosition: (windowId, position) => {
    if (!(windowId in initialIconPositions)) {
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
    set((state) => {
      const windows = useWindowStore.getState().windows;

      return {
        selectedProjectName: projectName,
        assistantExternalMessage: getProjectPreviewAssistantMessage(projectName),
        projectPreviewZIndex:
          Math.max(
            getHighestWindowOrder(windows),
            state.projectPreviewZIndex,
          ) + 1,
      };
    }),
  closeProjectPreview: () => set(() => ({ selectedProjectName: null })),
  bringProjectPreviewToFront: () =>
    set((state) => {
      const windows = useWindowStore.getState().windows;

      return {
        projectPreviewZIndex:
          Math.max(
            getHighestWindowOrder(windows),
            state.projectPreviewZIndex,
          ) + 1,
      };
    }),
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
            getHighestWindowOrder(useWindowStore.getState().windows),
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
          getHighestWindowOrder(useWindowStore.getState().windows),
          state.projectPreviewZIndex,
          state.imagePreviewZIndex,
        ) + 1,
    })),
  showDesktopMenuEasterEggMessage: () =>
    set(() => ({
      assistantExternalMessage: desktopMenuEasterEggMessage,
    })),
}));
