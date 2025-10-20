"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? (
        <p className="flex gap-3">
          <Moon className="h-5 w-5" />
          Dark Mode
        </p>
      ) : (
        <p className="flex gap-3">
          <Sun className="h-5 w-5" />
          Light Mode
        </p>
      )}
    </div>
  );
}
