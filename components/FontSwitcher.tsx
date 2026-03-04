"use client";

import { useEffect, useState } from "react";

const fonts = [
  { name: "Cocomat Pro", value: "'Cocomat Pro', sans-serif" },
  { name: "Quicksand", value: "'Quicksand', sans-serif" },
  { name: "Montserrat", value: "'Montserrat', sans-serif" },
  { name: "Coves", value: "'Coves', sans-serif" },
  { name: "Raleway", value: "'Raleway', sans-serif" },
];

export default function FontSwitcher() {
  const [selectedFont, setSelectedFont] = useState<string>("");

  useEffect(() => {
    // Wczytaj zapisaną czcionkę z localStorage
    const savedFont = localStorage.getItem("selectedFont");
    if (savedFont) {
      setSelectedFont(savedFont);
      applyFont(savedFont);
    } else {
      // Domyślnie Cocomat Pro
      setSelectedFont(fonts[0].value);
    }
  }, []);

  const applyFont = (fontValue: string) => {
    // Usuń poprzedni style tag jeśli istnieje
    const existingStyle = document.getElementById("font-switcher-style");
    if (existingStyle) {
      existingStyle.remove();
    }

    // Utwórz nowy style tag z !important
    const style = document.createElement("style");
    style.id = "font-switcher-style";
    style.textContent = `body { font-family: ${fontValue} !important; }`;
    document.head.appendChild(style);

    // Zapisz do localStorage
    localStorage.setItem("selectedFont", fontValue);
  };

  const handleFontChange = (fontValue: string) => {
    setSelectedFont(fontValue);
    applyFont(fontValue);
  };

  return (
    <div className="bg-[var(--color-black)] border-t border-[var(--color-white)]/20 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-4 justify-center">
          <span className="text-sm text-[var(--color-white)]/60 font-light">
            Zmień czcionkę:
          </span>
          {fonts.map((font) => (
            <button
              key={font.value}
              onClick={() => handleFontChange(font.value)}
              className={`px-4 py-2 text-sm font-light rounded transition-colors ${
                selectedFont === font.value
                  ? "bg-[var(--color-accent)] text-[var(--color-black)]"
                  : "bg-[var(--color-gray)] text-[var(--color-white)] hover:bg-[var(--color-accent)] hover:text-[var(--color-black)]"
              }`}
              style={{ fontFamily: font.value }}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
