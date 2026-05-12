import type { CSSProperties, PointerEventHandler, ReactNode } from "react";
import { forwardRef } from "react";

import {
  RetroMenuItem,
  type RetroMenuItemConfig,
} from "./retro-menu-item";

type RetroMenuArrowPlacement = "left" | "right";

interface RetroMenuProps {
  arrowPlacement?: RetroMenuArrowPlacement;
  children?: ReactNode;
  className?: string;
  items: RetroMenuItemConfig[];
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  style?: CSSProperties;
  title?: ReactNode;
  titleAccessory?: ReactNode;
}

const arrowPlacementClassNames: Record<RetroMenuArrowPlacement, string> = {
  left: "after:left-[-7px] after:border-b-2 after:border-l-2",
  right: "after:right-[-7px] after:border-r-2 after:border-t-2",
};

export const RetroMenu = forwardRef<HTMLDivElement, RetroMenuProps>(
  (
    {
      arrowPlacement = "left",
      children,
      className = "",
      items,
      onPointerDown,
      style,
      title,
      titleAccessory,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`retro-border fixed isolate z-[140] bg-retro-gray font-retro text-xs text-black shadow-retro after:absolute after:top-3 after:-z-10 after:h-3 after:w-3 after:rotate-45 after:border-black after:bg-retro-gray after:content-[''] ${arrowPlacementClassNames[arrowPlacement]} ${className}`}
        style={style}
        onPointerDown={onPointerDown}
      >
        {title ? (
          <div className="retro-titlebar h-6">
            <span>{title}</span>
            {titleAccessory}
          </div>
        ) : null}

        <div className="p-1">
          {items.map((item) => (
            <RetroMenuItem key={item.id} item={item} />
          ))}

          {children}
        </div>
      </div>
    );
  },
);

RetroMenu.displayName = "RetroMenu";

export type { RetroMenuItemConfig };
