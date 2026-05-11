import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useRef, useState } from "react";

export interface DesktopIconPosition {
  x: number;
  y: number;
}

export interface DesktopIconProps {
  id: string;
  label: string;
  icon: ReactNode | string;
  onOpen: () => void;
  position: DesktopIconPosition;
  onPositionChange: (id: string, position: DesktopIconPosition) => void;
  externalUrl?: string;
}

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
}

const ICON_WIDTH = 96;
const ICON_HEIGHT = 88;
const TASKBAR_HEIGHT = 48;

export function DesktopIcon({
  id,
  label,
  icon,
  onOpen,
  position,
  onPositionChange,
  externalUrl,
}: DesktopIconProps) {
  const [dragState, setDragState] = useState<DragState | null>(null);
  const wasDraggedRef = useRef(false);

  const iconStyle: CSSProperties = {
    left: position.x,
    top: position.y,
  };

  const handleOpen = () => {
    if (wasDraggedRef.current) {
      wasDraggedRef.current = false;
      return;
    }

    if (externalUrl) {
      window.open(externalUrl, "_blank", "noopener,noreferrer");
      return;
    }

    onOpen();
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    wasDraggedRef.current = false;
    setDragState({
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const distanceX = event.clientX - dragState.startX;
    const distanceY = event.clientY - dragState.startY;

    if (Math.abs(distanceX) > 3 || Math.abs(distanceY) > 3) {
      wasDraggedRef.current = true;
    }

    const maxX = Math.max(0, window.innerWidth - ICON_WIDTH);
    const maxY = Math.max(0, window.innerHeight - ICON_HEIGHT - TASKBAR_HEIGHT);

    onPositionChange(id, {
      x: Math.min(maxX, Math.max(0, dragState.originX + distanceX)),
      y: Math.min(maxY, Math.max(0, dragState.originY + distanceY)),
    });
  };

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    event.currentTarget.releasePointerCapture(event.pointerId);
    setDragState(null);
  };

  return (
    <button
      type="button"
      className="group absolute flex w-24 touch-none select-none flex-col items-center p-2 text-center hover:bg-[#16a34a55] focus:bg-[#16a34a55] focus:outline focus:outline-1 focus:outline-dotted focus:outline-[#d6ffd8]"
      style={iconStyle}
      aria-label={`Abrir ${label}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleOpen}
      onDoubleClick={handleOpen}
      data-desktop-icon={id}
    >
      <span className="retro-border flex h-12 w-12 items-center justify-center bg-[#b9c3b7] text-2xl shadow-[3px_3px_0_rgba(0,0,0,0.65)] group-hover:retro-border-inset">
        {typeof icon === "string" ? (
          <span aria-hidden="true">{icon}</span>
        ) : (
          icon
        )}
      </span>
      <span className="desktop-label group-hover:bg-[#0b6f35] group-hover:text-white group-focus:bg-[#0b6f35] group-focus:text-white">
        {label}
      </span>
    </button>
  );
}
