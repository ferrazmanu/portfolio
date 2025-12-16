import Link from "next/link";
import styled from "styled-components";

export const Button = styled(Link)`
  padding: 12px 28px;
  border-radius: 999px;
  font-size: 16px;
  border: 1px solid white;
  transition: 0.3s;

  &:hover {
    background: white;
    color: black;
  }

  &.secondary {
    opacity: 0.6;
  }
  a {
  }
`;
