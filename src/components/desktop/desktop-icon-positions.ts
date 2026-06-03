import type { DesktopIconPosition } from "@/components/desktop-icon";

import type { WindowId } from "./types";

export const initialIconPositions: Record<WindowId, DesktopIconPosition> = {
  about: { x: 36, y: 38 },
  images: { x: 760, y: 44 },
  projects: { x: 286, y: 156 },
  experience: { x: 96, y: 310 },
  skills: { x: 536, y: 82 },
  games: { x: 668, y: 292 },
  bugHunter: { x: 0, y: 0 },
  contact: { x: 940, y: 238 },
  resume: { x: 418, y: 398 },
  trash: { x: 900, y: 400 },
};
