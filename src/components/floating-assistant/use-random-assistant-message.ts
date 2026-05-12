import { useCallback, useEffect, useRef } from "react";

import type { AssistantMessage } from "./assistant-messages";
import { getRandomAssistantMessage } from "./assistant-message-utils";

export const useRandomAssistantMessage = (
  messages: readonly AssistantMessage[],
  resetKey: string,
) => {
  const lastMessageIndexRef = useRef<number | null>(null);

  useEffect(() => {
    lastMessageIndexRef.current = null;
  }, [resetKey]);

  return useCallback(() => {
    const result = getRandomAssistantMessage(
      messages,
      lastMessageIndexRef.current,
    );

    lastMessageIndexRef.current = result.index;

    return result.message;
  }, [messages]);
};
