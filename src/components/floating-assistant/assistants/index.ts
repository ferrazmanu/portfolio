import { astrocatAssistant } from "./astrocat/astrocat";
import { zamigaAssistant } from "./zamiga/zamiga";
// assistant scaffold imports

import type { AssistantCharacter } from "../assistant-types";

export const assistantCharacters = [
  astrocatAssistant,
  zamigaAssistant,
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
