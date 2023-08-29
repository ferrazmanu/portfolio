import { styled } from "styled-components";

export const ButtonWrapper = styled.div`
  position: fixed;
  left: 10px;
  top: 10px;
  z-index: 99;

  .button {
    width: 74px;
    height: 36px;
    border: 1px solid #fff;
    border-radius: 20px;
  }

  .checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .checkbox:checked + .knobs:before {
    content: "EN";
    left: 42px;
    background-color: #fff;
    color: #000;
  }

  .checkbox:checked ~ .layer {
    background-color: #fcebeb;
  }

  .knobs {
    z-index: 2;
    transition: 0.3s ease all;

    &:before {
      content: "PT";
      position: absolute;
      top: 4px;
      left: 4px;
      width: 20px;
      height: 10px;
      color: #fff;
      font-size: 10px;
      font-weight: bold;
      text-align: center;
      line-height: 1;
      padding: 9px 4px;
      background-color: #000;
      border-radius: 50%;
      transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
    }
  }

  .layer {
    width: 100%;
    background-color: #ebf7fc;
    transition: 0.3s ease all;
    z-index: 1;
  }
`;
