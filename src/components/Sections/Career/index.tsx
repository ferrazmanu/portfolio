import { SectionTitle } from "@/components/Shared/SectionTitle";
import { Container } from "@/components/Shared/Container";
import { MainContent } from "@/components/Shared/Wrapper";

import { Arrow } from "@/assets/svgs/arrow";

import { SectionProps } from "@/types";

import * as S from "./styles";
import Link from "next/link";
import { Translate } from "@/hooks/translate";

export function Career({ reference, scrollTo, nextSection }: SectionProps) {
  const careerData = [
    {
      companyName: "Retornar",
      activities: Translate({
        text: `Desenvolvimento e análise de sistema interno da empresa, utilizando Reactjs e Typescript`,
        translation: `Development and analysis of the company's internal system, using Reactjs and Typescript`,
      }),
      time: Translate({
        text: `SET/2022 - Atual`,
        translation: `SEP/2022 - Current`,
      }),
    },
    {
      companyName: "codie.digital",
      activities: Translate({
        text: `Desenvolvimento front-end de websites para empresas, utilizando HTML, CSS e Javascript`,
        translation: `Front-end development of websites for companies, using HTML, CSS and Javascript`,
      }),
      time: Translate({
        text: `JUL/2021 - SET/2022`,
        translation: `JUL/2021 - SEP/2022`,
      }),
    },
  ];

  return (
    <S.CareerWrapper id="career" ref={reference}>
      <Container>
        <MainContent>
          <div className="wrapper">
            <SectionTitle>
              {Translate({
                text: `Carreira`,
                translation: `Career`,
              })}
            </SectionTitle>

            <ul>
              {careerData.map((data) => {
                return (
                  <li key={data.companyName}>
                    <h4>{data.companyName}</h4>
                    <p>{data.activities}</p>
                    <p style={{ fontStyle: "italic" }}>{data.time}</p>
                  </li>
                );
              })}
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
    </S.CareerWrapper>
  );
}
