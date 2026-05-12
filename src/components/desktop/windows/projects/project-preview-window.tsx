import Image from "next/image";

import { ProjectsIcon } from "@/components/retro-icons";
import { RetroWindow } from "@/components/retro-window";
import { PROJECTS_DATA } from "@/data/projects";

import type { TranslateFn } from "../../types";

type Project = (typeof PROJECTS_DATA)[number];

interface ProjectPreviewWindowProps {
  project?: Project;
  t: TranslateFn;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
}

export function ProjectPreviewWindow({
  project,
  t,
  zIndex,
  onClose,
  onFocus,
}: ProjectPreviewWindowProps) {
  return (
    <RetroWindow
      key={project?.name ?? "project-preview"}
      id="project-preview"
      title={
        project
          ? `${project.name}.png`
          : t({ pt: "Prévia do projeto", en: "Project preview" })
      }
      icon={<ProjectsIcon />}
      isOpen={Boolean(project)}
      onMinimize={onClose}
      onClose={onClose}
      onFocus={onFocus}
      sizePreset="lg"
      zIndex={zIndex}
    >
      {project && (
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
      )}
    </RetroWindow>
  );
}
