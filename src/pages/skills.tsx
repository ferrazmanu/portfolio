import { SectionTitle } from "@/components/SectionTitle";
import { Wrapper } from "@/components/Wrapper";
import { useTranslation } from "@/hooks/useTranslation";
import styled from "styled-components";

export default function Skills() {
  const { handleTranslation } = useTranslation();

  return (
    <SkillsSection id="skills">
      <SectionTitle>
        {handleTranslation({
          text: `Ficha Técnica`,
          translation: `Skills`,
        })}
      </SectionTitle>

      <div className="grid">
        <div>
          <h4>
            {handleTranslation({
              text: `Habilidades Técnicas`,
              translation: `Hard Skills`,
            })}
          </h4>
          <p>
            {handleTranslation({
              text: `React.js, Next.js, Typescript, HTML e CSS`,
              translation: `React.js, Next.js, Typescript, HTML and CSS`,
            })}
          </p>
        </div>

        <div>
          <h4>
            {handleTranslation({
              text: `Habilidades Interpessoais `,
              translation: `Soft Skills`,
            })}
          </h4>
          <p>
            {handleTranslation({
              text: `Proatividade, adaptabilidade, organização, paciência, resolução de problemas e grande atenção a detalhes`,
              translation: `proactivity, adaptability, organization, patience, problem solving and great attention the details`,
            })}
          </p>
        </div>

        <div>
          <h4>
            {handleTranslation({
              text: `Línguas`,
              translation: `Languages`,
            })}
          </h4>
          <p>
            {handleTranslation({
              text: `Português nativo e Inglês Proeficiente (EF SET English Certificate C2)`,
              translation: `Native Portuguese and Proficient English (EF SET English Certificate C2)`,
            })}
          </p>
        </div>

        <div>
          <h4>
            {handleTranslation({
              text: `Educação`,
              translation: `Education`,
            })}
          </h4>
          <p>
            {handleTranslation({
              text: `Desenvolvimento Web pela Universidade Norte do Paraná`,
              translation: `Web Development by the North University of Paraná`,
            })}
          </p>
        </div>

        <div>
          <h4>Hobbies</h4>
          <p>
            {handleTranslation({
              text: `Jogos online, RPG de mesa, música e leitura!`,
              translation: `Online games, tabletop RPG, music and reading!`,
            })}
          </p>
        </div>
      </div>
    </SkillsSection>
  );
}

export const SkillsSection = styled(Wrapper)`
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  h4 {
    font-size: 22px;
    margin-bottom: 8px;
  }

  p {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;
