import Link from "next/link";

import type { TranslateFn } from "../../types";

interface ContactWindowProps {
  t: TranslateFn;
}

export function ContactWindow({ t }: ContactWindowProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-bold">
        {t({
          pt: "Conectar com Manuela Ferraz",
          en: "Connect with Manuela Ferraz",
        })}
      </p>
      <div className="retro-border-inset space-y-2 bg-white p-3">
        <p className="text-xs">Email: ferraz.manuela@hotmail.com</p>
        <p className="text-xs">
          {t({
            pt: "Localização: Londrina/PR",
            en: "Location: Londrina/PR",
          })}
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Link
          className="retro-button text-center"
          href="mailto:ferraz.manuela@hotmail.com"
        >
          Email
        </Link>
        <Link
          className="retro-button text-center"
          href="https://linkedin.com/in/ferrazmanuela"
          target="_blank"
        >
          LinkedIn
        </Link>
        <Link
          className="retro-button text-center"
          href="https://github.com/ferrazmanu"
          target="_blank"
        >
          GitHub
        </Link>
        <Link className="retro-button text-center" href="/">
          {t({ pt: "Portfólio", en: "Portfolio" })}
        </Link>
      </div>
    </div>
  );
}
