import { SectionTitle } from "@/components/SectionTitle";
import { Wrapper } from "@/components/Wrapper";
import { useTranslation } from "@/hooks/useTranslation";
import { styled } from "styled-components";

export default function About() {
  const { handleTranslation } = useTranslation();

  return (
    <Wrapper id="about">
      <SectionTitle>
        {handleTranslation({
          text: `Sobre`,
          translation: `About`,
        })}
      </SectionTitle>

      <p>
        {handleTranslation({
          text: `Olá, eu sou a Manuela Ferraz (ela/dela). Desenvolvedora Front-End, brasileira, carioca vivendo em Londrina/PR, e apaixonada por transformar ideias em experiências digitais bem construídas.`,
          translation: `Hi, I’m Manuela Ferraz (she/her). A Front-End Developer from Brazil, originally from Rio de Janeiro and currently living in Londrina, passionate about turning ideas into well-crafted digital experiences.`,
        })}
      </p>

      <p>
        {handleTranslation({
          text: `Sou formada em Desenvolvimento Web e trabalho principalmente com React, TypeScript e Next.js, criando interfaces responsivas, acessíveis e fluidas. Gosto de pensar além do código: me importo com a experiência de quem usa, com a organização do projeto e com soluções que sejam sustentáveis no longo prazo.`,
          translation: `I hold a degree in Web Development and work mainly with React, TypeScript, and Next.js, building responsive, accessible, and fluid interfaces. I like to think beyond code — focusing on user experience, project organization, and solutions that are scalable and maintainable over time.`,
        })}
      </p>

      <p>
        {handleTranslation({
          text: `Estou sempre em busca de novos desafios que me façam evoluir como profissional e como pessoa. Aprender algo novo, melhorar processos e construir produtos de qualidade é o que me move. Se quiser conhecer melhor meu trabalho, fique à vontade para explorar meus projetos.`,
          translation: `I’m constantly looking for new challenges that help me grow both professionally and personally. Learning new things, improving processes, and delivering high-quality products is what drives me. Feel free to explore my projects to get to know my work.`,
        })}
      </p>
    </Wrapper>
  );
}
