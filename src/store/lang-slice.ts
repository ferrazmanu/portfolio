import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { Language } from "@/types";

const initialState: Language = {
  language: "pt",
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language["language"]>) {
      state.language = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      const hydrateAction = action as PayloadAction<{ lang?: Language }>;

      return {
        ...state,
        ...hydrateAction.payload.lang,
      };
    });
  },
});

export const { setLanguage } = langSlice.actions;

export const selectLangState = (state: AppState) => state.lang.language;

export default langSlice.reducer;
