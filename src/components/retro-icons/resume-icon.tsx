import { IconFrame } from "./icon-frame";

export function ResumeIcon() {
  return (
    <IconFrame>
      <span className="retro-border absolute h-9 w-7 bg-white" />
      <span className="absolute right-[7px] top-[3px] h-0 w-0 border-l-[8px] border-t-[8px] border-l-[#cfcfcf] border-t-[#7d7d7d]" />
      <span className="absolute bottom-[8px] left-[8px] bg-[#8b0000] px-[2px] text-[8px] font-bold leading-3 text-white">
        PDF
      </span>
    </IconFrame>
  );
}
