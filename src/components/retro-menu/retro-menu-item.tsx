import type { ReactNode } from "react";

export interface RetroMenuItemConfig {
  disabled?: boolean;
  icon?: ReactNode;
  id: string;
  label: ReactNode;
  onClick: () => void;
}

interface RetroMenuItemProps {
  item: RetroMenuItemConfig;
}

export function RetroMenuItem({ item }: RetroMenuItemProps) {
  return (
    <button
      type="button"
      className="flex h-8 w-full items-center gap-2 px-2 text-left hover:bg-[#0b6f35] hover:text-white focus:bg-[#0b6f35] focus:text-white focus:outline-none disabled:text-gray-500 disabled:hover:bg-transparent disabled:hover:text-gray-500"
      disabled={item.disabled}
      onClick={item.onClick}
    >
      {item.icon ? (
        <span className="retro-border-inset flex h-5 w-5 items-center justify-center bg-white text-black">
          {item.icon}
        </span>
      ) : null}
      <span className="truncate font-bold">{item.label}</span>
    </button>
  );
}
