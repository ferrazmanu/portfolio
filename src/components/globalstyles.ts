import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body {
    scroll-behavior: smooth;
  }

  body {
    color: #e6f1eb;
    background: linear-gradient(
      180deg,
      #0f1915 0%,
      #0b0f0d 100%
    );
    font-family: 'Rajdhani', sans-serif;
    font-weight: 400;
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, li {
    list-style: none;
  }

  a, p, li {
    font-weight: 300;
  }

  h1 {
    font-size: 72px;
    font-weight: 700;
    color: #f0f7f3;
    letter-spacing: -1px;
  }

  h2 {
    font-size: 32px;
    font-weight: 300;
    opacity: 0.85;
    color: #d3e6dc;
  }

  h3 {
    font-weight: 600;
    color: #eaf5ef;
  }

  p {
    font-size: 20px;
    line-height: 1.6;
    color: #cfe0d8;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 30px;
    position: relative;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    scroll-snap-type: y mandatory;
    width: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: #0b0f0d;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #1f3d2e;
    border-radius: 10px;
  }

  .fadeInSection {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1s ease-out, transform 1s ease-out;
    will-change: opacity, transform;
  }

  .visible {
    animation: fadeInLeft 1s ease-out forwards;
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media only screen and (max-width: 768px) {
    body {
      overflow: auto;
    }

    main {
      overscroll-behavior-y: initial;
      scroll-snap-type: initial;
      height: auto;
    }

    h1 {
      font-size: 48px;
    }

    h2 {
      font-size: 24px;
    }

    p {
      font-size: 18px;
    }
  }
`;
