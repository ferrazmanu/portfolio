import Image from "next/image";

import type { PROJECTS_DATA } from "@/data/projects";

import type { TranslateFn } from "../../types";

type ProjectPreviewItem = (typeof PROJECTS_DATA)[number];

interface ProjectPreviewContentProps {
  project: ProjectPreviewItem;
  t: TranslateFn;
}

export function ProjectPreviewContent({
  project,
  t,
}: ProjectPreviewContentProps) {
  return (
    <div className="flex h-full min-h-[260px] flex-col gap-2">
      <div className="retro-border-inset relative min-h-0 flex-1 bg-[#dcdcdc]">
        <Image
          src={project.imageUrl}
          alt={`${t({
            pt: "Imagem do projeto",
            en: "Project image",
          })} ${project.name}`}
          fill
          className="object-contain"
          sizes="720px"
        />
      </div>

      <p className="text-xs font-bold">{project.name}</p>
    </div>
  );
}
