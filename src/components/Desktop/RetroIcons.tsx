import type { ReactNode } from "react";

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <span className="relative flex h-10 w-10 items-center justify-center">
      {children}
    </span>
  );
}

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

export function ProjectsIcon() {
  return (
    <IconFrame>
      <span className="retro-border absolute bottom-1 h-7 w-9 bg-[#d8b44a]" />
      <span className="retro-border absolute left-1 top-1 h-3 w-5 bg-[#f5d36a]" />
      <span className="absolute bottom-[9px] left-[8px] h-[3px] w-6 bg-[#8b6b12]" />
      <span className="absolute bottom-[15px] left-[8px] h-[3px] w-5 bg-[#8b6b12]" />
    </IconFrame>
  );
}

export function ImagesIcon() {
  return (
    <IconFrame>
      <span className="retro-border absolute h-8 w-9 bg-[#f2ead0]" />
      <span className="absolute left-[6px] top-[9px] h-5 w-7 bg-[#6aa7d8]" />
      <span className="absolute bottom-[9px] left-[7px] h-0 w-0 border-b-[10px] border-l-[9px] border-r-[9px] border-b-[#0b6f35] border-l-transparent border-r-transparent" />
      <span className="absolute right-[8px] top-[11px] h-2 w-2 bg-[#f5d36a]" />
    </IconFrame>
  );
}

export function ExperienceIcon() {
  return (
    <IconFrame>
      <span className="retro-border absolute h-8 w-8 bg-[#1f1f1f]" />
      <span className="absolute left-[9px] top-[11px] h-[3px] w-5 bg-[#65ff8f]" />
      <span className="absolute left-[9px] top-[17px] h-[3px] w-4 bg-[#65ff8f]" />
      <span className="absolute left-[9px] top-[23px] h-[3px] w-6 bg-[#65ff8f]" />
    </IconFrame>
  );
}

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

export function ContactIcon() {
  return (
    <IconFrame>
      <span className="retro-border absolute h-7 w-9 bg-[#f2ead0]" />
      <span className="absolute left-[4px] top-[12px] h-[2px] w-8 rotate-[24deg] bg-[#203026]" />
      <span className="absolute right-[4px] top-[12px] h-[2px] w-8 rotate-[-24deg] bg-[#203026]" />
      <span className="absolute bottom-[9px] left-[9px] text-[10px] font-bold leading-none text-[#0b6f35]">@</span>
    </IconFrame>
  );
}

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
