export type {
  AssistantCharacter,
  AssistantCharacterMessages,
  AssistantMessage,
} from "./assistant-types";
export {
  assistantCharacters,
  assistantCharactersById,
  type AssistantCharacterId,
} from "./assistants";

export const genericAssistantActivationMessage = {
  pt: "Pronto. Nova entidade supervisora ativada.",
  en: "Done. New supervisory entity activated.",
};
