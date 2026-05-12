import Link from "next/link";

import type { TranslateFn } from "../../types";

interface ResumeWindowProps {
  t: TranslateFn;
}

export function ResumeWindow({ t }: ResumeWindowProps) {
  return (
    <div className="space-y-3">
      <p>
        {t({
          pt: "Currículo disponível em PDF.",
          en: "Resume available as a PDF.",
        })}
      </p>
      <Link
        className="retro-button inline-block"
        href="/documents/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t({ pt: "Abrir currículo", en: "Open resume" })}
      </Link>
    </div>
  );
}
