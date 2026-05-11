import Image from "next/image";

import { desktopImages } from "./imagesConfig";
import type { TranslateFn } from "./types";

interface ImagesWindowProps {
  t: TranslateFn;
  onImageOpen: (imageId: string) => void;
}

const categoryLabels = {
  projects: { pt: "Projetos", en: "Projects" },
  wallpapers: { pt: "Wallpapers", en: "Wallpapers" },
  "easter-eggs": { pt: "Easter eggs", en: "Easter eggs" },
};

export function ImagesWindow({ t, onImageOpen }: ImagesWindowProps) {
  return (
    <div className="space-y-3">
      {desktopImages.length === 0 ? (
        <div className="retro-border-inset bg-white p-3 text-xs">
          {t({
            pt: "Nenhuma imagem.",
            en: "No images.",
          })}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-3">
          {desktopImages.map((image) => (
            <button
              key={image.id}
              type="button"
              className="retro-border bg-white p-2 text-left focus:outline focus:outline-1 focus:outline-dotted focus:outline-black"
              onClick={() => onImageOpen(image.id)}
            >
              <span className="retro-border-inset relative mb-2 block h-24 bg-[#dcdcdc]">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </span>
              <span className="block truncate text-xs font-bold">
                {image.title}
              </span>
              <span className="block text-[10px] text-[#444]">
                {t(categoryLabels[image.category])}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
