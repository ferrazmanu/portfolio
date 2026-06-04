import { create } from "zustand";

import type {
  AssistantCharacterId,
  AssistantMessage,
} from "@/components/floating-assistant/assistant-messages";

interface AssistantState {
  activeMessage: AssistantMessage | null;
  isAssistantHidden: boolean;
  selectedAssistantId: AssistantCharacterId;
  setAssistantMessage: (message: AssistantMessage | null) => void;
  setSelectedAssistantId: (assistantId: AssistantCharacterId) => void;
  toggleAssistant: () => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
  activeMessage: null,
  isAssistantHidden: false,
  selectedAssistantId: "floating-cat",
  setAssistantMessage: (message) => set(() => ({ activeMessage: message })),
  setSelectedAssistantId: (assistantId) =>
    set(() => ({ selectedAssistantId: assistantId })),
  toggleAssistant: () =>
    set((state) => ({
      isAssistantHidden: !state.isAssistantHidden,
    })),
}));
