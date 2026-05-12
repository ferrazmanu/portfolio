import {
  AboutIcon,
  ContactIcon,
  ExperienceIcon,
  ImagesIcon,
  ProjectsIcon,
  ResumeIcon,
  SkillsIcon,
  TrashIcon,
} from "@/components/retro-icons";
import type { DesktopIconPosition } from "@/components/desktop-icon";

import type { DesktopWindowConfig, WindowId } from "./types";

export const desktopWindows: DesktopWindowConfig[] = [
  {
    id: "about",
    title: { pt: "Sobre mim", en: "About me" },
    label: { pt: "Sobre mim", en: "About me" },
    icon: <AboutIcon />,
    iconPosition: { x: 36, y: 38 },
    position: { x: 118, y: 72 },
    sizePreset: "sm",
  },
  {
    id: "projects",
    title: { pt: "Projetos", en: "Projects" },
    label: { pt: "Projetos", en: "Projects" },
    icon: <ProjectsIcon />,
    iconPosition: { x: 286, y: 156 },
    position: { x: 310, y: 98 },
    sizePreset: "xl",
  },
  {
    id: "images",
    title: { pt: "Imagens", en: "Images" },
    label: { pt: "Imagens", en: "Images" },
    icon: <ImagesIcon />,
    iconPosition: { x: 760, y: 44 },
    position: { x: 330, y: 112 },
    sizePreset: "sm",
  },
  {
    id: "experience",
    title: { pt: "Experiência.log", en: "Experience.log" },
    label: { pt: "Experiência", en: "Experience" },
    icon: <ExperienceIcon />,
    iconPosition: { x: 96, y: 310 },
    position: { x: 210, y: 146 },
    sizePreset: "sm",
  },
  {
    id: "skills",
    title: { pt: "Skills", en: "Skills" },
    label: { pt: "Skills", en: "Skills" },
    icon: <SkillsIcon />,
    iconPosition: { x: 536, y: 82 },
    position: { x: 520, y: 126 },
    sizePreset: "sm",
  },
  {
    id: "contact",
    title: { pt: "Contato", en: "Contact" },
    label: { pt: "Contato", en: "Contact" },
    icon: <ContactIcon />,
    iconPosition: { x: 940, y: 238 },
    position: { x: 380, y: 190 },
    sizePreset: "xs",
  },
  {
    id: "resume",
    title: { pt: "Currículo", en: "Resume" },
    label: { pt: "Currículo", en: "Resume" },
    icon: <ResumeIcon />,
    iconPosition: { x: 418, y: 398 },
    position: { x: 160, y: 210 },
    sizePreset: "xs",
  },
  {
    id: "trash",
    title: { pt: "Lixeira", en: "Trash" },
    label: { pt: "Lixeira", en: "Trash" },
    icon: <TrashIcon />,
    iconPosition: { x: 900, y: 400 },
    position: { x: 420, y: 220 },
    sizePreset: "xs",
  },
];

export const initialWindowState: Record<WindowId, boolean> = {
  about: true,
  images: false,
  projects: false,
  experience: false,
  skills: false,
  contact: false,
  resume: false,
  trash: false,
};

export const initialMinimizedWindowState: Record<WindowId, boolean> = {
  about: false,
  images: false,
  projects: false,
  experience: false,
  skills: false,
  contact: false,
  resume: false,
  trash: false,
};

export const initialWindowOrder: Record<WindowId, number> = {
  about: 10,
  images: 15,
  projects: 20,
  experience: 30,
  skills: 40,
  contact: 50,
  resume: 60,
  trash: 70,
};

export const initialIconPositions = desktopWindows.reduce<
  Record<WindowId, DesktopIconPosition>
>(
  (positions, windowItem) => ({
    ...positions,
    [windowItem.id]: windowItem.iconPosition,
  }),
  {
    about: { x: 36, y: 38 },
    images: { x: 760, y: 44 },
    projects: { x: 286, y: 156 },
    experience: { x: 96, y: 310 },
    skills: { x: 536, y: 82 },
    contact: { x: 940, y: 238 },
    resume: { x: 418, y: 398 },
    trash: { x: 900, y: 400 },
  },
);
