import { styled } from "styled-components";

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  height: 100vh;
  transform: translateX(calc(100% - 61px));
  transition: ease-in-out 0.3s;
  background-color: #000;
  display: flex;
  font-size: 22px;

  &:hover {
    transform: translateX(0%);
    max-width: 250px;
    width: 100%;
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 10px;
    height: inherit;
    padding: 45px 10px;
    align-items: center;
    width: 100%;

    li {
      a {
        display: inline-block;
        vertical-align: middle;
        transform: perspective(1px) translateZ(0);
        position: relative;
        overflow: hidden;

        &:before {
          content: "";
          position: absolute;
          z-index: -1;
          left: 51%;
          right: 51%;
          bottom: 0;
          background: #fff;
          height: 1px;
          transition-property: left, right;
          transition-duration: 0.2s;
          transition-timing-function: ease-out;
        }

        &:hover {
          &:before {
            left: 0;
            right: 0;
          }
        }
      }
    }
  }

  .title {
    writing-mode: vertical-rl;
    display: flex;
    align-self: center;
    justify-content: center;
    padding: 20px;
    height: 100%;
  }

  @media only screen and (max-width: 992px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 375px) {
    font-size: 16px;
  }
`;
