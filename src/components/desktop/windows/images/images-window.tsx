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
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-[repeat(auto-fit,minmax(100px,150px))] sm:justify-start sm:gap-3">
          {imagesWindowItems.map((item) => {
            const isImage = isImagesWindowImageItem(item);

            return (
              <button
                key={item.id}
                type="button"
                className="retro-border grid aspect-square min-w-[50px] grid-rows-[1fr_auto_auto] bg-white p-1 text-left focus:outline focus:outline-1 focus:outline-dotted focus:outline-black disabled:cursor-default sm:p-2"
                disabled={!isImage}
                onClick={() => {
                  if (isImage) {
                    openImagePreview(item.id);
                  }
                }}
              >
                <span className="retro-border-inset relative mb-1 flex min-h-0 items-center justify-center bg-[#dcdcdc] text-[10px] font-bold uppercase sm:mb-2">
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
                <span className="block truncate text-[10px] font-bold sm:text-xs">
                  {item.title}
                </span>
                <span className="block truncate text-[9px] text-[#444] sm:text-[10px]">
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
