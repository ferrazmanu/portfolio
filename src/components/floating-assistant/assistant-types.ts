import type { StaticImageData } from "next/image";

export interface AssistantMessage {
  pt: string;
  en: string;
}

export interface AssistantCharacterMessages {
  poke: AssistantMessage[];
  move: AssistantMessage[];
  shake: AssistantMessage[];
  advice: AssistantMessage[];
  idle: AssistantMessage[];
}

export interface AssistantCharacter {
  id: string;
  name: string;
  image: StaticImageData;
  alt: AssistantMessage;
  ariaLabel: AssistantMessage;
  initialMessage: AssistantMessage;
  activationMessage?: AssistantMessage;
  messages: AssistantCharacterMessages;
}
