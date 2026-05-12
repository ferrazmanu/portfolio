import type { RefObject } from "react";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

export type PortalPosition = {
  top: number;
  left?: number;
  right?: number;
  width?: number;
};

export type PortalResolverContext = {
  triggerRect: DOMRect;
  portalRect: DOMRect | null;
  scrollX: number;
  scrollY: number;
  viewportWidth: number;
  viewportHeight: number;
};

type UsePortalPositionParams = {
  triggerRef: RefObject<HTMLElement | null>;
  portalRef?: RefObject<HTMLElement | null>;
  isOpen: boolean;
  watchDeps?: ReadonlyArray<unknown>;
  resolvePosition: (context: PortalResolverContext) => PortalPosition;
};

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export const usePortalPosition = ({
  triggerRef,
  portalRef,
  isOpen,
  watchDeps = [],
  resolvePosition,
}: UsePortalPositionParams) => {
  const watchDepsKey = watchDeps.map((dependency) => String(dependency)).join("|");
  const [position, setPosition] = useState<PortalPosition>({
    left: 0,
    top: 0,
  });
  const [hasPosition, setHasPosition] = useState(false);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return null;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const portalRect = portalRef?.current?.getBoundingClientRect() || null;
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const next = resolvePosition({
      triggerRect,
      portalRect,
      scrollX,
      scrollY,
      viewportWidth,
      viewportHeight,
    });

    setPosition((prev) => {
      if (
        prev.top === next.top &&
        prev.left === next.left &&
        prev.right === next.right &&
        prev.width === next.width
      ) {
        return prev;
      }

      return next;
    });

    setHasPosition(true);

    return next;
  }, [portalRef, resolvePosition, triggerRef]);

  const prepareOpenPosition = useCallback(() => {
    updatePosition();
  }, [updatePosition]);

  useIsomorphicLayoutEffect(() => {
    if (!isOpen) return;

    const rafId = requestAnimationFrame(() => {
      updatePosition();
    });

    return () => cancelAnimationFrame(rafId);
  }, [isOpen, updatePosition, watchDepsKey]);

  useEffect(() => {
    if (!isOpen) return;

    const handleViewportChange = () => {
      updatePosition();
    };

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [isOpen, updatePosition]);

  return {
    hasPosition,
    position,
    prepareOpenPosition,
    updatePosition,
  };
};
