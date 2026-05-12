import Image, { type StaticImageData } from "next/image";

import type { LocalizedText } from "@/components/desktop/types";
import {
  imagesWindowPreviewItems,
} from "@/components/desktop/windows/images/images-config";
import { trashPreviewItems } from "@/components/desktop/windows/trash/trash-config";
import { ImagesIcon } from "@/components/retro-icons";
import { RetroWindow } from "@/components/retro-window";
import { useTranslation } from "@/hooks/use-translation";
import { useDesktopStore } from "@/store/desktop-store";

export interface PreviewImageItem {
  alt?: LocalizedText | string;
  id: string;
  src: StaticImageData | string;
  title: string;
}

export function ImagePreviewWindow() {
  const { handleTranslation } = useTranslation();
  const selectedImageId = useDesktopStore((state) => state.selectedImageId);
  const imagePreviewZIndex = useDesktopStore(
    (state) => state.imagePreviewZIndex,
  );
  const closeImagePreview = useDesktopStore(
    (state) => state.closeImagePreview,
  );
  const bringImagePreviewToFront = useDesktopStore(
    (state) => state.bringImagePreviewToFront,
  );
  const image = selectedImageId
    ? [...imagesWindowPreviewItems, ...trashPreviewItems].find(
        (imageItem) => imageItem.id === selectedImageId,
      )
    : undefined;
  const t = ({ pt, en }: { pt: string; en: string }) =>
    handleTranslation({ text: pt, translation: en });
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
      onMinimize={closeImagePreview}
      onClose={closeImagePreview}
      onFocus={bringImagePreviewToFront}
      sizePreset="lg"
      zIndex={imagePreviewZIndex}
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
