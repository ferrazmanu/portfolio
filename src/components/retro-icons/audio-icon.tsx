import { IconFrame } from "./icon-frame";

export function AudioIcon() {
  return (
    <IconFrame>
      <span className="retro-border absolute h-8 w-8 bg-[#f2ead0]" />
      <span className="absolute left-[10px] top-[18px] h-2 w-2 bg-[#0b6f35]" />
      <span className="absolute left-[15px] top-[8px] h-4 w-[3px] bg-[#0b6f35]" />
      <span className="absolute left-[18px] top-[8px] h-[3px] w-8 rotate-[-12deg] bg-[#0b6f35]" />
      <span className="absolute right-[8px] top-[20px] h-[2px] w-2 bg-[#222]" />
      <span className="absolute right-[7px] top-[15px] h-[2px] w-3 bg-[#222]" />
    </IconFrame>
  );
}
