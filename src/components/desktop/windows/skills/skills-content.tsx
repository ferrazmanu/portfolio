import type { TranslateFn } from "../../types";
import { skillGroups } from "./skills-config";

interface SkillsContentProps {
  t: TranslateFn;
}

export function SkillsContent({ t }: SkillsContentProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {skillGroups.map((group) => (
        <section key={group.title.pt} className="retro-border-inset bg-white p-2">
          <h3 className="mb-2 bg-[#0b6f35] px-1 text-xs font-bold text-white">
            {t(group.title)}
          </h3>
          <ul className="grid gap-1">
            {group.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs">
                <span className="retro-border-inset h-3 w-3 bg-[#d8d8d8]" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
