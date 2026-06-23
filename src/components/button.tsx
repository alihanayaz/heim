import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        active: "bg-accent hover:bg-accent-hover",
        ghost: "hover:bg-border bg-transparent",
        destructive: "bg-destructive hover:bg-destructive-hover",
        outline: "border-border hover:border-accent border bg-transparent",
        plain: "bg-transparent",
      },
      size: {
        xs: "p-1",
        sm: "p-2",
        md: "px-4 py-2",
        lg: "px-8 py-2",
        icon: "aspect-square size-10",
        iconSm: "aspect-square size-5",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      tone: {
        base: "text-foreground",
        muted: "text-foreground-muted hover:text-foreground",
        subtle: "text-foreground-subtle hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "active",
      size: "md",
      radius: "md",
      tone: "base",
    },
  },
);

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
  asChild = false,
  variant,
  size,
  tone,
  radius,
  type,
  ref,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type={type ?? (!asChild ? "button" : undefined)}
      className={cn(buttonVariants({ variant, size, radius, tone }), className)}
      {...props}
    />
  );
}
