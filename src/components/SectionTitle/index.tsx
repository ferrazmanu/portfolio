import type { ComponentPropsWithoutRef } from "react";

type SectionTitleProps = ComponentPropsWithoutRef<"div">;

export function SectionTitle({ className = "", ...props }: SectionTitleProps) {
  return (
    <div
      className={`flex flex-col items-center gap-4 text-3xl font-bold md:text-4xl ${className}`}
      {...props}
    />
  );
}
