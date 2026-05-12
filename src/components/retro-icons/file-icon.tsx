import { IconFrame } from "./icon-frame";

interface FileIconProps {
  label?: string;
}

export function FileIcon({ label = "FILE" }: FileIconProps) {
  return (
    <IconFrame>
      <span className="retro-border absolute h-9 w-7 bg-white" />
      <span className="absolute right-[7px] top-[3px] h-0 w-0 border-l-[8px] border-t-[8px] border-l-[#cfcfcf] border-t-[#7d7d7d]" />
      <span className="absolute left-[9px] top-[14px] h-[2px] w-5 bg-[#555]" />
      <span className="absolute left-[9px] top-[19px] h-[2px] w-4 bg-[#555]" />
      <span className="absolute bottom-[7px] left-[7px] bg-[#0b6f35] px-[2px] text-[7px] font-bold leading-3 text-white">
        {label}
      </span>
    </IconFrame>
  );
}
