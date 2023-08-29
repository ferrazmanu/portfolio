import Image from "next/image";
import * as S from "./styles";

import AstroCat from "@/assets/gifs/astrocat.gif";

export const FloatingCat = () => {
  return (
    <S.Wrapper>
      <Image src={AstroCat} alt="astrocat" fill />
    </S.Wrapper>
  );
};
