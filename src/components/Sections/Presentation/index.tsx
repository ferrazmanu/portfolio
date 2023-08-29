import { Translate } from "@/hooks/translate";

import { Container } from "@/components/Shared/Container";
import { MainContent } from "@/components/Shared/Wrapper";

import { Arrow } from "@/assets/svgs/arrow";

import { SectionProps } from "@/types";

import * as S from "./styled";

export function Presentation({
  reference,
  scrollTo,
  nextSection,
}: SectionProps) {
  return (
    <S.PresentationWrapper id="presentation" ref={reference}>
      <Container>
        <MainContent>
          <div className="wrapper">
            <div className="title">
              <h1> Manuela Ferraz, </h1>
              <h2>
                {Translate({
                  text: "Desenvolvedora Front-End",
                  translation: "Front End Developer",
                })}
              </h2>
            </div>

            <div className="presentation">
              <p>
                {Translate({
                  text: `Olá, sou Manuela Ferraz, tenho 26 anos. Brasileira, carioca
                  morando em Londrina/PR.`,
                  translation: `Hello, I'm Manuela Ferraz, I'm 26 years old. brazilian, carioca
                  living in Londrina/PR.`,
                })}
              </p>
              <p>
                {Translate({
                  text: `Sou Desenvolvedora front-end há 2 anos e trabalho com React,
                  Typescript e Nextjs.`,
                  translation: `I've been a front-end developer for 2 years and I work with React,
                  Typescript and Nextjs.`,
                })}
              </p>
              <p>
                {Translate({
                  text: `Apaixonada por programação, sempre busco desafios em que vão me
                  trazer novas experiências e grandes aprendizados.`,
                  translation: `Passionate about programming, I'm always looking for challenges that will
                  bring new experiences and great learning.`,
                })}
              </p>
              <p style={{ textDecoration: "underline" }}>
                {Translate({
                  text: `Seja bem-vindo(a) ao meu portfólio.`,
                  translation: `Welcome to my portfolio.`,
                })}
              </p>
            </div>
          </div>

          <button
            className="arrow"
            onClick={() => scrollTo && scrollTo(nextSection)}
          >
            <Arrow />
          </button>
        </MainContent>
      </Container>
    </S.PresentationWrapper>
  );
}
