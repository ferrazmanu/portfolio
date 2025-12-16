import { styled } from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  width: 100%;
  margin: 0 auto;
  gap: 15px;
  justify-content: center;

  height: 100%;
  min-height: 100dvh;
  scroll-snap-align: center;
  padding: 50px 60px 20px 20px;

  .arrow {
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .last-section {
    transform: rotate(180deg);
  }

  @media only screen and (max-width: 1024px) {
    max-width: 90%;
  }

  @media only screen and (max-width: 768px) {
    height: auto;
    scroll-snap-align: initial;
    max-width: 95%;
  }
`;
