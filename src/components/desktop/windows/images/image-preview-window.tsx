import Image from "next/image";

import { ImagesIcon } from "@/components/desktop/retro-icons";
import { RetroWindow } from "@/components/retro-window";

import type { DesktopImageItem } from "../../images-config";
import type { TranslateFn } from "../../types";

interface ImagePreviewWindowProps {
  image?: DesktopImageItem;
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
      defaultSize={{ width: 640, height: 430 }}
      zIndex={zIndex}
    >
      {image && (
        <div className="flex h-full min-h-[240px] flex-col gap-2">
          <div className="retro-border-inset relative min-h-0 flex-1 bg-[#dcdcdc]">
            <Image
              src={image.src}
              alt={image.title}
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
