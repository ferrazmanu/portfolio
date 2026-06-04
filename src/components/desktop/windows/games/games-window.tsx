import { getWindowAssistantMessage } from "@/components/desktop/desktop-assistant-messages";
import { BugHunter } from "@/components/games/bug-hunter/bug-hunter";
import { FileIcon } from "@/components/retro-icons";
import { useAssistantStore } from "@/store/assistant-store";
import { useWindowStore } from "@/store/window-store";

import type { TranslateFn } from "../../types";

interface GamesWindowProps {
  t: TranslateFn;
}

type GameId = "bugHunter";

const games: Array<{
  id: GameId;
  title: string;
  description: {
    pt: string;
    en: string;
  };
}> = [
  {
    id: "bugHunter",
    title: "Bug Hunter.exe",
    description: {
      pt: "Capture bugs do sistema antes que eles desapareçam.",
      en: "Capture system bugs before they disappear.",
    },
  },
];

export function GamesWindow({ t }: GamesWindowProps) {
  const openWindow = useWindowStore((state) => state.openWindow);
  const setAssistantMessage = useAssistantStore(
    (state) => state.setAssistantMessage,
  );

  const handleOpenGame = (gameId: GameId) => {
    openWindow({
      id: gameId,
      title: { pt: "Bug Hunter.exe", en: "Bug Hunter.exe" },
      icon: <FileIcon label="BUG" />,
      content: () => <BugHunter />,
      sizePreset: "xl",
    });
    setAssistantMessage(getWindowAssistantMessage(gameId));
  };

  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-[repeat(auto-fit,minmax(100px,150px))] sm:justify-start sm:gap-3">
      {games.map((game) => (
        <button
          key={game.id}
          type="button"
          className="retro-border grid aspect-square min-w-[50px] grid-rows-[1fr_auto_auto] bg-white p-1 text-left focus:outline focus:outline-1 focus:outline-dotted focus:outline-black sm:p-2"
          onClick={() => handleOpenGame(game.id)}
        >
          <span className="retro-border-inset mb-1 flex min-h-0 items-center justify-center bg-[#dcdcdc] sm:mb-2">
            <span className="[&>*]:scale-75">
              <FileIcon label="BUG" />
            </span>
          </span>
          <span className="block truncate text-[10px] font-bold sm:text-xs">
            {game.title}
          </span>
          <span className="block truncate text-[9px] text-[#444] sm:text-[10px]">
            {t(game.description)}
          </span>
        </button>
      ))}
    </div>
  );
}
