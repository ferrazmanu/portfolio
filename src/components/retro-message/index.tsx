import type { CSSProperties, ReactNode } from "react";
import { forwardRef } from "react";

type RetroMessageArrowPlacement = "left" | "right";

interface RetroMessageProps {
  arrowPlacement?: RetroMessageArrowPlacement;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  title: ReactNode;
  titleAccessory?: ReactNode;
}

const arrowPlacementClassNames: Record<RetroMessageArrowPlacement, string> = {
  left: "after:left-[-7px] after:border-b-2 after:border-l-2",
  right: "after:right-[-7px] after:border-r-2 after:border-t-2",
};

export const RetroMessage = forwardRef<HTMLDivElement, RetroMessageProps>(
  (
    {
      arrowPlacement = "right",
      children,
      className = "",
      style,
      title,
      titleAccessory,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`retro-border fixed isolate z-[119] bg-retro-gray p-1 font-retro text-xs leading-snug text-black shadow-retro after:absolute after:bottom-3 after:-z-10 after:h-3 after:w-3 after:rotate-45 after:border-black after:bg-retro-gray after:content-[''] ${arrowPlacementClassNames[arrowPlacement]} ${className}`}
        style={style}
      >
        <div className="retro-titlebar h-5 px-1">
          <span className="truncate">{title}</span>
          {titleAccessory}
        </div>
        <div className="retro-message-body retro-border-inset bg-white p-2">
          {children}
        </div>
      </div>
    );
  },
);

RetroMessage.displayName = "RetroMessage";
