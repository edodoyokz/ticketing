import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "secondary" | "destructive" };

export const Button = forwardRef<HTMLButtonElement, Props>(function Button({ className, variant = "default", ...props }, ref) {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none shadow-sm";
  const variants = {
    default: "bg-primary text-primary-foreground hover:opacity-95",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-95",
    destructive: "bg-destructive text-destructive-foreground hover:opacity-95",
  };
  return <button ref={ref} className={cn(base, variants[variant], className)} {...props} />;
});
