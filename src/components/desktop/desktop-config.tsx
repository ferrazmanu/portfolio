import {
  AboutIcon,
  ContactIcon,
  ExperienceIcon,
  FolderIcon,
  ImagesIcon,
  ProjectsIcon,
  ResumeIcon,
  SkillsIcon,
  TrashIcon,
} from "@/components/retro-icons";

import type { DesktopAppConfig } from "./types";
import { AboutWindow } from "./windows/about/about-window";
import { ContactWindow } from "./windows/contact/contact-window";
import { ExperienceWindow } from "./windows/experience/experience-window";
import { GamesWindow } from "./windows/games/games-window";
import { ImagesWindow } from "./windows/images/images-window";
import { ProjectListWindow } from "./windows/projects/project-list-window";
import { ResumeWindow } from "./windows/resume/resume-window";
import { SkillsWindow } from "./windows/skills/skills-window";
import { TrashWindow } from "./windows/trash/trash-window";

export const desktopApps: DesktopAppConfig[] = [
  {
    id: "about",
    title: { pt: "Sobre mim", en: "About me" },
    label: { pt: "Sobre mim", en: "About me" },
    icon: <AboutIcon />,
    content: (t) => <AboutWindow t={t} />,
    iconPosition: { x: 36, y: 38 },
    sizePreset: "sm",
    centerOnOpen: true,
  },
  {
    id: "projects",
    title: { pt: "Projetos", en: "Projects" },
    label: { pt: "Projetos", en: "Projects" },
    icon: <ProjectsIcon />,
    content: (t) => <ProjectListWindow t={t} />,
    iconPosition: { x: 286, y: 156 },
    position: { x: 310, y: 98 },
    sizePreset: "xl",
  },
  {
    id: "images",
    title: { pt: "Imagens", en: "Images" },
    label: { pt: "Imagens", en: "Images" },
    icon: <ImagesIcon />,
    content: (t) => <ImagesWindow t={t} />,
    iconPosition: { x: 760, y: 44 },
    position: { x: 330, y: 112 },
    sizePreset: "sm",
  },
  {
    id: "experience",
    title: { pt: "Experiência.log", en: "Experience.log" },
    label: { pt: "Experiência", en: "Experience" },
    icon: <ExperienceIcon />,
    content: (t) => <ExperienceWindow t={t} />,
    iconPosition: { x: 96, y: 310 },
    position: { x: 210, y: 146 },
    sizePreset: "sm",
  },
  {
    id: "skills",
    title: { pt: "Skills", en: "Skills" },
    label: { pt: "Skills", en: "Skills" },
    icon: <SkillsIcon />,
    content: (t) => <SkillsWindow t={t} />,
    iconPosition: { x: 536, y: 82 },
    position: { x: 520, y: 126 },
    sizePreset: "sm",
  },
  {
    id: "games",
    title: { pt: "Jogos", en: "Games" },
    label: { pt: "Jogos", en: "Games" },
    icon: <FolderIcon label="GAME" />,
    content: (t) => <GamesWindow t={t} />,
    iconPosition: { x: 668, y: 292 },
    position: { x: 250, y: 82 },
    sizePreset: "md",
  },
  {
    id: "contact",
    title: { pt: "Contato", en: "Contact" },
    label: { pt: "Contato", en: "Contact" },
    icon: <ContactIcon />,
    content: (t) => <ContactWindow t={t} />,
    iconPosition: { x: 940, y: 238 },
    position: { x: 380, y: 190 },
    sizePreset: "xs",
  },
  {
    id: "resume",
    title: { pt: "Currículo", en: "Resume" },
    label: { pt: "Currículo", en: "Resume" },
    icon: <FolderIcon label="CV" />,
    content: (t) => <ResumeWindow t={t} />,
    iconPosition: { x: 418, y: 398 },
    position: { x: 160, y: 210 },
    sizePreset: "sm",
  },
  {
    id: "trash",
    title: { pt: "Lixeira", en: "Trash" },
    label: { pt: "Lixeira", en: "Trash" },
    icon: <TrashIcon />,
    content: (t) => <TrashWindow t={t} />,
    iconPosition: { x: 900, y: 400 },
    position: { x: 420, y: 220 },
    sizePreset: "xs",
  },
];
