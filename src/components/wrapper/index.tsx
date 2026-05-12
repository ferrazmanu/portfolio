import type { ComponentPropsWithoutRef } from "react";

type WrapperProps = ComponentPropsWithoutRef<"section">;

export function Wrapper({ className = "", ...props }: WrapperProps) {
  return (
    <section
      className={`mx-auto flex min-h-screen w-full max-w-[80%] flex-col justify-center gap-4 px-5 py-12 md:max-w-[90%] ${className}`}
      {...props}
    />
  );
}
