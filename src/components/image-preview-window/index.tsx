import Image, { type StaticImageData } from "next/image";

import type { LocalizedText, TranslateFn } from "@/components/desktop/types";
import { ImagesIcon } from "@/components/retro-icons";
import { RetroWindow } from "@/components/retro-window";

export interface PreviewImageItem {
  alt?: LocalizedText | string;
  id: string;
  src: StaticImageData | string;
  title: string;
}

interface ImagePreviewWindowProps {
  image?: PreviewImageItem;
  t: TranslateFn;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
}

export function ImagePreviewWindow({
  image,
  t,
  zIndex,
  onClose,
  onFocus,
}: ImagePreviewWindowProps) {
  const imageAlt =
    typeof image?.alt === "string"
      ? image.alt
      : image?.alt
        ? t(image.alt)
        : image?.title;

  return (
    <RetroWindow
      key={image?.id ?? "image-preview"}
      id="image-preview"
      title={
        image
          ? image.title
          : t({ pt: "Prévia de imagem", en: "Image preview" })
      }
      icon={<ImagesIcon />}
      isOpen={Boolean(image)}
      onMinimize={onClose}
      onClose={onClose}
      onFocus={onFocus}
      sizePreset="lg"
      zIndex={zIndex}
    >
      {image && (
        <div className="flex h-full min-h-[240px] flex-col gap-2">
          <div className="retro-border-inset relative min-h-0 flex-1 bg-[#dcdcdc]">
            <Image
              src={image.src}
              alt={imageAlt ?? image.title}
              fill
              className="object-contain"
              sizes="640px"
            />
          </div>
          <p className="text-xs font-bold">{image.title}</p>
        </div>
      )}
    </RetroWindow>
  );
}
