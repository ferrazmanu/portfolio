import { IconFrame } from "./icon-frame";

interface FolderIconProps {
  label?: string;
}

export function FolderIcon({ label = "DIR" }: FolderIconProps) {
  return (
    <IconFrame>
      <span className="retro-border absolute bottom-1 h-7 w-9 bg-[#f1d36b]" />
      <span className="retro-border absolute left-1 top-2 h-3 w-5 border-b-0 bg-[#f7df82]" />
      <span className="absolute bottom-[9px] left-[7px] bg-[#0b6f35] px-[2px] text-[7px] font-bold leading-3 text-white">
        {label}
      </span>
    </IconFrame>
  );
}
