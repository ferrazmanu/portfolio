import type { TranslateFn } from "../../types";

interface AboutWindowProps {
  t: TranslateFn;
}

export function AboutWindow({ t }: AboutWindowProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-bold">Manuela Ferraz</h3>
      <p>
        {t({
          pt: "Desenvolvedora Front-End em Londrina/PR, focada em React, TypeScript e Next.js.",
          en: "Front-End Developer based in Londrina/PR, focused on React, TypeScript, and Next.js.",
        })}
      </p>
      <p>
        {t({
          pt: "Crio interfaces responsivas, acessíveis e bem organizadas, cuidando da experiência de uso e da manutenção do código.",
          en: "I build responsive, accessible, and well-organized interfaces, caring about user experience and code maintainability.",
        })}
      </p>
      <div className="retro-border-inset bg-white p-2 text-black">
        <p className="text-xs font-bold uppercase">Status</p>
        <p>
          {t({
            pt: "Disponível para conversar sobre produtos web, portfólios e sistemas.",
            en: "Available to talk about web products, portfolios, and systems.",
          })}
        </p>
      </div>
    </div>
  );
}
