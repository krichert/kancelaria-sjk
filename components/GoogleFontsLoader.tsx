"use client";

import { useEffect } from "react";

export default function GoogleFontsLoader() {
  useEffect(() => {
    // Sprawdź czy linki już istnieją
    if (document.querySelector('link[href*="fonts.googleapis.com"]')) {
      return;
    }

    // Dodaj preconnect dla Google Fonts
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "anonymous";
    document.head.appendChild(preconnect2);

    // Dodaj link do Google Fonts
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Coves:wght@300;400;700&family=Raleway:wght@300;400;500;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  return null;
}
