import { styled } from "styled-components";

const WIDTH = "98";
const HEIGHT = "80";

export const Wrapper = styled.div`
  position: absolute;
  height: ${HEIGHT}px;
  width: ${WIDTH}px;
  aspect-ratio: ${WIDTH} / ${HEIGHT};
  animation: x 13s linear infinite alternate;

  @keyframes x {
    100% {
      transform: translateX(calc(100vw - ${WIDTH}px));
    }
  }

  @keyframes y {
    100% {
      transform: translateY(calc(100dvh - ${WIDTH}px));
    }
  }

  img {
    max-height: ${HEIGHT}px;
    max-width: ${WIDTH}px;
    animation: y 7s linear infinite alternate;
  }
`;
