import Link from "next/link";

import type { TranslateFn } from "../../types";

interface ResumeWindowProps {
  t: TranslateFn;
}

export function ResumeWindow({ t }: ResumeWindowProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-bold">
        {t({
          pt: "Currículo em PDF",
          en: "Resume (PDF)",
        })}
      </p>
      <div className="retro-border-inset space-y-2 bg-white p-3">
        <p className="text-xs">
          {t({
            pt: "Escolha o idioma do documento para visualizar ou fazer download:",
            en: "Choose the document language to view or download:",
          })}
        </p>
      </div>

      <div className="grid gap-2">
        <Link
          className="retro-button cursor-pointer text-center"
          href="/documents/resume-pt.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t({ pt: "Versão em Português (PT-BR)", en: "Portuguese version (PT-BR)" })}
        </Link>
        <Link
          className="retro-button cursor-pointer text-center"
          href="/documents/resume-en.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t({ pt: "Versão em Inglês (EN-US)", en: "English version (EN-US)" })}
        </Link>
      </div>
    </div>
  );
}
