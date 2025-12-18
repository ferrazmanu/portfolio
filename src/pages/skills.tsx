import { SectionTitle } from "@/components/SectionTitle";
import { Wrapper } from "@/components/Wrapper";
import { CERTIFICATES } from "@/data/certificates";
import { useTranslation } from "@/hooks/useTranslation";
import styled from "styled-components";

export default function Skills() {
  const { handleTranslation } = useTranslation();

  return (
    <SkillsSection id="skills">
      <SectionTitle>
        {handleTranslation({
          text: "Ficha Técnica",
          translation: "Skills",
        })}
      </SectionTitle>

      <div className="grid">
        <div>
          <h4>
            {handleTranslation({
              text: "Habilidades Técnicas",
              translation: "Hard Skills",
            })}
          </h4>
          <p>
            {handleTranslation({
              text: "React.js, Next.js, TypeScript, HTML e CSS",
              translation: "React.js, Next.js, TypeScript, HTML and CSS",
            })}
          </p>
        </div>

        <div>
          <h4>
            {handleTranslation({
              text: "Habilidades Interpessoais",
              translation: "Soft Skills",
            })}
          </h4>
          <p>
            {handleTranslation({
              text: "Proatividade, adaptabilidade, organização, paciência, resolução de problemas e grande atenção a detalhes",
              translation:
                "Proactivity, adaptability, organization, patience, problem solving and great attention to details",
            })}
          </p>
        </div>

        <div>
          <h4>
            {handleTranslation({
              text: "Línguas",
              translation: "Languages",
            })}
          </h4>
          <p>
            {handleTranslation({
              text: "Português nativo e Inglês Proficiente (EF SET English Certificate C2)",
              translation:
                "Native Portuguese and Proficient English (EF SET English Certificate C2)",
            })}
          </p>
        </div>

        <div>
          <h4>Hobbies</h4>
          <p>
            {handleTranslation({
              text: "Jogos online, RPG de mesa, música e leitura!",
              translation: "Online games, tabletop RPG, music and reading!",
            })}
          </p>
        </div>
      </div>

      <div className="education">
        <h4>
          {handleTranslation({
            text: "Educação",
            translation: "Education",
          })}
        </h4>

        <p>
          {handleTranslation({
            text: "Desenvolvimento Web pela Universidade Norte do Paraná / Junho 2021 – Dezembro 2023",
            translation:
              "Web Development at North University of Paraná / June 2021 – December 2023",
          })}
        </p>

        <p>
          {handleTranslation({
            text: "Ensino Médio Profissionalizante – Informática / Fevereiro 2012 – Dezembro 2014",
            translation:
              "Technical High School in Computer Science / February 2012 – December 2014",
          })}
        </p>
      </div>

      <div className="certificates">
        <h4>
          {handleTranslation({
            text: "Licenças e Certificados",
            translation: "Licenses and Certificates",
          })}
        </h4>

        <ul>
          {CERTIFICATES.map((cert, index) => (
            <li key={index}>
              <strong>
                {handleTranslation({
                  text: cert.title.pt,
                  translation: cert.title.en,
                })}
              </strong>

              <span>
                {cert.issuer} •{" "}
                {handleTranslation({
                  text: cert.date.pt,
                  translation: cert.date.en,
                })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </SkillsSection>
  );
}

export const SkillsSection = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  gap: 50px;

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  h4 {
    font-size: 22px;
    margin-bottom: 10px;
  }

  p {
    opacity: 0.8;
    line-height: 1.6;
  }

  .certificates ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 16px;
    margin-top: 20px;
  }

  .certificates li {
    background: rgba(20, 40, 30, 0.6);
    border: 1px solid rgba(46, 204, 113, 0.25);
    border-radius: 12px;
    padding: 14px 16px;
    transition: 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      border-color: rgba(46, 204, 113, 0.6);
    }

    strong {
      display: block;
      font-size: 14px;
      margin-bottom: 4px;
    }

    span {
      font-size: 13px;
      opacity: 0.7;
    }
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;
