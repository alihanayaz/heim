import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border hover:bg-border border shadow-xs",
        ghost: "hover:bg-border",
        active: "bg-accent text-foreground hover:bg-accent/90",
        destructive: "bg-destructive text-foreground hover:bg-destructive/90",
      },
      size: {
        default: "px-4 py-2",
        xs: "p-1",
        sm: "px-2 py-2",
        lg: "px-8 py-2",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  type,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type={type ?? (!asChild ? "button" : undefined)}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
