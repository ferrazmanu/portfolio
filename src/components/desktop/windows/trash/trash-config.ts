import LogoPortfolioImage from "assets/images/logo-portfolio.png";
import E from "assets/images/e.jpeg";

import type { PreviewImageItem } from "@/components/image-preview-window";
import type { LocalizedText } from "../../types";

interface BaseTrashItem {
  id: string;
  title: string;
  type: "audio" | "file" | "image" | "video";
}

export interface TrashImageItem extends BaseTrashItem, PreviewImageItem {
  alt: LocalizedText;
  type: "image";
}

export interface TrashFileItem extends BaseTrashItem {
  alt?: LocalizedText;
  type: "audio" | "file" | "video";
}

export type TrashItem = TrashImageItem | TrashFileItem;

export const trashItems: TrashItem[] = [
  {
    id: "portfolio-logo",
    title: "logo-portfolio.png",
    src: LogoPortfolioImage,
    type: "image",
    alt: {
      pt: "Logo antiga do portfólio",
      en: "Old portfolio logo",
    },
  },
  {
    id: "e",
    title: "e.jpeg",
    src: E,
    type: "image",
    alt: {
      pt: "E",
      en: "E",
    },
  },
];

export const isTrashImageItem = (item: TrashItem): item is TrashImageItem =>
  item.type === "image";

export const trashPreviewItems = trashItems.filter(isTrashImageItem);
