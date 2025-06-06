import { Container } from "@/components/Shared/Container";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { MainContent } from "@/components/Shared/Wrapper";

import { Arrow } from "@/assets/svgs/arrow";

import { SectionProps } from "@/types";

import { Translate } from "@/hooks/translate";
import useInView from "@/hooks/useInView";
import Link from "next/link";
import { LegacyRef } from "react";
import * as S from "./styles";

export function Contact({ reference }: SectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const contactData = [
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/ferrazmanuela/",
    },
    {
      name: "GitHub",
      link: "https://github.com/ferrazmanu",
    },
  ];

  return (
    <S.ContactWrapper id="contact" ref={reference}>
      <Container>
        <MainContent
          ref={ref as LegacyRef<HTMLElement>}
          className={`fadeInSection ${isInView ? "visible" : ""}`}
        >
          <div className="wrapper">
            <SectionTitle>
              {Translate({
                text: `Me encontre em:`,
                translation: `Find me at:`,
              })}
            </SectionTitle>

            <ul>
              <li>
                <h4>
                  {Translate({
                    text: `Telefone`,
                    translation: `Phone`,
                  })}
                </h4>
                <Link href="tel:+5543991851015">(43) 99185-1015</Link>
              </li>
              <li>
                <h4>E-mail</h4>
                <Link href="mailto:ferraz.manuela@hotmail.com">
                  ferraz.manuela@hotmail.com
                </Link>
              </li>
              {contactData.map((data) => {
                return (
                  <li key={data.name}>
                    <h4>{data.name}</h4>
                    <Link href={data.link} target="_blank">
                      {data.link}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <Link className="arrow last-section" href="#presentation">
            <Arrow />
          </Link>
        </MainContent>
      </Container>
    </S.ContactWrapper>
  );
}
