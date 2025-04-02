import { Container } from "@/components/Shared/Container";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { MainContent } from "@/components/Shared/Wrapper";

import { Arrow } from "@/assets/svgs/arrow";

import { SectionProps } from "@/types";

import { Translate } from "@/hooks/translate";
import * as S from "./styles";

export function Career({ reference, scrollTo, nextSection }: SectionProps) {
  const careerData = [
    {
      companyName: "TheSoilCompany",
      activities: Translate({
        text: `Desenvolvimento e manutenção do front-end de um sistema interno baseado na web, garantindo uma experiência de usuário responsiva e fluida. Implementação da aplicação utilizando Next.js e TypeScript, seguindo boas práticas de desenvolvimento para escalabilidade e manutenção.`,
        translation: `Development and maintenance of the front-end of an internal web-based system, ensuring a seamless and responsive user experience. Implementation of the application using Next.js and TypeScript, following best development practices for scalability and maintainability.`,
      }),
      time: Translate({
        text: `NOV/2024 - Atual`,
        translation: `NOV/2024 - Present`,
      }),
    },
    {
      companyName: "Retornar",
      activities: Translate({
        text: `Criação e manutenção do front-end de aplicações web e plataformas de e-commerce para o sistema interno da empresa. Otimização das aplicações para máxima velocidade e escalabilidade, garantindo um desempenho eficiente.`,
        translation: `Creation and maintenance of the front-end of web applications and e-commerce platforms for the company's internal system. Optimization of applications for maximum speed and scalability, ensuring efficient performance.`,
      }),
      time: Translate({
        text: `SET/2022 - OUT/2024`,
        translation: `SEP/2022 - OCT/2024`,
      }),
    },
    {
      companyName: "codie.digital",
      activities: Translate({
        text: `Desenvolvimento de landing pages personalizadas, sites institucionais e e-commerce, garantindo compatibilidade com dispositivos móveis e diferentes navegadores.`,
        translation: `Development of custom landing pages, institutional websites, and e-commerce, ensuring compatibility with mobile devices and different browsers.`,
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
