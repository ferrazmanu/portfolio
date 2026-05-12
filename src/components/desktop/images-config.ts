import type { StaticImageData } from "next/image";

import LogoPortfolioImage from "assets/images/logo-portfolio.png";
import ProfileImage from "assets/images/eu.jpg";

import { PROJECTS_DATA } from "@/data/projects";

export interface DesktopImageItem {
  id: string;
  title: string;
  src: StaticImageData | string;
  category: "projects" | "wallpapers" | "easter-eggs";
}

const assetDesktopImages: DesktopImageItem[] = [
  {
    id: "profile-photo",
    title: "manuela-ferraz.jpg",
    src: ProfileImage,
    category: "easter-eggs",
  },
  {
    id: "portfolio-logo",
    title: "logo-portfolio.png",
    src: LogoPortfolioImage,
    category: "wallpapers",
  },
];

export const desktopImages: DesktopImageItem[] = [
  ...PROJECTS_DATA.slice(0, 8).map((project) => ({
    id: `project-${project.name}`,
    title: `${project.name}.png`,
    src: project.imageUrl,
    category: "projects" as const,
  })),
  ...assetDesktopImages,
];
