import { IconFrame } from "./icon-frame";

export function AboutIcon() {
  return (
    <IconFrame>
      <span className="retro-border absolute h-8 w-7 bg-[#f2ead0]" />
      <span className="absolute left-[11px] top-[8px] h-2 w-2 bg-[#0b6f35]" />
      <span className="absolute left-[9px] top-[15px] h-[2px] w-5 bg-[#222]" />
      <span className="absolute left-[9px] top-[20px] h-[2px] w-4 bg-[#222]" />
      <span className="absolute left-[9px] top-[25px] h-[2px] w-5 bg-[#222]" />
    </IconFrame>
  );
}
