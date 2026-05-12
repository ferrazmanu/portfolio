import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { TranslationButton } from "@/components/translation-button";

export interface TaskbarWindow {
  id: string;
  title: string;
  isOpen: boolean;
  icon?: ReactNode;
}

export interface TaskbarProps {
  windows: TaskbarWindow[];
  menuWindows: TaskbarWindow[];
  activeWindowId: string | null;
  onWindowSelect: (id: string) => void;
  onMenuEasterEgg?: () => void;
}

export function Taskbar({
  windows,
  menuWindows,
  activeWindowId,
  onWindowSelect,
  onMenuEasterEgg,
}: TaskbarProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(event.target as Node)) return;

      setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMenuOpen]);

  useEffect(() => {
    setCurrentDate(new Date());

    const interval = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const time = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(currentDate ?? new Date(0));

  const date = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(currentDate ?? new Date(0));

  const displayTime = currentDate ? time : "--:--:--";
  const displayDate = currentDate ? date : "--/--/----";

  const handleMenuWindowSelect = (id: string) => {
    onWindowSelect(id);
    setIsMenuOpen(false);
  };

  return (
    <footer className="retro-border fixed inset-x-0 bottom-0 z-[999] flex h-10 items-center gap-2 bg-retro-gray px-2 font-retro text-xs">
      <div ref={menuRef} className="relative">
        {isMenuOpen && (
          <div className="retro-border absolute bottom-9 left-0 flex w-64 bg-retro-gray text-black shadow-retro">
            <div className="flex w-8 items-end justify-center bg-[#0b6f35] py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white [writing-mode:vertical-rl]">
              Menu Inicial
            </div>

            <div className="min-w-0 flex-1 py-1">
              {menuWindows.map((windowItem) => (
                <button
                  key={windowItem.id}
                  type="button"
                  className="flex h-8 w-full items-center gap-2 px-2 text-left hover:bg-[#0b6f35] hover:text-white focus:bg-[#0b6f35] focus:text-white focus:outline-none"
                  onClick={() => handleMenuWindowSelect(windowItem.id)}
                >
                  {windowItem.icon && (
                    <span className="retro-border-inset flex h-5 w-5 items-center justify-center overflow-hidden bg-white text-black [&>*]:scale-[0.42]">
                      {windowItem.icon}
                    </span>
                  )}
                  <span className="truncate font-bold">{windowItem.title}</span>
                </button>
              ))}

              <div className="my-1 h-[2px] border-t border-[#6f6f6f] bg-white" />

              <button
                type="button"
                className="flex h-8 w-full items-center gap-2 px-2 text-left hover:bg-[#0b6f35] hover:text-white focus:bg-[#0b6f35] focus:text-white focus:outline-none"
                onClick={() => {
                  onMenuEasterEgg?.();
                  setIsMenuOpen(false);
                }}
              >
                <span className="retro-border-inset flex h-5 w-5 items-center justify-center bg-white text-[11px] text-black">
                  ?
                </span>
                <span className="truncate font-bold">secret.assistant</span>
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          className={`retro-button flex h-7 w-9 items-center justify-center px-0 ${isMenuOpen ? "retro-border-inset" : ""}`}
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
          aria-label="Abrir menu inicial"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
        >
          <span className="flex flex-col gap-[3px]" aria-hidden="true">
            <span className="h-[2px] w-4 bg-black" />
            <span className="h-[2px] w-4 bg-black" />
            <span className="h-[2px] w-4 bg-black" />
          </span>
        </button>
      </div>

      <div className="retro-border-inset h-7 w-[3px] bg-[#d8d8d8]" />

      <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
        {windows
          .filter((windowItem) => windowItem.isOpen)
          .map((windowItem) => (
            <button
              key={windowItem.id}
              type="button"
              className={`h-7 min-w-28 truncate px-2 text-left ${
                activeWindowId === windowItem.id
                  ? "retro-border-inset bg-[#0b6f35] text-white"
                  : "retro-button"
              }`}
              aria-label={`Trazer ${windowItem.title} para frente`}
              onClick={() => onWindowSelect(windowItem.id)}
            >
              {windowItem.title}
            </button>
          ))}
      </div>

      <div className="retro-border-inset h-7 w-[3px] bg-[#d8d8d8]" />

      <div className="retro-border-inset flex h-8 items-center gap-2 bg-[#d8d8d8] px-2 text-black">
        <TranslationButton />
        <div className="flex min-w-[74px] flex-col items-center justify-center text-[11px] font-bold leading-tight tabular-nums">
          <span>{displayTime}</span>
          <span>{displayDate}</span>
        </div>
      </div>
    </footer>
  );
}
