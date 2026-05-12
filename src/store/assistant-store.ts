import { create } from "zustand";

import type {
  AssistantCharacterId,
  AssistantMessage,
} from "@/components/floating-assistant/assistant-messages";

interface AssistantState {
  activeMessage: AssistantMessage | null;
  selectedAssistantId: AssistantCharacterId;
  setActiveAssistantMessage: (message: AssistantMessage | null) => void;
  setSelectedAssistantId: (assistantId: AssistantCharacterId) => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
  activeMessage: null,
  selectedAssistantId: "floating-cat",
  setActiveAssistantMessage: (message) =>
    set(() => ({ activeMessage: message })),
  setSelectedAssistantId: (assistantId) =>
    set(() => ({ selectedAssistantId: assistantId })),
}));
