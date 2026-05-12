import { IconFrame } from "./icon-frame";

export function VideoIcon() {
  return (
    <IconFrame>
      <span className="retro-border absolute h-8 w-9 bg-[#1f1f1f]" />
      <span className="absolute left-[7px] top-[8px] h-2 w-2 bg-[#dcdcdc]" />
      <span className="absolute right-[7px] top-[8px] h-2 w-2 bg-[#dcdcdc]" />
      <span className="absolute left-[7px] bottom-[8px] h-2 w-2 bg-[#dcdcdc]" />
      <span className="absolute right-[7px] bottom-[8px] h-2 w-2 bg-[#dcdcdc]" />
      <span className="absolute left-[16px] top-[13px] h-0 w-0 border-b-[7px] border-l-[10px] border-t-[7px] border-b-transparent border-l-[#65ff8f] border-t-transparent" />
    </IconFrame>
  );
}
