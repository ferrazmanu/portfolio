import type { BugTarget } from "./use-bug-hunter";

interface BugProps {
  bug: BugTarget;
  onCapture: (bug: BugTarget) => void;
}

export function Bug({ bug, onCapture }: BugProps) {
  const isRare = bug.points === 50;

  return (
    <button
      type="button"
      className="bug-hunter-bug absolute flex h-[42px] w-[42px] touch-none items-center justify-center"
      style={{ left: bug.x, top: bug.y }}
      aria-label={`Corrigir bug ${bug.name}`}
      title={bug.name}
      onClick={() => onCapture(bug)}
    >
      <span
        className={[
          "relative block h-8 w-8",
          isRare ? "text-[#ffd84a]" : "text-[#45ff6d]",
        ].join(" ")}
        aria-hidden="true"
      >
        <span className="absolute left-2 top-2 h-5 w-5 bg-current shadow-[0_0_0_2px_#031409,0_0_10px_current]" />
        <span className="absolute left-1 top-1 h-2 w-2 bg-current" />
        <span className="absolute right-1 top-1 h-2 w-2 bg-current" />
        <span className="absolute left-0 top-4 h-1 w-2 bg-current" />
        <span className="absolute right-0 top-4 h-1 w-2 bg-current" />
        <span className="absolute bottom-0 left-2 h-2 w-1 bg-current" />
        <span className="absolute bottom-0 right-2 h-2 w-1 bg-current" />
        <span className="absolute left-[11px] top-[13px] h-1 w-1 bg-[#031409]" />
        <span className="absolute right-[11px] top-[13px] h-1 w-1 bg-[#031409]" />
        <span className="absolute left-[14px] top-[19px] h-1 w-2 bg-[#031409]" />
      </span>
    </button>
  );
}
