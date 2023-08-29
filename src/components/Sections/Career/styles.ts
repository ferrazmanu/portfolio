import { Wrapper } from "@/components/Shared/Wrapper";
import { styled } from "styled-components";

export const CareerWrapper = styled(Wrapper)`
  ul {
    display: flex;
    flex-direction: column;
    gap: 30px;
    font-size: 28px;

    li {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    h4 {
      font-size: 30px;
    }
  }

  @media only screen and (max-width: 992px) {
    ul {
      font-size: 24px;

      h4 {
        font-size: 26px;
      }
    }
  }

  @media only screen and (max-width: 375px) {
    ul {
      font-size: 18px;

      h4 {
        font-size: 20px;
      }
    }
  }
`;
