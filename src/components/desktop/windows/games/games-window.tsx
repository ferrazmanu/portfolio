import { getWindowAssistantMessage } from "@/components/desktop/desktop-assistant-messages";
import { BugHunter } from "@/components/games/bug-hunter/bug-hunter";
import { StackSnake } from "@/components/games/stack-snake/stack-snake";
import { FileIcon } from "@/components/retro-icons";
import { useAssistantStore } from "@/store/assistant-store";
import { useWindowStore } from "@/store/window-store";

import type { TranslateFn } from "../../types";

interface GamesWindowProps {
  t: TranslateFn;
}

type GameId = "bugHunter" | "stackSnake";

const games: Array<{
  id: GameId;
  title: string;
  iconLabel: string;
  description: {
    pt: string;
    en: string;
  };
}> = [
  {
    id: "bugHunter",
    title: "Bug Hunter.exe",
    iconLabel: "BUG",
    description: {
      pt: "Capture bugs do sistema antes que eles desapareçam.",
      en: "Capture system bugs before they disappear.",
    },
  },
  {
    id: "stackSnake",
    title: "Stack Snake.exe",
    iconLabel: "SNK",
    description: {
      pt: "Colete tecnologias e evolua sua stack.",
      en: "Collect technologies and evolve your stack.",
    },
  },
];

const gameContentById: Record<GameId, () => JSX.Element> = {
  bugHunter: BugHunter,
  stackSnake: StackSnake,
};

export function GamesWindow({ t }: GamesWindowProps) {
  const openWindow = useWindowStore((state) => state.openWindow);
  const setAssistantMessage = useAssistantStore(
    (state) => state.setAssistantMessage,
  );

  const handleOpenGame = (gameId: GameId) => {
    const selectedGame = games.find((game) => game.id === gameId) ?? games[0];
    const GameContent = gameContentById[gameId];

    openWindow({
      id: gameId,
      title: { pt: selectedGame.title, en: selectedGame.title },
      icon: <FileIcon label={selectedGame.iconLabel} />,
      content: () => <GameContent />,
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
              <FileIcon label={game.iconLabel} />
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
