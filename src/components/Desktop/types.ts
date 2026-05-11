import type { ReactNode } from "react";

export type WindowId =
  | "about"
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
  size: {
    width: number;
    height: number;
  };
}
