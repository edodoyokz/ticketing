import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Section({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <section className={cn("py-10", className)} {...props} />;
}
