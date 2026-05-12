import {
  assistantCharactersById,
  type AssistantCharacterId,
  type AssistantMessage,
} from "./assistant-messages";

interface RandomMessageResult {
  index: number;
  message: AssistantMessage;
}

export function getRandomAssistantMessage(
  messages: readonly AssistantMessage[],
  lastMessageIndex: number | null,
): RandomMessageResult {
  if (messages.length === 0) {
    throw new Error("Assistant messages list cannot be empty.");
  }

  const availableIndexes = messages
    .map((_, index) => index)
    .filter(
      (index) => messages.length === 1 || index !== lastMessageIndex,
    );
  const nextIndex =
    availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

  return {
    index: nextIndex,
    message: messages[nextIndex],
  };
}

export function getPokeMessage(
  assistantId: AssistantCharacterId,
  pokeCount: number,
): AssistantMessage {
  const messages = assistantCharactersById[assistantId].messages.poke;
  const lastMessage = messages[messages.length - 1];

  if (pokeCount >= 30) return lastMessage;
  if (pokeCount === 20) return messages[6] ?? lastMessage;
  if (pokeCount >= 20) return messages[7] ?? lastMessage;
  if (pokeCount >= 15) return messages[5] ?? lastMessage;
  if (pokeCount >= 10) return messages[4] ?? lastMessage;
  if (pokeCount >= 8) return messages[3] ?? lastMessage;
  if (pokeCount >= 5) return messages[2] ?? lastMessage;
  if (pokeCount >= 3) return messages[1] ?? lastMessage;

  return messages[0] ?? lastMessage;
}
