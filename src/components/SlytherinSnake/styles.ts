import { styled } from "styled-components";

const WIDTH = 140;
const HEIGHT = 60;

export const Wrapper = styled.div`
  position: fixed;
  bottom: 8px;
  left: 0;

  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  aspect-ratio: ${WIDTH} / ${HEIGHT};

  z-index: 5;
  pointer-events: none;

  animation: snakeMove 45s linear infinite;

  filter: drop-shadow(0 0 2px rgba(46, 204, 113, 0.25));

  @keyframes snakeMove {
    0% {
      transform: translateX(0) scaleX(1);
    }

    49.9% {
      transform: translateX(calc(100dvw - ${WIDTH}px)) scaleX(1);
    }

    50% {
      transform: translateX(calc(100dvw - ${WIDTH}px)) scaleX(-1);
    }

    100% {
      transform: translateX(0) scaleX(-1);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform-origin: 50% 60%;
  }

  @media (max-width: 768px) {
    width: ${WIDTH / 1.3}px;
    height: ${HEIGHT / 1.3}px;
    aspect-ratio: ${WIDTH / 1.3} / ${HEIGHT / 1.3};
  }
`;
