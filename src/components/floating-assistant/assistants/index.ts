import { astrocatAssistant } from "./astrocat/astrocat";
import { zamandaAssistant } from "./zamanda/zamanda";
// assistant scaffold imports

import type { AssistantCharacter } from "../assistant-types";

export const assistantCharacters = [
  astrocatAssistant,
  zamandaAssistant,
  // assistant scaffold list
] as const satisfies readonly AssistantCharacter[];

export type AssistantCharacterId = (typeof assistantCharacters)[number]["id"];

export const assistantCharactersById = assistantCharacters.reduce<
  Record<AssistantCharacterId, AssistantCharacter>
>(
  (characters, character) => ({
    ...characters,
    [character.id]: character,
  }),
  {} as Record<AssistantCharacterId, AssistantCharacter>,
);
