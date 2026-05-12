import { CAREER_DATA } from "@/data/career";

import type { TranslateFn } from "../../types";

interface ExperienceWindowProps {
  t: TranslateFn;
}

export function ExperienceWindow({ t }: ExperienceWindowProps) {
  return (
    <ol className="space-y-4">
      {CAREER_DATA.map((job) => (
        <li
          key={job.title}
          className="grid gap-2 border-l-4 border-[#0b6f35] pl-3"
        >
          <span className="text-[11px] font-bold uppercase text-[#444]">
            {t({ pt: job.time.pt, en: job.time.en })}
          </span>
          <h3 className="font-bold">{job.title}</h3>
          <p className="text-xs leading-relaxed">
            {t({ pt: job.description.pt, en: job.description.en })}
          </p>
        </li>
      ))}
    </ol>
  );
}
