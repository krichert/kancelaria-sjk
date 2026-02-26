"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Specjalizacje", href: "#specjalizacje" },
  { label: "Opinie", href: "#opinie" },
  { label: "Prawnicy", href: "#prawnicy" },
  { label: "Blog", href: "/blog" },
  { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Jeśli jest hash w URL i jesteśmy na stronie głównej, zrób scroll
    if (pathname === "/" && window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [pathname]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setIsMenuOpen(false);

      // Jeśli jesteśmy na stronie głównej, zrób scroll
      if (pathname === "/") {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Jeśli jesteśmy na innej stronie, przenieś na główną z hashem
        router.push(`/${href}`);
      }
    } else {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const renderLink = (item: (typeof navLinks)[number]) => {
    if (item.href.startsWith("#")) {
      return (
        <a
          key={item.href}
          href={`/${item.href}`}
          onClick={(e) => handleSmoothScroll(e, item.href)}
          className="hover:text-[var(--color-accent)] transition-colors"
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        className="hover:text-[var(--color-accent)] transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="border-b border-[var(--color-black)]">
      <div className="bg-[#d9d9d9] text-[var(--color-black)] shadow-[0_18px_32px_rgba(120,120,120,0.35)] relative z-20">
        <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-2 text-sm font-light uppercase tracking-[0.08em]">
          <span className="text-xs sm:text-sm text-left mb-4 sm:mb-0">zadzwoń lub napisz</span>
          <div className="flex contact-row items-start sm:items-center gap-3 text-[var(--color-black)] text-left sm:text-right">
            <a
              href="tel:517192750"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              517 192 750
            </a>
            <span className="hidden min-[392px]:inline-block">|</span>
            <a
              href="mailto:j.szypniewska@sjkancelaria.pl"
              className="hover:text-[var(--color-accent)] transition-colors lowercase"
            >
              j.szypniewska@sjkancelaria.pl
            </a>
          </div>
        </div>
      </div>

      <nav className="bg-[var(--color-black)] text-[var(--color-white)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center"
              aria-label="Strona główna"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src={logo}
                alt="Logo Kancelarii SJK"
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            <button
              type="button"
              onClick={toggleMenu}
              className="md:hidden text-[var(--color-white)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              aria-label="Przełącz nawigację"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menu</span>
              <span
                className={`block h-px w-6 bg-[var(--color-white)] transition-all ${
                  isMenuOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-[var(--color-white)] transition-all my-1 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-[var(--color-white)] transition-all ${
                  isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </button>

            <div className="hidden flex-1 items-center justify-end gap-6 text-xs font-light uppercase tracking-[0.2em] md:flex">
              {navLinks.map(renderLink)}
            </div>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
              isMenuOpen ? "max-h-96 mt-4" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-4 text-xs font-light uppercase tracking-[0.2em]">
              {navLinks.map(renderLink)}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
