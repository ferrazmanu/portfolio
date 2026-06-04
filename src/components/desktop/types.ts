import type { ReactNode } from "react";

import type {
  RetroWindowPosition,
  RetroWindowSizePreset,
} from "@/components/retro-window";

export type WindowId =
  | "about"
  | "images"
  | "projects"
  | "experience"
  | "skills"
  | "games"
  | "bugHunter"
  | "projectPreview"
  | "imagePreview"
  | "contact"
  | "resume"
  | "trash";

export interface LocalizedText {
  pt: string;
  en: string;
}

export type TranslateFn = (text: LocalizedText) => string;

export interface DesktopAppConfig {
  id: WindowId;
  title: LocalizedText;
  label: LocalizedText;
  icon: ReactNode;
  content: (t: TranslateFn) => ReactNode;
  iconPosition: {
    x: number;
    y: number;
  };
  position?: RetroWindowPosition;
  sizePreset: RetroWindowSizePreset;
  centerOnOpen?: boolean;
}
