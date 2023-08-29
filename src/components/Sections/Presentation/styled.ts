import { Wrapper } from "@/components/Shared/Wrapper";
import { styled } from "styled-components";

export const PresentationWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .title {
    h1,
    h2 {
      font-size: 60px;
    }
  }

  .presentation {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 32px;
    font-weight: 300;
  }

  @media only screen and (max-width: 992px) {
    .title {
      h1,
      h2 {
        font-size: 45px;
        line-height: 1;
      }
    }

    .presentation {
      font-size: 24px;
    }
  }

  @media only screen and (max-width: 375px) {
    .title {
      h1,
      h2 {
        font-size: 35px;
      }
    }

    .presentation {
      font-size: 18px;
    }
  }
`;
