import { styled } from "styled-components";

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  height: 100dvh;

  transform: translateX(calc(100% - 64px));
  transition: transform 0.35s ease;

  display: flex;
  font-size: 22px;

  background: linear-gradient(
    180deg,
    rgba(15, 25, 21, 0.98) 0%,
    rgba(11, 15, 13, 0.98) 100%
  );

  border-left: 1px solid rgba(61, 220, 151, 0.15);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);

  &:hover {
    transform: translateX(0%);
    max-width: 260px;
    width: 100%;
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 12px;
    height: inherit;
    padding: 48px 12px;
    align-items: center;
    width: 100%;
  }

  li {
    a {
      position: relative;
      display: inline-block;
      padding: 4px 2px;
      color: #e6f1eb;
      opacity: 0.85;
      transition: opacity 0.2s ease, color 0.2s ease;

      &:hover {
        opacity: 1;
        color: #3ddc97;
      }

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -3px;
        width: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, #3ddc97, transparent);
        transition: width 0.25s ease;
      }

      &:hover:after {
        width: 100%;
      }
    }
  }

  .title {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    display: flex;
    align-self: center;
    justify-content: center;
    padding: 22px;
    height: 100%;
    font-weight: 600;
    letter-spacing: 2px;
    color: #cfe0d8;
    opacity: 0.85;
    user-select: none;
  }

  @media only screen and (max-width: 992px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 16px;

    transform: translateX(calc(100% - 52px));

    &:hover {
      max-width: 220px;
    }
  }
`;
