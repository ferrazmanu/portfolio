import { useState } from "react";

import {
  DesktopIcon,
  type DesktopIconPosition,
} from "@/components/DesktopIcon";
import { FloatingCat } from "@/components/FloatingCat";
import { RetroWindow } from "@/components/RetroWindow";
import { Taskbar } from "@/components/Taskbar";
import { PROJECTS_DATA } from "@/data/projects";
import { useTranslation } from "@/hooks/useTranslation";
import { retroTheme } from "@/theme/retroTheme";

import { DesktopWindowContent } from "./DesktopWindowContent";
import { ProjectPreviewWindow } from "./ProjectPreviewWindow";
import {
  desktopWindows,
  initialIconPositions,
  initialMinimizedWindowState,
  initialWindowOrder,
  initialWindowState,
} from "./desktopConfig";
import type { LocalizedText, WindowId } from "./types";

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
  const [assistantExternalMessage, setAssistantExternalMessage] =
    useState<LocalizedText | null>(null);

  const t = ({ pt, en }: LocalizedText) =>
    handleTranslation({ text: pt, translation: en });

  const selectedProject = selectedProjectName
    ? PROJECTS_DATA.find((project) => project.name === selectedProjectName)
    : undefined;

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

    setIconPositions((currentPositions) => ({
      ...currentPositions,
      [id as WindowId]: position,
    }));
  };

  const openProjectPreview = (projectName: string) => {
    setSelectedProjectName(projectName);
    setProjectPreviewZIndex(
      Math.max(...Object.values(windowOrder), projectPreviewZIndex) + 1,
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

      <FloatingCat
        initialMessage={t({
          pt: "Oi! Clique nos ícones para abrir as janelas. Eu fico por aqui caso precise de ajuda. Tecnicamente. Na prática, sou um gato.",
          en: "Hi! Click the icons to open windows. I'll hang around in case you need help. Technically. In practice, I'm a cat.",
        })}
        externalMessage={
          assistantExternalMessage ? t(assistantExternalMessage) : undefined
        }
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
