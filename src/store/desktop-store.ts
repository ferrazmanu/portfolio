import { create } from "zustand";

import type { DesktopIconPosition } from "@/components/desktop-icon";
import { initialIconPositions } from "@/components/desktop/desktop-icon-positions";
import type { WindowId } from "@/components/desktop/types";

type StateUpdater<T> = T | ((currentState: T) => T);

interface DesktopState {
  iconPositions: Record<WindowId, DesktopIconPosition>;
  setIconPositions: (
    positions: StateUpdater<Record<WindowId, DesktopIconPosition>>,
  ) => void;
  updateIconPosition: (windowId: string, position: DesktopIconPosition) => void;
}

const getNextState = <T>(updater: StateUpdater<T>, currentState: T): T =>
  typeof updater === "function"
    ? (updater as (currentState: T) => T)(currentState)
    : updater;

export const useDesktopStore = create<DesktopState>((set) => ({
  iconPositions: initialIconPositions,
  setIconPositions: (positions) =>
    set((state) => ({
      iconPositions: getNextState(positions, state.iconPositions),
    })),
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
}));
