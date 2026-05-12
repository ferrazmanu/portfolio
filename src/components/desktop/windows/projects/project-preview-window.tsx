import Image from "next/image";

import { ProjectsIcon } from "@/components/retro-icons";
import { RetroWindow } from "@/components/retro-window";
import { PROJECTS_DATA } from "@/data/projects";
import { useTranslation } from "@/hooks/use-translation";
import { useDesktopStore } from "@/store/desktop-store";

export function ProjectPreviewWindow() {
  const { handleTranslation } = useTranslation();
  const selectedProjectName = useDesktopStore(
    (state) => state.selectedProjectName,
  );
  const projectPreviewZIndex = useDesktopStore(
    (state) => state.projectPreviewZIndex,
  );
  const closeProjectPreview = useDesktopStore(
    (state) => state.closeProjectPreview,
  );
  const bringProjectPreviewToFront = useDesktopStore(
    (state) => state.bringProjectPreviewToFront,
  );
  const project = selectedProjectName
    ? PROJECTS_DATA.find((projectItem) => projectItem.name === selectedProjectName)
    : undefined;
  const t = ({ pt, en }: { pt: string; en: string }) =>
    handleTranslation({ text: pt, translation: en });

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
      onMinimize={closeProjectPreview}
      onClose={closeProjectPreview}
      onFocus={bringProjectPreviewToFront}
      sizePreset="lg"
      zIndex={projectPreviewZIndex}
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
