import { RefObject } from "react";

export interface SectionProps {
  reference: RefObject<HTMLElement>;
  scrollTo?: () => void;
  nextSection?: RefObject<HTMLElement>;
}

export interface Language {
  language: string;
}

export interface TranslationProps {
  text: string;
  translation: string;
}
