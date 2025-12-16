import Image from "next/image";
import Link from "next/link";

import { SectionTitle } from "@/components/SectionTitle";
import { Wrapper } from "@/components/Wrapper";
import { useTranslation } from "@/hooks/useTranslation";

import { PROJECTS_DATA } from "@/data/projects";

import styled from "styled-components";

export default function Projects() {
  const { handleTranslation } = useTranslation();

  return (
    <ProjectsSection id="projects">
      <SectionTitle>
        {handleTranslation({
          text: "Projetos",
          translation: "Projects",
        })}
      </SectionTitle>

      <ul className="projects-list">
        {PROJECTS_DATA.map((project) => (
          <li key={project.name} className="project-card">
            <div className="image">
              {project.link ? (
                <Link
                  href={project.link}
                  target="_blank"
                  aria-label={`Abrir projeto ${project.name}`}
                >
                  <Image
                    src={project.imageUrl}
                    alt={`Imagem do projeto ${project.name}`}
                    fill
                  />
                </Link>
              ) : (
                <Image
                  src={project.imageUrl}
                  alt={`Imagem do projeto ${project.name}`}
                  fill
                />
              )}
            </div>

            <div className="content">
              <header>
                <h3>{project.name}</h3>
                <span className="date">
                  {handleTranslation({
                    text: project.date.pt,
                    translation: project.date.en,
                  })}
                </span>
              </header>

              <p>
                {handleTranslation({
                  text: project.description.pt,
                  translation: project.description.en,
                })}
              </p>

              <ul className="stack">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>

              <div className="links">
                {project.link && (
                  <Link href={project.link} target="_blank">
                    Live
                  </Link>
                )}
                {project.link && project.github && <span>|</span>}
                {project.github && (
                  <Link href={project.github} target="_blank">
                    GitHub
                  </Link>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ProjectsSection>
  );
}

export const ProjectsSection = styled(Wrapper)`
  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 32px;
    list-style: none;
    padding: 0;
    margin-top: 32px;
  }

  .project-card {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 24px;
    align-items: flex-start;
  }

  .image {
    position: relative;
    width: 100%;
    height: 140px;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #222;

    img {
      object-fit: cover;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  }

  h3 {
    font-size: 22px;
    font-weight: 600;
  }

  .date {
    font-size: 14px;
    opacity: 0.6;
    font-style: italic;
    white-space: nowrap;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    opacity: 0.85;
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin-top: 4px;

    li {
      font-size: 13px;
      padding: 4px 10px;
      border: 1px solid #555;
      border-radius: 999px;
      opacity: 0.75;
    }
  }

  .links {
    display: flex;
    gap: 8px;
    margin-top: 4px;
    font-size: 15px;

    a {
      position: relative;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 0;
        height: 1px;
        background: #fff;
        transition: width 0.2s ease;
      }

      &:hover:after {
        width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    .project-card {
      grid-template-columns: 1fr;
    }

    .image {
      height: 180px;
    }

    header {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
  }
`;
