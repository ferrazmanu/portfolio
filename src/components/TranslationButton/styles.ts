import { styled } from "styled-components";

export const ButtonWrapper = styled.div`
  position: fixed;
  left: 14px;
  top: 14px;
  z-index: 99;

  .button {
    position: relative;
    width: 72px;
    height: 34px;
    border-radius: 999px;
    background: rgba(18, 28, 24, 0.85);
    border: 1px solid rgba(61, 220, 151, 0.35);
    backdrop-filter: blur(6px);
    overflow: hidden;
  }

  .checkbox {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .knobs {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;

    &:before {
      content: "PT";
      position: absolute;
      top: 3px;
      left: 4px;
      width: 26px;
      height: 26px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;

      color: #e6f1eb;
      background: linear-gradient(135deg, #1f7f5c 0%, #145c44 100%);

      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(31, 127, 92, 0.45);
      transition: 0.35s cubic-bezier(0.18, 0.89, 0.35, 1.15);
    }
  }

  .checkbox:checked + .knobs:before {
    content: "EN";
    left: 42px;
    background: linear-gradient(135deg, #249f73 0%, #1a6f53 100%);
    box-shadow: 0 4px 16px rgba(36, 159, 115, 0.55);
  }

  .layer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(36, 159, 115, 0.08),
      rgba(18, 28, 24, 0.2)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  .checkbox:hover ~ .layer {
    opacity: 1;
  }

  @media only screen and (max-width: 768px) {
    left: unset;
    right: 14px;
    top: 14px;
  }
`;
