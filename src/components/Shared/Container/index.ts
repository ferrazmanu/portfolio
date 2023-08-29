import styled from "styled-components";

export const Container = styled.div`
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  max-width: 80%;
  width: 100%;
  margin: 0 auto;
  gap: 15px;
  height: inherit;
  min-height: inherit;

  @media only screen and (max-width: 1024px) {
    max-width: 90%;
  }

  @media only screen and (max-width: 768px) {
    max-width: 95%;
  }
`;
