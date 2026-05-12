import type { TranslateFn, WindowId } from "./types";
import { AboutWindow } from "./windows/about/about-window";
import { ContactWindow } from "./windows/contact/contact-window";
import { ExperienceWindow } from "./windows/experience/experience-window";
import { ImagesWindow } from "./windows/images/images-window";
import { ProjectListWindow } from "./windows/projects/project-list-window";
import { ResumeWindow } from "./windows/resume/resume-window";
import { SkillsWindow } from "./windows/skills/skills-window";
import { TrashWindow } from "./windows/trash/trash-window";

interface DesktopWindowContentProps {
  windowId: WindowId;
  t: TranslateFn;
}

export function DesktopWindowContent({
  windowId,
  t,
}: DesktopWindowContentProps) {
  if (windowId === "about") {
    return <AboutWindow t={t} />;
  }

  if (windowId === "projects") {
    return <ProjectListWindow t={t} />;
  }

  if (windowId === "images") {
    return <ImagesWindow t={t} />;
  }

  if (windowId === "experience") {
    return <ExperienceWindow t={t} />;
  }

  if (windowId === "skills") {
    return <SkillsWindow t={t} />;
  }

  if (windowId === "contact") {
    return <ContactWindow t={t} />;
  }

  if (windowId === "resume") {
    return <ResumeWindow t={t} />;
  }

  if (windowId === "trash") {
    return <TrashWindow t={t} />;
  }

  return <></>;
}
