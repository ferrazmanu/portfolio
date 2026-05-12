import type { ReactNode } from "react";

import type { RetroWindowSizePreset } from "@/components/retro-window";

export type WindowId =
  | "about"
  | "images"
  | "projects"
  | "experience"
  | "skills"
  | "contact"
  | "resume"
  | "trash";

export interface LocalizedText {
  pt: string;
  en: string;
}

export type TranslateFn = (text: LocalizedText) => string;

export interface DesktopWindowConfig {
  id: WindowId;
  title: LocalizedText;
  label: LocalizedText;
  icon: ReactNode;
  iconPosition: {
    x: number;
    y: number;
  };
  position: {
    x: number;
    y: number;
  };
  sizePreset: RetroWindowSizePreset;
}
