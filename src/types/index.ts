import { MutableRefObject, RefObject } from "react";

export interface SectionProps {
  reference: any;
  scrollTo?: Function;
  nextSection?: any;
}

export interface Language {
  language: string;
}

export interface TranslationProps {
  text: string;
  translation: string;
}
