import { useSelector } from "react-redux";
import { selectLangState } from "@/store/langSlice";
import { TranslationProps } from "@/types";

export const useTranslation = () => {
  const language = useSelector(selectLangState);

  const handleTranslation = ({ text, translation }: TranslationProps) => {
    if (!language) return text;
    if (language === "pt") {
      return text;
    } else {
      return translation;
    }
  };

  return { handleTranslation };
};
