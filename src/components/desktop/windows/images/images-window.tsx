import Image from "next/image";

import { AudioIcon, FileIcon, VideoIcon } from "@/components/retro-icons";
import { useDesktopStore } from "@/store/desktop-store";
import type { TranslateFn } from "../../types";
import {
  type ImagesWindowFileItem,
  imagesWindowItems,
  isImagesWindowImageItem,
} from "./images-config";

interface ImagesWindowProps {
  t: TranslateFn;
}

const categoryLabels = {
  projects: { pt: "Projetos", en: "Projects" },
  wallpapers: { pt: "Wallpapers", en: "Wallpapers" },
  "easter-eggs": { pt: "Easter eggs", en: "Easter eggs" },
};

const getFileTypeIcon = (item: ImagesWindowFileItem) => {
  if (item.type === "audio") return <AudioIcon />;
  if (item.type === "video") return <VideoIcon />;

  return <FileIcon />;
};

export function ImagesWindow({ t }: ImagesWindowProps) {
  const openImagePreview = useDesktopStore((state) => state.openImagePreview);

  return (
    <div className="space-y-3">
      {imagesWindowItems.length === 0 ? (
        <div className="retro-border-inset bg-white p-3 text-xs">
          {t({
            pt: "Nenhuma imagem.",
            en: "No images.",
          })}
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,200px))] justify-start gap-3">
          {imagesWindowItems.map((item) => {
            const isImage = isImagesWindowImageItem(item);

            return (
              <button
                key={item.id}
                type="button"
                className="retro-border grid aspect-square min-w-0 grid-rows-[1fr_auto_auto] bg-white p-2 text-left focus:outline focus:outline-1 focus:outline-dotted focus:outline-black disabled:cursor-default"
                disabled={!isImage}
                onClick={() => {
                  if (isImage) {
                    openImagePreview(item.id);
                  }
                }}
              >
                <span className="retro-border-inset relative mb-2 flex min-h-0 items-center justify-center bg-[#dcdcdc] text-[10px] font-bold uppercase">
                  {isImage ? (
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="180px"
                    />
                  ) : (
                    <span className="[&>*]:scale-75">
                      {getFileTypeIcon(item)}
                    </span>
                  )}
                </span>
                <span className="block truncate text-xs font-bold">
                  {item.title}
                </span>
                <span className="block text-[10px] text-[#444]">
                  {t(categoryLabels[item.category])}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
