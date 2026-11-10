import { getWindowAssistantMessage } from "@/components/desktop/desktop-assistant-messages";
import { ResumeIcon } from "@/components/retro-icons";
import { useAssistantStore } from "@/store/assistant-store";
import { useWindowStore } from "@/store/window-store";

import type { TranslateFn } from "../../types";
import { resumeItems, type ResumeItem } from "./resume-config";
import { ResumePreviewContent } from "./resume-preview-content";

interface ResumeWindowProps {
  t: TranslateFn;
}

export function ResumeWindow({ t }: ResumeWindowProps) {
  const openWindow = useWindowStore((state) => state.openWindow);
  const setAssistantMessage = useAssistantStore(
    (state) => state.setAssistantMessage,
  );

  const handleOpenResumePreview = (item: ResumeItem) => {
    openWindow({
      id: "resumePreview",
      title: { pt: item.title, en: item.title },
      icon: <ResumeIcon />,
      content: (translate) => (
        <ResumePreviewContent initialItem={item} t={translate} />
      ),
      sizePreset: "xl",
    });
    setAssistantMessage(getWindowAssistantMessage("resumePreview"));
  };

  return (
    <div className="space-y-3">
      <div className="retro-border-inset bg-white p-2 text-xs">
        {t({
          pt: "2 arquivo(s) de currículo. Clique em um documento para visualizá-lo:",
          en: "2 resume file(s). Click a document to preview it:",
        })}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fit,minmax(120px,160px))] sm:justify-start sm:gap-3">
        {resumeItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="retro-border grid aspect-square min-w-[50px] grid-rows-[1fr_auto_auto] bg-white p-1 text-left focus:outline focus:outline-1 focus:outline-dotted focus:outline-black sm:p-2 cursor-pointer"
            onClick={() => handleOpenResumePreview(item)}
          >
            <span className="retro-border-inset mb-1 flex min-h-0 items-center justify-center bg-[#dcdcdc] sm:mb-2">
              <span className="[&>*]:scale-90">
                <ResumeIcon />
              </span>
            </span>
            <span className="block truncate text-[10px] font-bold sm:text-xs">
              {item.title}
            </span>
            <span className="block truncate text-[9px] text-[#444] sm:text-[10px]">
              {t(item.languageLabel)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
