import { SectionTitle } from "@/components/SectionTitle";
import { Wrapper } from "@/components/Wrapper";

export default function About() {
  return (
    <Wrapper id="about">
      <SectionTitle>Sobre</SectionTitle>

      <p>
        Olá, eu sou a Manuela Ferraz (ela/dela). Desenvolvedora Front-End,
        brasileira, carioca vivendo em Londrina/PR, e apaixonada por transformar
        ideias em experiências digitais bem construídas.
      </p>

      <p>
        Trabalho principalmente com React, TypeScript e Next.js, criando
        interfaces responsivas, acessíveis e fluidas. Também me importo com a
        experiência de quem usa, com a organização do projeto e com soluções
        sustentáveis no longo prazo.
      </p>
    </Wrapper>
  );
}
