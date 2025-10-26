"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? (
        <>
          <p className="lg:flex gap-3  hidden">
            <Moon className="h-5 w-5" />
            Dark Mode
          </p>
          <Moon className="lg:hidden h-5 w-5" />
        </>
      ) : (
        <>
          <p className="lg:flex gap-3 hidden">
            <Sun className="h-5 w-5" />
            Light Mode
          </p>
          <Sun className="lg:hidden h-5 w-5" />
        </>
      )}
    </div>
  );
}
