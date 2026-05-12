import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<typeof Link>;

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <Link
      className={`retro-button inline-flex items-center justify-center ${className}`}
      {...props}
    />
  );
}
