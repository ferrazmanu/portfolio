import { selectLangState, setLanguage } from "@/store/lang-slice";
import { useDispatch, useSelector } from "react-redux";

export const TranslationButton = () => {
  const language = useSelector(selectLangState);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (language === "pt") {
      dispatch(setLanguage("en"));
      return;
    }

    dispatch(setLanguage("pt"));
  };

  return (
    <button
      type="button"
      className="flex h-7 min-w-9 items-center justify-center bg-transparent px-1 text-[11px] font-bold leading-none text-black focus:outline focus:outline-1 focus:outline-dotted focus:outline-black"
      onClick={handleClick}
      aria-label={`Alternar idioma para ${
        language === "pt" ? "inglês" : "português"
      }`}
    >
      {language === "pt" ? "PTB" : "ENG"}
    </button>
  );
};
