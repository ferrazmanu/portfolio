import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

interface PixelCell {
  x: number;
  y: number;
  threshold: number;
}

type PixelDissolveDirection = "dismiss" | "restore";
type PixelDissolveState = "idle" | "dismissing" | "restoring";

interface UsePixelDissolveMaskParams {
  durationMs?: number;
  height: number;
  pixelSize?: number;
  visible: boolean;
  width: number;
}

interface PixelDissolveMaskResult {
  maskStyle: CSSProperties;
  shouldRender: boolean;
  state: PixelDissolveState;
}

const encodeSvgAsMaskUrl = (svg: string): string =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const easeOutCubic = (value: number): number => 1 - Math.pow(1 - value, 3);

const normalize = (value: number, min: number, max: number): number => {
  if (max === min) return 0;

  return (value - min) / (max - min);
};

const createCells = (
  columns: number,
  rows: number,
  direction: PixelDissolveDirection,
): PixelCell[] => {
  const rawScores: number[] = [];

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const xProgress = columns <= 1 ? 0 : x / (columns - 1);
      const yProgress = rows <= 1 ? 0 : y / (rows - 1);
      const diagonalNoise = ((x * 17 + y * 31) % 11) / 100;

      const score =
        direction === "dismiss"
          ? xProgress + yProgress * 0.34 + diagonalNoise
          : xProgress + (1 - yProgress) * 0.48 + diagonalNoise;

      rawScores.push(score);
    }
  }

  const minScore = Math.min(...rawScores);
  const maxScore = Math.max(...rawScores);
  const cells: PixelCell[] = [];
  let scoreIndex = 0;

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      cells.push({
        x,
        y,
        threshold: normalize(rawScores[scoreIndex], minScore, maxScore),
      });
      scoreIndex += 1;
    }
  }

  return cells;
};

export const usePixelDissolveMask = ({
  durationMs = 700,
  height,
  pixelSize = 8,
  visible,
  width,
}: UsePixelDissolveMaskParams): PixelDissolveMaskResult => {
  const [shouldRender, setShouldRender] = useState(visible);
  const [visibleAmount, setVisibleAmount] = useState(visible ? 1 : 0);
  const [state, setState] = useState<PixelDissolveState>("idle");
  const animationFrameRef = useRef<number | null>(null);

  const columns = Math.max(1, Math.ceil(width / pixelSize));
  const rows = Math.max(1, Math.ceil(height / pixelSize));

  const dismissCells = useMemo(
    () => createCells(columns, rows, "dismiss"),
    [columns, rows],
  );
  const restoreCells = useMemo(
    () => createCells(columns, rows, "restore"),
    [columns, rows],
  );

  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const nextState = visible ? "restoring" : "dismissing";

    setState(nextState);

    if (visible) {
      setShouldRender(true);
    }

    const start = performance.now();
    const from = visible ? 0 : 1;
    const to = visible ? 1 : 0;

    const animate = (now: number) => {
      const elapsed = now - start;
      const rawProgress = clamp(elapsed / durationMs, 0, 1);
      const progress = easeOutCubic(rawProgress);
      const nextVisibleAmount = from + (to - from) * progress;

      setVisibleAmount(nextVisibleAmount);

      if (rawProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      setState("idle");

      if (!visible) {
        setShouldRender(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [durationMs, visible]);

  const activeCells = state === "restoring" ? restoreCells : dismissCells;

  const maskSvg = useMemo(() => {
    const rects = activeCells
      .filter((cell) => cell.threshold <= visibleAmount)
      .map(
        (cell) =>
          `<rect x="${cell.x * pixelSize}" y="${
            cell.y * pixelSize
          }" width="${pixelSize}" height="${pixelSize}" fill="white" />`,
      )
      .join("");

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="black" />${rects}</svg>`;
  }, [activeCells, height, pixelSize, visibleAmount, width]);

  const maskImage = encodeSvgAsMaskUrl(maskSvg);

  return {
    maskStyle: {
      WebkitMaskImage: maskImage,
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskSize: "100% 100%",
      maskImage,
      maskRepeat: "no-repeat",
      maskSize: "100% 100%",
    },
    shouldRender,
    state,
  };
};
