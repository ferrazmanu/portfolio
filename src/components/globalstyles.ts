import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    color: #fff;
    background-color: #111;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 400;
    overflow: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  
  ul, li{
    list-style: none;
  }

  html, body{
    scroll-behavior: smooth;
  }

  a, p, li{
    font-weight: 300;
  }

  main{
    display: flex;
    flex-direction: column;
    gap: 30px;
    position: relative;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    scroll-snap-type: y mandatory;
    height: 100dvh;
    width: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
    padding-right: 61px;
    
    &::-webkit-scrollbar{
      display: none;
    }
  }

  
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #222;
  }

  ::-webkit-scrollbar {
    width: 4px;
    border-radius: 10px;
    background-color: #222;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #000;
  }

  @media only screen and (max-width: 768px) {
    body{
      overflow: auto;
    }

     main{
      overscroll-behavior-y: initial;
      scroll-snap-type: initial;
      height: auto;
     }
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
`;
