import Image from "next/image";
import Link from "next/link";

import { PROJECTS_DATA } from "@/data/projects";
import { useDesktopStore } from "@/store/desktop-store";

import type { TranslateFn } from "../../types";

interface ProjectListWindowProps {
  t: TranslateFn;
}

export function ProjectListWindow({ t }: ProjectListWindowProps) {
  const openProjectPreview = useDesktopStore(
    (state) => state.openProjectPreview,
  );

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[24px_1fr_120px] border-b border-black pb-1 text-xs font-bold uppercase">
        <span />
        <span>{t({ pt: "Nome", en: "Name" })}</span>
        <span className="hidden sm:block">
          {t({ pt: "Ações", en: "Actions" })}
        </span>
      </div>

      {PROJECTS_DATA.slice(0, 8).map((project) => (
        <article
          key={project.name}
          className="retro-border-inset grid gap-3 bg-white p-2 sm:grid-cols-[120px_1fr]"
        >
          <button
            type="button"
            className="retro-border-inset relative h-24 bg-[#dcdcdc] focus:outline focus:outline-1 focus:outline-dotted focus:outline-black"
            aria-label={`${t({
              pt: "Abrir imagem do projeto",
              en: "Open project image",
            })} ${project.name}`}
            onClick={() => openProjectPreview(project.name)}
          >
            <Image
              src={project.imageUrl}
              alt={`${t({
                pt: "Prévia do projeto",
                en: "Project preview",
              })} ${project.name}`}
              fill
              className="object-cover"
              sizes="120px"
            />
          </button>

          <div className="min-w-0 space-y-2">
            <header className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-bold">{project.name}</h3>
              <span className="text-[11px] text-[#444]">
                {t({ pt: project.date.pt, en: project.date.en })}
              </span>
            </header>

            <p className="text-xs">
              {t({
                pt: project.description.pt,
                en: project.description.en,
              })}
            </p>

            <ul className="flex flex-wrap gap-1">
              {project.stack.slice(0, 6).map((tech) => (
                <li
                  key={tech}
                  className="retro-border bg-[#eeeeee] px-1 text-[11px]"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 text-xs font-bold underline">
              {project.link && (
                <Link href={project.link} target="_blank">
                  Demo
                </Link>
              )}
              {project.github && (
                <Link href={project.github} target="_blank">
                  {t({ pt: "Repositório", en: "Repository" })}
                </Link>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
