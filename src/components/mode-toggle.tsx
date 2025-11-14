"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = theme === "system" ? systemTheme : theme;
  if (!mounted) return null;
  return (
    <Button aria-label="Toggle theme" variant="secondary" onClick={() => setTheme(current === "dark" ? "light" : "dark")}>{current === "dark" ? <Sun size={16} /> : <Moon size={16} />}</Button>
  );
}
