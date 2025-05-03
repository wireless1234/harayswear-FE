"use client";

import { useEffect, useLayoutEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useLayoutEffect(() => {
    // Get saved theme from localStorage (to prevent flicker)
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
    } else {
      setDarkMode(prefersDark);
      localStorage.setItem("theme", prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to <html>
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save to localStorage
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 bg-[var(--color-primary)] text-[var(--color-text)] rounded-md"
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
