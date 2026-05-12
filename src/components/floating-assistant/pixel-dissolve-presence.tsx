import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { usePixelDissolveMask } from "./use-pixel-dissolve-mask";

interface PixelDissolvePresenceProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "className" | "style"> {
  children: ReactNode;
  className?: string;
  dismissDurationMs?: number;
  height: number;
  pixelSize?: number;
  restoreDurationMs?: number;
  style?: CSSProperties;
  visible: boolean;
  width: number;
}

export const PixelDissolvePresence = ({
  children,
  className,
  dismissDurationMs = 760,
  height,
  pixelSize = 8,
  restoreDurationMs = 620,
  style,
  visible,
  width,
  ...props
}: PixelDissolvePresenceProps) => {
  const { maskStyle, shouldRender, state } = usePixelDissolveMask({
    durationMs: visible ? restoreDurationMs : dismissDurationMs,
    height,
    pixelSize,
    visible,
    width,
  });

  if (!shouldRender) return null;

  return (
    <div
      className={className}
      data-pixel-presence-state={state}
      {...props}
      style={{
        ...style,
        ...maskStyle,
      }}
    >
      {children}
    </div>
  );
};
