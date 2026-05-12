import type { ReactNode } from "react";

export function IconFrame({ children }: { children: ReactNode }) {
  return (
    <span className="relative flex h-10 w-10 items-center justify-center">
      {children}
    </span>
  );
}
