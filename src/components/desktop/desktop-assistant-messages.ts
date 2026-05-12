import type { LocalizedText, WindowId } from "./types";
import { imagesWindowItems } from "./windows/images/images-config";
import { trashItems } from "./windows/trash/trash-config";

export const getWindowAssistantMessage = (id: WindowId): LocalizedText => {
  const messages: Record<WindowId, LocalizedText> = {
    about: {
      pt: "Essa é a janela principal. Sim, a Manu sabe React, TypeScript e Next.js. Eu supervisionei.",
      en: "This is the main window. Yes, she knows React, TypeScript, and Next.js. I supervised.",
    },
    projects: {
      pt: "Projetos abertos. Clique nas imagens se quiser ver as prévias maiores. Eu gosto de thumbnails dramáticas.",
      en: "Projects opened. Click the images if you want bigger previews. I like dramatic thumbnails.",
    },
    images:
      imagesWindowItems.length > 0
        ? {
            pt: "Clique em uma imagem para ver maior. Eu vou fingir que não estou julgando seus arquivos.",
            en: "Click an image to preview it. I'll pretend I'm not judging your files.",
          }
        : {
            pt: "Pasta de imagens aberta e completamente vazia. Um minimalismo ousado. Quase uma ameaça.",
            en: "Images folder opened and completely empty. Bold minimalism. Almost threatening.",
          },
    experience: {
      pt: "Linha do tempo profissional. Spoiler: tem front-end, produto e bastante café implícito.",
      en: "Professional timeline. Spoiler: front-end, product work, and plenty of implied coffee.",
    },
    skills: {
      pt: "Skills carregadas. Eu teria adicionado 'convencer gatos a cooperar', mas faltou validação técnica.",
      en: "Skills loaded. I would add 'convincing cats to cooperate', but it lacks technical validation.",
    },
    contact: {
      pt: "Contato aberto. Uma boa janela para chamar a Manu antes que eu mude de ideia.",
      en: "Contact opened. A good window to reach Manu before I change my mind.",
    },
    resume: {
      pt: "Currículo em PDF. Formal, direto e com menos comentários sarcásticos do que eu gostaria.",
      en: "Resume in PDF. Formal, direct, and with fewer sarcastic comments than I would like.",
    },
    trash:
      trashItems.length > 0
        ? {
            pt: "Nada diz nostalgia como arquivo descartado com potencial dramático.",
            en: "Nothing says nostalgia like discarded files with dramatic potential.",
          }
        : {
            pt: "A lixeira está vazia. Ao contrário da minha lista de opiniões sobre layouts.",
            en: "Trash is empty. Unlike my list of opinions about layouts.",
          },
  };

  return messages[id];
};

export const getProjectPreviewAssistantMessage = (
  projectName: string,
): LocalizedText => ({
  pt: `Abrindo imagem de ${projectName}. Muito profissional. Muito pixels. Aprovado.`,
  en: `Opening ${projectName}'s image. Very professional. Very pixels. Approved.`,
});

export const getImagePreviewAssistantMessage = (
  imageTitle?: string,
): LocalizedText => ({
  pt: imageTitle
    ? `Abrindo ${imageTitle}.`
    : "Abrindo imagem misteriosa. Isso nunca deu problema em computadores antigos.",
  en: imageTitle
    ? `Opening ${imageTitle}.`
    : "Opening mysterious image. This never caused trouble on old computers.",
});

export const desktopMenuEasterEggMessage: LocalizedText = {
  pt: "Easter egg encontrado: assistentes também sabem debugar CSS. Às vezes.",
  en: "Easter egg found: assistants can debug CSS too. Sometimes.",
};
