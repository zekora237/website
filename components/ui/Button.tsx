import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "default" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl " +
  "transition-[background-color,border-color,color,box-shadow] duration-200 ease-out " +
  "cursor-pointer select-none whitespace-nowrap " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985]";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-sm shadow-primary/25",
  secondary:
    "bg-secondary text-white hover:bg-secondary-hover shadow-sm shadow-secondary/25",
  outline:
    "border border-border bg-white text-foreground hover:border-primary/45 hover:bg-primary-light/60",
  ghost: "text-foreground hover:bg-muted",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  default: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

/** Shared button styling — usable on <button>, <a> or <Link>. */
export function buttonClass(
  variant: Variant = "primary",
  size: Size = "default",
  className?: string
) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={buttonClass(variant, size, className)}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
