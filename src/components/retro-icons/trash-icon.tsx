import { IconFrame } from "./icon-frame";

export function TrashIcon() {
  return (
    <IconFrame>
      <span className="retro-border absolute top-[6px] h-2 w-8 bg-[#a9a9a9]" />
      <span className="retro-border-inset absolute bottom-[4px] h-7 w-7 bg-[#d0d0d0]" />
      <span className="absolute bottom-[9px] left-[14px] h-5 w-[2px] bg-[#777]" />
      <span className="absolute bottom-[9px] left-[20px] h-5 w-[2px] bg-[#777]" />
      <span className="absolute bottom-[9px] left-[26px] h-5 w-[2px] bg-[#777]" />
    </IconFrame>
  );
}
