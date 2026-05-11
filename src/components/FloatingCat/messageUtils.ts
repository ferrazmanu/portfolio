import type { AssistantMessage } from "./messages";

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
