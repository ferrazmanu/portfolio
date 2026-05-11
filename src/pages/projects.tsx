import Image from "next/image";
import Link from "next/link";

import { SectionTitle } from "@/components/SectionTitle";
import { Wrapper } from "@/components/Wrapper";
import { PROJECTS_DATA } from "@/data/projects";

export default function Projects() {
  return (
    <Wrapper id="projects" className="gap-8">
      <SectionTitle>Projetos</SectionTitle>

      <ul className="flex flex-col gap-8">
        {PROJECTS_DATA.map((project) => (
          <li key={project.name} className="grid gap-6 md:grid-cols-[220px_1fr]">
            <div className="relative h-44 overflow-hidden border border-black md:h-36">
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
                    className="object-cover"
                  />
                </Link>
              ) : (
                <Image
                  src={project.imageUrl}
                  alt={`Imagem do projeto ${project.name}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex flex-col gap-3">
              <header className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-bold">{project.name}</h3>
                <span className="text-sm italic opacity-70">{project.date.pt}</span>
              </header>

              <p className="text-base leading-relaxed">{project.description.pt}</p>

              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="border border-black px-2 py-1 text-xs">
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2 text-sm underline">
                {project.link && (
                  <Link href={project.link} target="_blank">
                    Live
                  </Link>
                )}
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
    </Wrapper>
  );
}
