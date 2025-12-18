import Image from "next/image";
import * as S from "./styles";

import SnakeGif from "@/assets/gifs/snake.gif";

export const SlytherinSnake = () => {
  return (
    <S.Wrapper>
      <Image src={SnakeGif} alt="snake" fill priority sizes="140px" />
    </S.Wrapper>
  );
};
