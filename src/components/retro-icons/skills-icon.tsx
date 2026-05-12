import { IconFrame } from "./icon-frame";

export function SkillsIcon() {
  return (
    <IconFrame>
      <span className="retro-border absolute h-8 w-8 bg-[#d7d7d7]" />
      <span className="absolute left-[8px] top-[8px] h-2 w-2 bg-[#0b6f35]" />
      <span className="absolute right-[8px] top-[8px] h-2 w-2 bg-[#202020]" />
      <span className="absolute left-[8px] bottom-[8px] h-2 w-2 bg-[#202020]" />
      <span className="absolute right-[8px] bottom-[8px] h-2 w-2 bg-[#0b6f35]" />
    </IconFrame>
  );
}
