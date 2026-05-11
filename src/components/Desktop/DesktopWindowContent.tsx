import Link from "next/link";

import { CAREER_DATA } from "@/data/career";

import { ProjectListWindow } from "./ProjectListWindow";
import { skillGroups } from "./desktopConfig";
import type { TranslateFn, WindowId } from "./types";

interface DesktopWindowContentProps {
  windowId: WindowId;
  t: TranslateFn;
  onProjectPreviewOpen: (projectName: string) => void;
}

export function DesktopWindowContent({
  windowId,
  t,
  onProjectPreviewOpen,
}: DesktopWindowContentProps) {
  if (windowId === "about") {
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

  if (windowId === "projects") {
    return (
      <ProjectListWindow
        t={t}
        onProjectPreviewOpen={onProjectPreviewOpen}
      />
    );
  }

  if (windowId === "experience") {
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

  if (windowId === "skills") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <section
            key={group.title.pt}
            className="retro-border-inset bg-white p-2"
          >
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

  if (windowId === "contact") {
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

  if (windowId === "resume") {
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
          download
        >
          {t({ pt: "Baixar currículo", en: "Download resume" })}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="font-bold">
        {t({ pt: "Lixeira vazia", en: "Trash is empty" })}
      </h3>
      <p>
        {t({
          pt: "Nada descartado por aqui. Só algumas ideias antigas esperando reboot.",
          en: "Nothing discarded here. Just a few old ideas waiting for a reboot.",
        })}
      </p>
    </div>
  );
}
