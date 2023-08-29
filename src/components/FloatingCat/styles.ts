import { styled } from "styled-components";

const WIDTH = "98px";
const HEIGHT = "80px";

export const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  aspect-ratio: ${WIDTH} / ${HEIGHT};
  animation: x 13s linear infinite alternate;

  @keyframes x {
    100% {
      transform: translateX(calc(100vw - ${WIDTH}));
    }
  }

  @keyframes y {
    100% {
      transform: translateY(calc(100vh - ${WIDTH}));
    }
  }

  img {
    max-height: ${HEIGHT};
    max-width: ${WIDTH};
    animation: y 7s linear infinite alternate;
  }
`;
