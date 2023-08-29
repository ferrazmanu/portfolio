import { SectionTitle } from "@/components/Shared/SectionTitle";
import { Container } from "@/components/Shared/Container";
import { MainContent } from "@/components/Shared/Wrapper";

import { Arrow } from "@/assets/svgs/arrow";

import { SectionProps } from "@/types";

import * as S from "./styles";
import { Translate } from "@/hooks/translate";

export function Datasheet({ reference, scrollTo, nextSection }: SectionProps) {
  return (
    <S.DatasheetWrapper id="datasheet" ref={reference}>
      <Container>
        <MainContent>
          <div className="wrapper">
            <SectionTitle>
              {Translate({
                text: `Ficha Técnica`,
                translation: `Datasheet`,
              })}
            </SectionTitle>

            <ul>
              <li>
                <span>Soft skills: </span>
                {Translate({
                  text: `proatividade, adaptabilidade,
                organização, paciência, resolução de problemas e grande atenção
                a detalhes`,
                  translation: `proactivity, adaptability,
                organization, patience, problem solving and great attention
                the details`,
                })}
                ;
              </li>
              <li>
                <span>Hard skills: </span>
                {Translate({
                  text: `React.js, Next.js, Typescript, HTML e CSS`,
                  translation: `React.js, Next.js, Typescript, HTML and CSS`,
                })}
              </li>
              <li>
                <span>
                  {Translate({
                    text: `Línguas: `,
                    translation: `Languages: `,
                  })}
                </span>
                {Translate({
                  text: `Português nativo e Inglês Proeficiente (EF SET English
                      Certificate C2)`,
                  translation: `Native Portuguese and Proficient English (EF SET English
                      Certificate C2)`,
                })}
                ;
              </li>
              <li>
                <span>
                  {Translate({
                    text: `Educação: `,
                    translation: `Education: `,
                  })}
                </span>
                {Translate({
                  text: `Desenvolvimento Web pela Universidade Norte do Paraná`,
                  translation: `Web Development by the North University of Paraná`,
                })}
                ;
              </li>
              <li>
                <span>Hobbies: </span>
                {Translate({
                  text: `Valorant, League of Legends, RPG, LEITURA!`,
                  translation: `Valorant, League of Legends, RPG, READING!`,
                })}
              </li>
            </ul>
          </div>

          <button
            className="arrow"
            onClick={() => scrollTo && scrollTo(nextSection)}
          >
            <Arrow />
          </button>
        </MainContent>
      </Container>
    </S.DatasheetWrapper>
  );
}
