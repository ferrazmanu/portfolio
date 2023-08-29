import { Wrapper } from "@/components/Shared/Wrapper";
import { styled } from "styled-components";

export const ProjectsWrapper = styled(Wrapper)`
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(353px, 1fr));
    grid-row-gap: 30px;
    grid-column-gap: 16px;
  }

  .box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: inherit;

    .image {
      position: relative;
      width: inherit;
      height: 260px;

      img {
        width: inherit;
        object-fit: cover;
      }
    }

    .description {
      font-size: 28px;

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

  .swiper {
    width: 100%;
    height: inherit;
  }

  @media only screen and (max-width: 992px) {
    .box {
      gap: 15px;

      .image {
        min-height: 260px;
        height: 40vh;

        img {
          object-fit: contain;
        }
      }
      .description {
        font-size: 24px;
      }
    }
  }

  @media only screen and (max-width: 375px) {
    .box {
      .image {
        height: auto;
        min-height: 200px;

        img {
          object-fit: cover;
        }
      }

      .description {
        font-size: 18px;
      }
    }
  }
`;
