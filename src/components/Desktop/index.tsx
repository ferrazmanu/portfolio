import { useEffect, useRef, useState } from "react";

import {
  DESKTOP_ICON_HEIGHT,
  DESKTOP_ICON_WIDTH,
  DESKTOP_TASKBAR_HEIGHT,
  DesktopIcon,
  type DesktopIconPosition,
} from "@/components/DesktopIcon";
import { FloatingAssistant } from "@/components/floating-assistant/floating-assistant";
import { RetroWindow } from "@/components/RetroWindow";
import { Taskbar } from "@/components/Taskbar";
import { PROJECTS_DATA } from "@/data/projects";
import { useTranslation } from "@/hooks/useTranslation";
import { retroTheme } from "@/theme/retroTheme";

import { DesktopWindowContent } from "./DesktopWindowContent";
import { ImagePreviewWindow } from "./ImagePreviewWindow";
import { ProjectPreviewWindow } from "./ProjectPreviewWindow";
import {
  desktopWindows,
  initialIconPositions,
  initialMinimizedWindowState,
  initialWindowOrder,
  initialWindowState,
} from "./desktopConfig";
import { desktopImages } from "./imagesConfig";
import type { LocalizedText, WindowId } from "./types";

const ICON_DESIGN_WIDTH = 1200;
const ICON_DESIGN_HEIGHT = 620;

const clampIconPosition = (
  position: DesktopIconPosition
): DesktopIconPosition => {
  const maxX = Math.max(0, window.innerWidth - DESKTOP_ICON_WIDTH);
  const maxY = Math.max(
    0,
    window.innerHeight - DESKTOP_ICON_HEIGHT - DESKTOP_TASKBAR_HEIGHT
  );

  return {
    x: Math.min(maxX, Math.max(0, position.x)),
    y: Math.min(maxY, Math.max(0, position.y)),
  };
};

const getResponsiveIconPositions = (): Record<WindowId, DesktopIconPosition> =>
  desktopWindows.reduce<Record<WindowId, DesktopIconPosition>>(
    (positions, windowItem) => {
      const maxDesignX = ICON_DESIGN_WIDTH - DESKTOP_ICON_WIDTH;
      const maxDesignY =
        ICON_DESIGN_HEIGHT - DESKTOP_ICON_HEIGHT - DESKTOP_TASKBAR_HEIGHT;
      const maxViewportX = Math.max(0, window.innerWidth - DESKTOP_ICON_WIDTH);
      const maxViewportY = Math.max(
        0,
        window.innerHeight - DESKTOP_ICON_HEIGHT - DESKTOP_TASKBAR_HEIGHT
      );

      return {
        ...positions,
        [windowItem.id]: clampIconPosition({
          x: (windowItem.iconPosition.x / maxDesignX) * maxViewportX,
          y: (windowItem.iconPosition.y / maxDesignY) * maxViewportY,
        }),
      };
    },
    initialIconPositions
  );

export function Desktop() {
  const { handleTranslation } = useTranslation();
  const [openWindows, setOpenWindows] =
    useState<Record<WindowId, boolean>>(initialWindowState);
  const [minimizedWindows, setMinimizedWindows] = useState<
    Record<WindowId, boolean>
  >(initialMinimizedWindowState);
  const [activeWindowId, setActiveWindowId] = useState<WindowId>("about");
  const [iconPositions, setIconPositions] =
    useState<Record<WindowId, DesktopIconPosition>>(initialIconPositions);
  const [windowOrder, setWindowOrder] =
    useState<Record<WindowId, number>>(initialWindowOrder);
  const [selectedProjectName, setSelectedProjectName] = useState<string | null>(
    null,
  );
  const [projectPreviewZIndex, setProjectPreviewZIndex] = useState(90);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [imagePreviewZIndex, setImagePreviewZIndex] = useState(95);
  const [assistantExternalMessage, setAssistantExternalMessage] =
    useState<LocalizedText | null>(null);
  const hasDraggedIconRef = useRef(false);

  const t = ({ pt, en }: LocalizedText) =>
    handleTranslation({ text: pt, translation: en });

  const getWindowAssistantMessage = (id: WindowId): LocalizedText => {
    const messages: Record<WindowId, LocalizedText> = {
      about: {
        pt: "Essa é a janela principal. Sim, a Manu sabe React, TypeScript e Next.js. Eu supervisionei.",
        en: "This is the main window. Yes, she knows React, TypeScript, and Next.js. I supervised.",
      },
      projects: {
        pt: "Projetos abertos. Clique nas imagens se quiser ver as prévias maiores. Eu gosto de thumbnails dramáticas.",
        en: "Projects opened. Click the images if you want bigger previews. I like dramatic thumbnails.",
      },
      images: {
        pt: "Pasta de imagens aberta. Aqui vivem wallpapers, previews e arquivos suspeitos com extensão .bmp.",
        en: "Images folder opened. Wallpapers, previews, and suspicious .bmp files live here.",
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
      trash: {
        pt: "A lixeira está vazia. Ao contrário da minha lista de opiniões sobre layouts.",
        en: "Trash is empty. Unlike my list of opinions about layouts.",
      },
    };

    return messages[id];
  };

  const selectedProject = selectedProjectName
    ? PROJECTS_DATA.find((project) => project.name === selectedProjectName)
    : undefined;
  const selectedImage = selectedImageId
    ? desktopImages.find((image) => image.id === selectedImageId)
    : undefined;

  const hasOpenWindow =
    Object.values(openWindows).some(Boolean) ||
    Boolean(selectedProject) ||
    Boolean(selectedImage);

  useEffect(() => {
    if (hasOpenWindow) return;

    setAssistantExternalMessage({
      pt: "Todas as janelas foram fechadas. Minimalismo radical ou você só está me deixando sozinho?",
      en: "All windows are closed. Radical minimalism, or are you just leaving me alone?",
    });
  }, [hasOpenWindow]);

  useEffect(() => {
    const updateResponsiveIconPositions = () => {
      if (hasDraggedIconRef.current) {
        setIconPositions((currentPositions) =>
          desktopWindows.reduce<Record<WindowId, DesktopIconPosition>>(
            (positions, windowItem) => ({
              ...positions,
              [windowItem.id]: clampIconPosition(currentPositions[windowItem.id]),
            }),
            currentPositions
          )
        );
        return;
      }

      setIconPositions(getResponsiveIconPositions());
    };

    updateResponsiveIconPositions();
    window.addEventListener("resize", updateResponsiveIconPositions);

    return () =>
      window.removeEventListener("resize", updateResponsiveIconPositions);
  }, []);

  const bringToFront = (id: WindowId) => {
    setActiveWindowId(id);
    setWindowOrder((currentOrder) => ({
      ...currentOrder,
      [id]: Math.max(...Object.values(currentOrder)) + 1,
    }));
  };

  const openWindow = (id: WindowId) => {
    setOpenWindows((currentWindows) => ({ ...currentWindows, [id]: true }));
    setMinimizedWindows((currentWindows) => ({
      ...currentWindows,
      [id]: false,
    }));
    bringToFront(id);
    setAssistantExternalMessage(getWindowAssistantMessage(id));
  };

  const minimizeWindow = (id: WindowId) => {
    setMinimizedWindows((currentWindows) => ({
      ...currentWindows,
      [id]: true,
    }));
  };

  const closeWindow = (id: WindowId) => {
    setOpenWindows((currentWindows) => ({ ...currentWindows, [id]: false }));
    setMinimizedWindows((currentWindows) => ({
      ...currentWindows,
      [id]: false,
    }));
  };

  const updateIconPosition = (id: string, position: DesktopIconPosition) => {
    if (!desktopWindows.some((windowItem) => windowItem.id === id)) return;

    hasDraggedIconRef.current = true;
    setIconPositions((currentPositions) => ({
      ...currentPositions,
      [id as WindowId]: position,
    }));
  };

  const openProjectPreview = (projectName: string) => {
    setSelectedProjectName(projectName);
    setAssistantExternalMessage({
      pt: `Abrindo imagem de ${projectName}. Muito profissional. Muito pixels. Aprovado.`,
      en: `Opening ${projectName}'s image. Very professional. Very pixels. Approved.`,
    });
    setProjectPreviewZIndex(
      Math.max(...Object.values(windowOrder), projectPreviewZIndex) + 1,
    );
  };

  const openImagePreview = (imageId: string) => {
    const image = desktopImages.find((item) => item.id === imageId);

    setSelectedImageId(imageId);
    setAssistantExternalMessage({
      pt: image
        ? `Abrindo ${image.title}.`
        : "Abrindo imagem misteriosa. Isso nunca deu problema em computadores antigos.",
      en: image
        ? `Opening ${image.title}.`
        : "Opening mysterious image. This never caused trouble on old computers.",
    });
    setImagePreviewZIndex(
      Math.max(
        ...Object.values(windowOrder),
        projectPreviewZIndex,
        imagePreviewZIndex
      ) + 1
    );
  };

  const bringProjectPreviewToFront = () => {
    setProjectPreviewZIndex(
      Math.max(...Object.values(windowOrder), projectPreviewZIndex) + 1,
    );
  };

  const taskbarWindows = desktopWindows.map((windowItem) => ({
    id: windowItem.id,
    title: t(windowItem.title),
    isOpen: openWindows[windowItem.id],
    icon: windowItem.icon,
  }));

  return (
    <main
      className="desktop-texture min-h-screen overflow-hidden p-4 pb-14 font-retro text-retro-text sm:p-6"
      style={{
        ["--retro-desktop" as string]: retroTheme.desktopBackground,
        ["--retro-titlebar" as string]: retroTheme.titlebarBlue,
        ["--retro-window-gray" as string]: retroTheme.windowGray,
        ["--retro-border-light" as string]: retroTheme.borderLight,
        ["--retro-border-dark" as string]: retroTheme.borderDark,
        ["--retro-text" as string]: retroTheme.text,
      }}
    >
      <h1 className="sr-only">Portfólio de Manuela Ferraz</h1>

      <div className="absolute inset-x-0 bottom-12 top-0 z-10">
        {desktopWindows.map((windowItem) => (
          <DesktopIcon
            key={windowItem.id}
            id={windowItem.id}
            label={t(windowItem.label)}
            icon={windowItem.icon}
            position={iconPositions[windowItem.id]}
            onPositionChange={updateIconPosition}
            onOpen={() => openWindow(windowItem.id)}
          />
        ))}
      </div>

      <FloatingAssistant
        externalMessage={assistantExternalMessage ?? undefined}
        translateMessage={t}
      />

      {desktopWindows.map((windowItem) => (
        <RetroWindow
          key={windowItem.id}
          id={windowItem.id}
          title={t(windowItem.title)}
          icon={windowItem.icon}
          isOpen={openWindows[windowItem.id]}
          isMinimized={minimizedWindows[windowItem.id]}
          onMinimize={() => minimizeWindow(windowItem.id)}
          onClose={() => closeWindow(windowItem.id)}
          onFocus={() => bringToFront(windowItem.id)}
          defaultPosition={
            windowItem.id === "about" ? undefined : windowItem.position
          }
          defaultSize={windowItem.size}
          zIndex={windowOrder[windowItem.id]}
        >
          <DesktopWindowContent
            windowId={windowItem.id}
            t={t}
            onProjectPreviewOpen={openProjectPreview}
            onImagePreviewOpen={openImagePreview}
          />
        </RetroWindow>
      ))}

      <ProjectPreviewWindow
        project={selectedProject}
        t={t}
        zIndex={projectPreviewZIndex}
        onClose={() => setSelectedProjectName(null)}
        onFocus={bringProjectPreviewToFront}
      />

      <ImagePreviewWindow
        image={selectedImage}
        t={t}
        zIndex={imagePreviewZIndex}
        onClose={() => setSelectedImageId(null)}
        onFocus={() =>
          setImagePreviewZIndex(
            Math.max(
              ...Object.values(windowOrder),
              projectPreviewZIndex,
              imagePreviewZIndex
            ) + 1
          )
        }
      />

      <Taskbar
        menuWindows={taskbarWindows}
        windows={taskbarWindows}
        activeWindowId={activeWindowId}
        onWindowSelect={(id) => {
          const windowId = id as WindowId;
          setOpenWindows((currentWindows) => ({
            ...currentWindows,
            [windowId]: true,
          }));
          setMinimizedWindows((currentWindows) => ({
            ...currentWindows,
            [windowId]: false,
          }));
          bringToFront(windowId);
          setAssistantExternalMessage(getWindowAssistantMessage(windowId));
        }}
        onMenuEasterEgg={() =>
          setAssistantExternalMessage({
            pt: "Easter egg encontrado: gatos também sabem debugar CSS. Às vezes.",
            en: "Easter egg found: cats can debug CSS too. Sometimes.",
          })
        }
      />
    </main>
  );
}
