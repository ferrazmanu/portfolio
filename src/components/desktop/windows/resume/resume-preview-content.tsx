import { useState } from "react";

import type { TranslateFn } from "@/components/desktop/types";

import { resumeItems, type ResumeItem } from "./resume-config";

interface ResumePreviewContentProps {
  initialItem: ResumeItem;
  t: TranslateFn;
}

export function ResumePreviewContent({
  initialItem,
  t,
}: ResumePreviewContentProps) {
  const [selectedItem, setSelectedItem] = useState<ResumeItem>(initialItem);

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/20 pb-2">
        <div className="flex items-center gap-1">
          <span className="mr-1 text-xs font-bold">
            {t({ pt: "Idioma:", en: "Language:" })}
          </span>
          {resumeItems.map((item) => {
            const isSelected = item.id === selectedItem.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`retro-button cursor-pointer text-xs ${
                  isSelected ? "retro-border-inset font-bold" : ""
                }`}
                onClick={() => setSelectedItem(item)}
              >
                {t(item.languageLabel)}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={selectedItem.url}
            download={selectedItem.filename}
            className="retro-button cursor-pointer text-xs"
          >
            {t({ pt: "Baixar PDF", en: "Download PDF" })}
          </a>
          <a
            href={selectedItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="retro-button cursor-pointer text-xs"
          >
            {t({ pt: "Nova aba", en: "New tab" })}
          </a>
        </div>
      </div>

      <div className="retro-border-inset relative min-h-0 flex-1 bg-white">
        <iframe
          key={selectedItem.url}
          src={selectedItem.url}
          title={selectedItem.title}
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}
