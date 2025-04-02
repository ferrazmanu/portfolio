import { styled } from "styled-components";

export const Wrapper = styled.section`
  height: 100dvh;
  min-height: min-content;
  scroll-snap-align: center;
  padding: 20px 0;

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

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 3vh;
    height: 100%;
    min-height: inherit;
  }

  @media only screen and (max-width: 768px) {
    height: auto;
    scroll-snap-align: initial;
  }
`;

export const MainContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
  min-height: inherit;
  gap: 15px;
  padding: 60px 0;

  @media only screen and (max-width: 992px) {
    padding: 30px 0;
  }

  @media only screen and (max-width: 768px) {
    padding: 0;
    min-height: 40dvh;
  }
`;
