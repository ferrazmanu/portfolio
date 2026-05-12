import Image from "next/image";

import { AudioIcon, FileIcon, VideoIcon } from "@/components/retro-icons";
import { useDesktopStore } from "@/store/desktop-store";
import type { TranslateFn } from "../../types";
import {
  isTrashImageItem,
  trashItems,
  type TrashFileItem,
} from "./trash-config";

interface TrashWindowProps {
  t: TranslateFn;
}

const getTrashFileIcon = (item: TrashFileItem) => {
  if (item.type === "audio") return <AudioIcon />;
  if (item.type === "video") return <VideoIcon />;

  return <FileIcon />;
};

export function TrashWindow({ t }: TrashWindowProps) {
  const openImagePreview = useDesktopStore((state) => state.openImagePreview);

  return (
    <div className="space-y-3">
      {trashItems.length === 0 ? (
        <div className="retro-border-inset bg-white p-3 text-xs">
          {t({
            pt: "Nenhum item na lixeira. Apenas as antigas ideias esperando reboot.",
            en: "No items in trash. Just old ideas waiting for a reboot.",
          })}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-[repeat(auto-fit,minmax(100px,150px))] sm:justify-start">
          {trashItems.map((item) => {
            const isImage = isTrashImageItem(item);

            return (
              <button
                key={item.id}
                type="button"
                className="retro-border grid aspect-square min-w-[50px] grid-rows-[1fr_auto_auto] bg-white p-1 text-left focus:outline focus:outline-1 focus:outline-dotted focus:outline-black disabled:cursor-default sm:p-1.5"
                disabled={!isImage}
                onClick={() => {
                  if (isImage) {
                    openImagePreview(item.id);
                  }
                }}
              >
                <span className="retro-border-inset relative mb-1 flex min-h-0 items-center justify-center bg-[#dcdcdc] text-[10px] font-bold uppercase sm:mb-1.5">
                  {isImage ? (
                    <Image
                      src={item.src}
                      alt={t(item.alt)}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <span className="[&>*]:scale-75">
                      {getTrashFileIcon(item)}
                    </span>
                  )}
                </span>
                <span className="block truncate text-[10px] font-bold sm:text-[11px]">
                  {item.title}
                </span>
                <span className="block truncate text-[9px] text-[#444] sm:text-[10px]">
                  {item.type}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
