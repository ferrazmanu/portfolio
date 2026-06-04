import Image, { type StaticImageData } from "next/image";

import type { LocalizedText, TranslateFn } from "@/components/desktop/types";

export interface PreviewImageItem {
  alt?: LocalizedText | string;
  id: string;
  src: StaticImageData | string;
  title: string;
}

interface ImagePreviewContentProps {
  image: PreviewImageItem;
  t: TranslateFn;
}

export function ImagePreviewContent({ image, t }: ImagePreviewContentProps) {
  const imageAlt =
    typeof image.alt === "string"
      ? image.alt
      : image.alt
        ? t(image.alt)
        : image.title;

  return (
    <div className="flex h-full min-h-[240px] flex-col gap-2">
      <div className="retro-border-inset relative min-h-0 flex-1 bg-[#dcdcdc]">
        <Image
          src={image.src}
          alt={imageAlt}
          fill
          className="object-contain"
          sizes="640px"
        />
      </div>
      <p className="text-xs font-bold">{image.title}</p>
    </div>
  );
}
