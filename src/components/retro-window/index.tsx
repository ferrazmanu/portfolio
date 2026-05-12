import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

export interface RetroWindowPosition {
  x: number;
  y: number;
}

export interface RetroWindowSize {
  width: number;
  height: number;
}

export interface RetroWindowProps {
  id: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  isMinimized?: boolean;
  onMinimize: () => void;
  onClose: () => void;
  onFocus?: () => void;
  defaultPosition?: RetroWindowPosition;
  defaultSize?: RetroWindowSize;
  zIndex?: number;
}

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
}

interface ResizeState {
  pointerId: number;
  startX: number;
  startY: number;
  originWidth: number;
  originHeight: number;
}

const MIN_WIDTH = 320;
const MIN_HEIGHT = 220;
const DEFAULT_CENTER_POSITION = { x: 120, y: 96 };

const getCenteredPosition = (size: RetroWindowSize): RetroWindowPosition => ({
  x: Math.max(12, (window.innerWidth - size.width) / 2),
  y: Math.max(12, (window.innerHeight - size.height - 48) / 2),
});

export function RetroWindow({
  id,
  title,
  icon,
  children,
  isOpen,
  isMinimized = false,
  onMinimize,
  onClose,
  onFocus,
  defaultPosition,
  defaultSize = { width: 560, height: 420 },
  zIndex = 1,
}: RetroWindowProps) {
  const shouldCalculateInitialPosition = !defaultPosition;
  const [position, setPosition] = useState(
    defaultPosition ?? DEFAULT_CENTER_POSITION
  );
  const [isPositionReady, setIsPositionReady] = useState(
    Boolean(defaultPosition)
  );
  const [size, setSize] = useState(defaultSize);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [resizeState, setResizeState] = useState<ResizeState | null>(null);

  useEffect(() => {
    if (!shouldCalculateInitialPosition) {
      setPosition(defaultPosition);
      setIsPositionReady(true);
      return;
    }

    if (!isOpen) {
      setIsPositionReady(false);
      return;
    }

    const rafId = requestAnimationFrame(() => {
      setPosition(getCenteredPosition(defaultSize));
      setIsPositionReady(true);
    });

    return () => cancelAnimationFrame(rafId);
  }, [
    defaultPosition,
    defaultSize,
    isOpen,
    shouldCalculateInitialPosition,
  ]);

  if (!isOpen || isMinimized || !isPositionReady) return null;

  const windowStyle: CSSProperties = {
    left: position.x,
    top: position.y,
    width: size.width,
    height: size.height,
    zIndex,
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    onFocus?.();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragState({
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    setPosition({
      x: Math.max(8, dragState.originX + event.clientX - dragState.startX),
      y: Math.max(8, dragState.originY + event.clientY - dragState.startY),
    });
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setDragState(null);
  };

  const handleResizePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onFocus?.();
    event.currentTarget.setPointerCapture(event.pointerId);
    setResizeState({
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originWidth: size.width,
      originHeight: size.height,
    });
  };

  const handleResizePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!resizeState || resizeState.pointerId !== event.pointerId) return;

    const maxWidth = Math.max(MIN_WIDTH, window.innerWidth - position.x - 8);
    const maxHeight = Math.max(
      MIN_HEIGHT,
      window.innerHeight - position.y - 48
    );

    setSize({
      width: Math.min(
        maxWidth,
        Math.max(MIN_WIDTH, resizeState.originWidth + event.clientX - resizeState.startX)
      ),
      height: Math.min(
        maxHeight,
        Math.max(MIN_HEIGHT, resizeState.originHeight + event.clientY - resizeState.startY)
      ),
    });
  };

  const handleResizePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!resizeState || resizeState.pointerId !== event.pointerId) return;

    event.currentTarget.releasePointerCapture(event.pointerId);
    setResizeState(null);
  };

  return (
    <section
      className="retro-window retro-window-shell fixed flex min-h-0 flex-col"
      style={windowStyle}
      aria-labelledby={`${id}-title`}
      role="dialog"
      onMouseDown={onFocus}
    >
      <div
        className="retro-titlebar touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="flex min-w-0 items-center gap-1">
          {icon && (
            <span className="retro-border-inset flex h-4 w-4 items-center justify-center overflow-hidden bg-white text-[10px] text-black [&>*]:scale-[0.35]">
              {icon}
            </span>
          )}
          <h2 id={`${id}-title`} className="truncate text-xs">
            {title}
          </h2>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            className="retro-button flex h-5 w-5 items-center justify-center px-0 py-0"
            aria-label={`Minimizar ${title}`}
            onPointerDown={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onMinimize();
            }}
          >
            _
          </button>
          <button
            type="button"
            className="retro-button flex h-5 w-5 items-center justify-center px-0 py-0"
            aria-label={`Fechar ${title}`}
            onPointerDown={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
          >
            x
          </button>
        </div>
      </div>

      <div className="retro-border-inset retro-scrollbar m-2 min-h-0 flex-1 overflow-auto bg-[#f1f1f1] p-3 text-sm leading-relaxed text-black">
        {children}
      </div>

      <button
        type="button"
        className="absolute bottom-1 right-1 h-4 w-4 cursor-se-resize bg-transparent focus:outline focus:outline-1 focus:outline-dotted focus:outline-black"
        aria-label={`Redimensionar ${title}`}
        onPointerDown={handleResizePointerDown}
        onPointerMove={handleResizePointerMove}
        onPointerUp={handleResizePointerUp}
        onPointerCancel={handleResizePointerUp}
      >
        <span className="absolute bottom-[2px] right-[2px] h-[2px] w-[10px] bg-[#404040]" />
        <span className="absolute bottom-[6px] right-[2px] h-[2px] w-[6px] bg-[#404040]" />
        <span className="absolute bottom-[10px] right-[2px] h-[2px] w-[2px] bg-[#404040]" />
      </button>
    </section>
  );
}
