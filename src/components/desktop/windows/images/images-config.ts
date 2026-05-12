import type { StaticImageData } from "next/image";

import DivulgImage from "assets/images/divulg.png";
import FranciscoOneImage from "assets/images/francisco1.jpeg";
import FranciscoTwoImage from "assets/images/francisco2.jpeg";
import FranciscoThreeImage from "assets/images/francisco3.jpeg";
import LunaImage from "assets/images/luna.jpeg";
import NewFaviconImage from "assets/images/new-favicon.png";
import OliverImage from "assets/images/oliver.jpeg";
import ProfileImage from "assets/images/eu.jpg";
import UrsulaImage from "assets/images/ursula.jpeg";

import type { PreviewImageItem } from "@/components/image-preview-window";

type ImagesWindowItemCategory = "projects" | "wallpapers" | "easter-eggs";

interface BaseImagesWindowItem {
  category: ImagesWindowItemCategory;
  id: string;
  title: string;
}

export interface ImagesWindowImageItem
  extends BaseImagesWindowItem, PreviewImageItem {
  src: StaticImageData | string;
  type: "image";
}

export interface ImagesWindowFileItem extends BaseImagesWindowItem {
  type: "audio" | "file" | "video";
}

export type ImagesWindowItem = ImagesWindowImageItem | ImagesWindowFileItem;

export const imagesWindowItems: ImagesWindowItem[] = [
  {
    id: "profile-photo",
    title: "manuela-ferraz.jpg",
    src: ProfileImage,
    type: "image",
    category: "easter-eggs",
  },
  {
    id: "francisco-1",
    title: "francisco1.jpeg",
    src: FranciscoOneImage,
    type: "image",
    category: "easter-eggs",
  },
  {
    id: "francisco-2",
    title: "francisco2.jpeg",
    src: FranciscoTwoImage,
    type: "image",
    category: "easter-eggs",
  },
  {
    id: "francisco-3",
    title: "francisco3.jpeg",
    src: FranciscoThreeImage,
    type: "image",
    category: "easter-eggs",
  },
  {
    id: "oliver",
    title: "oliver.jpeg",
    src: OliverImage,
    type: "image",
    category: "easter-eggs",
  },
  {
    id: "luna",
    title: "luna.jpeg",
    src: LunaImage,
    type: "image",
    category: "easter-eggs",
  },
  {
    id: "new-favicon",
    title: "new-favicon.png",
    src: NewFaviconImage,
    type: "image",
    category: "easter-eggs",
  },
  {
    id: "ursula",
    title: "ursula.jpeg",
    src: UrsulaImage,
    type: "image",
    category: "easter-eggs",
  },
  {
    id: "divulg",
    title: "divulg.png",
    src: DivulgImage,
    type: "image",
    category: "easter-eggs",
  },
];

export const isImagesWindowImageItem = (
  item: ImagesWindowItem,
): item is ImagesWindowImageItem => item.type === "image";

export const imagesWindowPreviewItems = imagesWindowItems.filter(
  isImagesWindowImageItem,
);
