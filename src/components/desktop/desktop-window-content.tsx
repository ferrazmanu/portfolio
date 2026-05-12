import type { TranslateFn, WindowId } from "./types";
import { AboutContent } from "./windows/about/about-content";
import { ContactContent } from "./windows/contact/contact-content";
import { ExperienceContent } from "./windows/experience/experience-content";
import { ImagesWindow } from "./windows/images/images-window";
import { ProjectListWindow } from "./windows/projects/project-list-window";
import { ResumeContent } from "./windows/resume/resume-content";
import { SkillsContent } from "./windows/skills/skills-content";
import { TrashContent } from "./windows/trash/trash-content";

interface DesktopWindowContentProps {
  windowId: WindowId;
  t: TranslateFn;
  onProjectPreviewOpen: (projectName: string) => void;
  onImagePreviewOpen: (imageId: string) => void;
}

export function DesktopWindowContent({
  windowId,
  t,
  onProjectPreviewOpen,
  onImagePreviewOpen,
}: DesktopWindowContentProps) {
  if (windowId === "about") {
    return <AboutContent t={t} />;
  }

  if (windowId === "projects") {
    return (
      <ProjectListWindow
        t={t}
        onProjectPreviewOpen={onProjectPreviewOpen}
      />
    );
  }

  if (windowId === "images") {
    return <ImagesWindow t={t} onImageOpen={onImagePreviewOpen} />;
  }

  if (windowId === "experience") {
    return <ExperienceContent t={t} />;
  }

  if (windowId === "skills") {
    return <SkillsContent t={t} />;
  }

  if (windowId === "contact") {
    return <ContactContent t={t} />;
  }

  if (windowId === "resume") {
    return <ResumeContent t={t} />;
  }

  return <TrashContent t={t} />;
}
