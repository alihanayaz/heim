import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({ type = "text", className, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "border-border hover:border-accent focus:ring-accent placeholder:text-foreground-subtle h-10 w-full rounded-md border px-4 py-2 text-base transition-colors focus:ring-2 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
