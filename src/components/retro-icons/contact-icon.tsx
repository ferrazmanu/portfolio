import { IconFrame } from "./icon-frame";

export function ContactIcon() {
  return (
    <IconFrame>
      <span className="retro-border absolute h-7 w-9 bg-[#f2ead0]" />
      <span className="absolute left-[4px] top-[12px] h-[2px] w-8 rotate-[24deg] bg-[#203026]" />
      <span className="absolute right-[4px] top-[12px] h-[2px] w-8 rotate-[-24deg] bg-[#203026]" />
      <span className="absolute bottom-[9px] left-[9px] text-[10px] font-bold leading-none text-[#0b6f35]">
        @
      </span>
    </IconFrame>
  );
}
