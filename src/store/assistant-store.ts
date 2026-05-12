import { create } from "zustand";

import type {
  AssistantCharacterId,
  AssistantMessage,
} from "@/components/floating-assistant/assistant-messages";

interface AssistantState {
  activeMessage: AssistantMessage | null;
  assistantHideRequestId: number;
  isAssistantHidden: boolean;
  selectedAssistantId: AssistantCharacterId;
  hideAssistant: () => void;
  requestHideAssistant: () => void;
  setActiveAssistantMessage: (message: AssistantMessage | null) => void;
  setSelectedAssistantId: (assistantId: AssistantCharacterId) => void;
  showAssistant: () => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
  activeMessage: null,
  assistantHideRequestId: 0,
  isAssistantHidden: false,
  selectedAssistantId: "floating-cat",
  hideAssistant: () => set(() => ({ isAssistantHidden: true })),
  requestHideAssistant: () =>
    set((state) => ({
      assistantHideRequestId: state.assistantHideRequestId + 1,
    })),
  setActiveAssistantMessage: (message) =>
    set(() => ({ activeMessage: message })),
  setSelectedAssistantId: (assistantId) =>
    set(() => ({ selectedAssistantId: assistantId })),
  showAssistant: () => set(() => ({ isAssistantHidden: false })),
}));
