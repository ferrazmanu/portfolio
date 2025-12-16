import Link from "next/link";
import styled from "styled-components";

export const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 12px 32px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;

  color: #e6f1eb;
  background: transparent;

  border: 1px solid rgba(61, 220, 151, 0.5);

  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease,
    box-shadow 0.25s ease, transform 0.15s ease;

  &:hover {
    background: rgba(61, 220, 151, 0.15);
    border-color: #3ddc97;
    box-shadow: 0 0 0 1px rgba(61, 220, 151, 0.4);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &.primary {
    background: linear-gradient(135deg, #1f7f5c 0%, #145c44 100%);
    border-color: transparent;
    color: #f4fbf8;

    &:hover {
      background: linear-gradient(135deg, #249f73 0%, #1a6f53 100%);
      box-shadow: 0 6px 20px rgba(36, 159, 115, 0.35);
    }
  }

  &.secondary {
    opacity: 0.65;

    &:hover {
      opacity: 1;
      background: rgba(61, 220, 151, 0.08);
    }
  }
`;
