import { selectLangState, setLanguage } from "@/store/langSlice";
import { useDispatch, useSelector } from "react-redux";

import * as S from "./styles";

export const TranslationButton = () => {
  const language = useSelector(selectLangState);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (language === "pt") {
      dispatch(setLanguage("en"));
    } else {
      dispatch(setLanguage("pt"));
    }
  };

  return (
    <S.ButtonWrapper className="translation">
      <div className="button">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => handleClick()}
          defaultChecked={language !== "pt"}
        />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </S.ButtonWrapper>
  );
};
