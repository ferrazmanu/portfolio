import { useSelector } from "react-redux";
import { selectLangState } from "@/store/langSlice";
import { TranslationProps } from "@/types";

export const Translate = ({ text, translation }: TranslationProps) => {
  const language = useSelector(selectLangState);

  if (language === "pt") {
    return text;
  } else {
    return translation;
  }
};
