import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function ThemeToggler() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme") ?? "light";
    document.body.className = storedTheme;
    return storedTheme;
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="text-muted hover:bg-subtle group flex cursor-pointer items-center justify-center rounded-xl p-1 duration-150"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <span className="duration-150 group-active:scale-90 group-active:rotate-z-90">
        {theme === "light" ? <Moon /> : <Sun />}
      </span>
    </button>
  );
}

export default ThemeToggler;
