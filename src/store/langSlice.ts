import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { Language } from "@/types";

const initialState: Language = {
  language: "pt",
};

// Actual Slice
export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.lang,
      };
    },
  },
});

export const { setLanguage } = langSlice.actions;

export const selectLangState = (state: AppState) => state.lang.language;

export default langSlice.reducer;
