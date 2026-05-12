import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export interface RetroWindowPosition {
  x: number;
  y: number;
}

export interface RetroWindowSize {
  width: number;
  height: number;
}

export type RetroWindowSizePreset = "xs" | "sm" | "md" | "lg" | "xl";

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
  sizePreset?: RetroWindowSizePreset;
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
const TASKBAR_HEIGHT = 48;
const VIEWPORT_MARGIN = 8;
const WINDOW_DESIGN_WIDTH = 1200;
const WINDOW_DESIGN_HEIGHT = 620;
const DEFAULT_CENTER_POSITION = { x: 120, y: 96 };
const RETRO_WINDOW_SIZE_PRESETS: Record<
  RetroWindowSizePreset,
  RetroWindowSize
> = {
  xs: { width: 360, height: 260 },
  sm: { width: 440, height: 320 },
  md: { width: 520, height: 380 },
  lg: { width: 620, height: 440 },
  xl: { width: 720, height: 500 },
};

const getCenteredPosition = (size: RetroWindowSize): RetroWindowPosition => ({
  x: Math.max(VIEWPORT_MARGIN, (window.innerWidth - size.width) / 2),
  y: Math.max(
    VIEWPORT_MARGIN,
    (window.innerHeight - size.height - TASKBAR_HEIGHT) / 2,
  ),
});

const clampValue = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const getViewportMaxSize = () => ({
  width: Math.max(1, window.innerWidth - VIEWPORT_MARGIN * 2),
  height: Math.max(
    1,
    window.innerHeight - TASKBAR_HEIGHT - VIEWPORT_MARGIN * 2,
  ),
});

const getResponsiveSize = (defaultSize: RetroWindowSize): RetroWindowSize => {
  const maxSize = getViewportMaxSize();
  const designAvailableHeight = WINDOW_DESIGN_HEIGHT - TASKBAR_HEIGHT;
  const responsiveWidth =
    (defaultSize.width / WINDOW_DESIGN_WIDTH) * window.innerWidth;
  const responsiveHeight =
    (defaultSize.height / designAvailableHeight) *
    (window.innerHeight - TASKBAR_HEIGHT);

  return {
    width: Math.min(
      maxSize.width,
      Math.max(Math.min(defaultSize.width, maxSize.width), responsiveWidth),
    ),
    height: Math.min(
      maxSize.height,
      Math.max(Math.min(defaultSize.height, maxSize.height), responsiveHeight),
    ),
  };
};

const getResponsivePosition = (
  defaultPosition: RetroWindowPosition | undefined,
  defaultSize: RetroWindowSize,
  size: RetroWindowSize,
): RetroWindowPosition => {
  if (!defaultPosition) return getCenteredPosition(size);

  const maxDesignX = Math.max(1, WINDOW_DESIGN_WIDTH - defaultSize.width);
  const maxDesignY = Math.max(
    1,
    WINDOW_DESIGN_HEIGHT - defaultSize.height - TASKBAR_HEIGHT,
  );
  const maxViewportX = Math.max(
    VIEWPORT_MARGIN,
    window.innerWidth - size.width - VIEWPORT_MARGIN,
  );
  const maxViewportY = Math.max(
    VIEWPORT_MARGIN,
    window.innerHeight - size.height - TASKBAR_HEIGHT,
  );

  return {
    x: clampValue(
      (defaultPosition.x / maxDesignX) * maxViewportX,
      VIEWPORT_MARGIN,
      maxViewportX,
    ),
    y: clampValue(
      (defaultPosition.y / maxDesignY) * maxViewportY,
      VIEWPORT_MARGIN,
      maxViewportY,
    ),
  };
};

const clampPositionToViewport = (
  position: RetroWindowPosition,
  size: RetroWindowSize,
): RetroWindowPosition => {
  const maxX = Math.max(
    VIEWPORT_MARGIN,
    window.innerWidth - size.width - VIEWPORT_MARGIN,
  );
  const maxY = Math.max(
    VIEWPORT_MARGIN,
    window.innerHeight - size.height - TASKBAR_HEIGHT,
  );

  return {
    x: clampValue(position.x, VIEWPORT_MARGIN, maxX),
    y: clampValue(position.y, VIEWPORT_MARGIN, maxY),
  };
};

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
  defaultSize,
  sizePreset = "md",
  zIndex = 1,
}: RetroWindowProps) {
  const initialSize = defaultSize ?? RETRO_WINDOW_SIZE_PRESETS[sizePreset];
  const [position, setPosition] = useState(
    defaultPosition ?? DEFAULT_CENTER_POSITION
  );
  const [isPositionReady, setIsPositionReady] = useState(false);
  const [size, setSize] = useState(initialSize);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [resizeState, setResizeState] = useState<ResizeState | null>(null);
  const hasDraggedRef = useRef(false);
  const hasResizedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      setIsPositionReady(false);
      return;
    }

    const updateResponsiveLayout = () => {
      const nextSize = hasResizedRef.current
        ? {
            width: Math.min(size.width, getViewportMaxSize().width),
            height: Math.min(size.height, getViewportMaxSize().height),
          }
        : getResponsiveSize(initialSize);

      setSize(nextSize);
      setPosition((currentPosition) =>
        hasDraggedRef.current
          ? clampPositionToViewport(currentPosition, nextSize)
          : getResponsivePosition(defaultPosition, initialSize, nextSize),
      );
      setIsPositionReady(true);
    };

    const rafId = requestAnimationFrame(updateResponsiveLayout);
    window.addEventListener("resize", updateResponsiveLayout);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateResponsiveLayout);
    };
  }, [defaultPosition, initialSize, isOpen, size.height, size.width]);

  useEffect(() => {
    if (isOpen) return;

    hasDraggedRef.current = false;
    hasResizedRef.current = false;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isMinimized) return;

    setIsPositionReady(false);
  }, [isMinimized, isOpen]);

  useEffect(() => {
    if (!isOpen || isMinimized) return;

    const rafId = requestAnimationFrame(() => {
      const nextSize = hasResizedRef.current
        ? {
            width: Math.min(size.width, getViewportMaxSize().width),
            height: Math.min(size.height, getViewportMaxSize().height),
          }
        : getResponsiveSize(initialSize);

      setSize(nextSize);
      setPosition((currentPosition) =>
        hasDraggedRef.current
          ? clampPositionToViewport(currentPosition, nextSize)
          : getResponsivePosition(defaultPosition, initialSize, nextSize),
      );
      setIsPositionReady(true);
    });

    return () => cancelAnimationFrame(rafId);
  }, [defaultPosition, initialSize, isMinimized, isOpen, size.height, size.width]);

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

    hasDraggedRef.current = true;
    setPosition(
      clampPositionToViewport(
        {
          x: dragState.originX + event.clientX - dragState.startX,
          y: dragState.originY + event.clientY - dragState.startY,
        },
        size,
      ),
    );
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

    const maxWidth = Math.max(
      Math.min(MIN_WIDTH, window.innerWidth - position.x - VIEWPORT_MARGIN),
      window.innerWidth - position.x - VIEWPORT_MARGIN,
    );
    const maxHeight = Math.max(
      Math.min(MIN_HEIGHT, window.innerHeight - position.y - TASKBAR_HEIGHT),
      window.innerHeight - position.y - TASKBAR_HEIGHT,
    );
    const minWidth = Math.min(MIN_WIDTH, maxWidth);
    const minHeight = Math.min(MIN_HEIGHT, maxHeight);

    hasResizedRef.current = true;
    setSize({
      width: Math.min(
        maxWidth,
        Math.max(
          minWidth,
          resizeState.originWidth + event.clientX - resizeState.startX,
        ),
      ),
      height: Math.min(
        maxHeight,
        Math.max(
          minHeight,
          resizeState.originHeight + event.clientY - resizeState.startY,
        ),
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
