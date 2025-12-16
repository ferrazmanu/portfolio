import { styled } from "styled-components";

export const SectionTitle = styled.div`
  font-size: 40px;
  font-weight: bold;

  display: flex;
  align-items: center;
  gap: 16px;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    font-size: 30px;
  }
`;
