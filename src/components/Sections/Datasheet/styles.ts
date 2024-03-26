import { Wrapper } from "@/components/Shared/Wrapper";
import { styled } from "styled-components";

export const DatasheetWrapper = styled(Wrapper)`
  ul,
  li {
    list-style: circle;
  }

  ul {
    font-size: 28px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 2vh;

    li {
      span {
        font-weight: 400;
      }
    }
  }

  @media only screen and (max-width: 992px) {
    ul {
      font-size: 24px;
    }
  }

  @media only screen and (max-width: 768px) {
    ul {
      font-size: 18px;
    }
  }
`;
