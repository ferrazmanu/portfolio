export interface ResumeItem {
  id: "resume-pt" | "resume-en";
  title: string;
  filename: string;
  url: string;
  description: {
    pt: string;
    en: string;
  };
  languageLabel: {
    pt: string;
    en: string;
  };
}

export const resumeItems: ResumeItem[] = [
  {
    id: "resume-pt",
    title: "Curriculo_PT_BR.pdf",
    filename: "Manuela Ferraz - Resume - PT_BR.pdf",
    url: "/documents/resume-pt.pdf",
    description: {
      pt: "Currículo em Português",
      en: "Portuguese Resume",
    },
    languageLabel: {
      pt: "Português (PT-BR)",
      en: "Portuguese (PT-BR)",
    },
  },
  {
    id: "resume-en",
    title: "Resume_EN_US.pdf",
    filename: "Manuela Ferraz - Resume - EN_US.pdf",
    url: "/documents/resume-en.pdf",
    description: {
      pt: "Currículo em Inglês",
      en: "English Resume",
    },
    languageLabel: {
      pt: "Inglês (EN-US)",
      en: "English (EN-US)",
    },
  },
];
