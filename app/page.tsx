"use client";

import Image from "next/image";
import { useState } from "react";
import foto1 from "@/assets/foto1.jpg";
import foto2 from "@/assets/foto2.jpg";
import foto3 from "@/assets/foto3.jpg";

export default function Home() {
  const [currentOpinion, setCurrentOpinion] = useState(0);

  const opinions = [
    {
      id: 1,
      text: "Opinia 1 - przykładowa opinia klienta",
      author: "Klient 1",
    },
    {
      id: 2,
      text: "Opinia 2 - przykładowa opinia klienta",
      author: "Klient 2",
    },
    {
      id: 3,
      text: "Opinia 3 - przykładowa opinia klienta",
      author: "Klient 3",
    },
  ];

  const nextOpinion = () => {
    setCurrentOpinion((prev) => (prev + 1) % opinions.length);
  };

  const prevOpinion = () => {
    setCurrentOpinion((prev) => (prev - 1 + opinions.length) % opinions.length);
  };

  return (
    <div className="bg-[var(--color-black)] text-[var(--color-white)] min-h-screen">
      {/* Hero Section - Main content area */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Left side - Firm description with background photo */}
          <div
            className="relative min-h-[320px] flex items-center p-6 bg-cover bg-center shadow-[0_0_22px_rgba(237,237,237,0.18)]"
            style={{
              backgroundImage: `url(${foto1.src})`,
              backgroundPosition: "center top",
            }}
          >
            <div className="absolute inset-0 bg-[var(--color-black)] opacity-70 z-0"></div>
            <div className="relative z-10 text-[var(--color-white)]">
              <p className="text-base leading-relaxed font-light">
                opis głównych założeń kancelarii
              </p>
            </div>
          </div>

          {/* Right side - Personal photo */}
          <div className="flex justify-center items-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(237,237,237,0.2)]">
              <Image
                src={foto2}
                alt="Portret przedstawiciela kancelarii"
                fill
                sizes="(min-width: 768px) 16rem, 12rem"
                className="object-cover blur-sm scale-110"
                priority
              />
              <div className="absolute inset-0 bg-[var(--color-black)] opacity-20"></div>
              <div className="relative z-10 text-center">
                <p className="text-sm text-[var(--color-white)] font-light">
                  moja fota
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section - visible without scrolling */}
      <section id="specjalizacje" className="container mx-auto px-4 py-12 md:py-16 mb-16 md:mb-24">
        <h2 className="text-2xl font-light text-center mb-8 text-[var(--color-white)]">
          Specjalizacje
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="group bg-[var(--color-black)] shadow-[0_0_18px_rgba(237,237,237,0.12)] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer">
            <div className="p-4">
              <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                Umowy / kontrakty gospodarcze
              </h3>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                  Kompleksowa obsługa prawna w zakresie przygotowywania,
                  negocjacji i weryfikacji umów handlowych, kontraktów B2B, umów
                  o współpracę oraz innych dokumentów prawnych niezbędnych w
                  prowadzeniu działalności gospodarczej.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-[var(--color-black)] shadow-[0_0_18px_rgba(237,237,237,0.12)] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer">
            <div className="p-4">
              <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                Bieżąca obsługa przedsiębiorców (JDG i spółek)
              </h3>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                  Stała opieka prawna dla jednoosobowych działalności
                  gospodarczych oraz spółek. Wsparcie w codziennych kwestiach
                  prawnych, reprezentacja przed organami administracji,
                  doradztwo w zakresie zgodności z przepisami prawa.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-[var(--color-black)] shadow-[0_0_18px_rgba(237,237,237,0.12)] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer">
            <div className="p-4">
              <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                Prawo własności intelektualnej i nowych technologii
              </h3>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                  Ochrona praw autorskich, znaków towarowych, patentów oraz
                  know-how. Doradztwo w zakresie licencji, umów IT, ochrony
                  danych osobowych (RODO) oraz regulacji dotyczących nowych
                  technologii i cyfryzacji.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-[var(--color-black)] shadow-[0_0_18px_rgba(237,237,237,0.12)] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer">
            <div className="p-4">
              <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                Start-upy i innowacyjne przedsięwzięcia
              </h3>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                  Kompleksowe wsparcie prawne dla start-upów od fazy pomysłu do
                  skalowania biznesu. Pomoc w wyborze formy prawnej,
                  pozyskiwaniu finansowania, negocjacjach z inwestorami oraz
                  budowaniu struktury korporacyjnej.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-[var(--color-black)] shadow-[0_0_18px_rgba(237,237,237,0.12)] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer">
            <div className="p-4">
              <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                Przekształcenia spółek, przekształcenia JDG w spółkę, fuzje i
                przejęcia (M&A)
              </h3>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                  Profesjonalna obsługa procesów przekształceń prawnych
                  przedsiębiorstw, transformacji jednoosobowej działalności w
                  spółkę, fuzji i przejęć. Due diligence, negocjacje,
                  przygotowanie dokumentacji oraz reprezentacja przed organami
                  rejestrowymi.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-[var(--color-black)] shadow-[0_0_18px_rgba(237,237,237,0.12)] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer">
            <div className="p-4">
              <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                Prawo podatkowe (doradztwo podatkowe)
              </h3>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                  Optymalizacja podatkowa, doradztwo w zakresie rozliczeń
                  podatkowych, reprezentacja przed organami podatkowymi i
                  skarbowymi. Pomoc w interpretacjach podatkowych oraz sporach z
                  fiskusem. Planowanie podatkowe dla przedsiębiorców.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opinions Section - visible without scrolling */}
      <section
        id="opinie"
        className="relative py-12 min-h-[420px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${foto3.src})` }}
      >
        <div className="absolute inset-0 bg-[var(--color-black)] opacity-80 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl font-light text-center mb-6 text-[var(--color-white)]">
            Opinie
          </h2>

          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-transparent p-6">
              <p className="text-base text-[var(--color-white)] mb-3 font-light">
                {opinions[currentOpinion].text}
              </p>
              <p className="text-sm text-[var(--color-white)] opacity-75 font-light">
                — {opinions[currentOpinion].author}
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-between items-center mt-8 max-w-3xl mx-auto">
            <button
              onClick={prevOpinion}
              className="text-[var(--color-white)] text-2xl hover:text-[var(--color-accent)] transition-colors font-light"
              aria-label="Poprzednia opinia"
            >
              &lt;&lt;
            </button>
            <div className="flex gap-2">
              {opinions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentOpinion(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentOpinion
                      ? "bg-[var(--color-accent)]"
                      : "bg-[var(--color-white)] opacity-50"
                  }`}
                  aria-label={`Przejdź do opinii ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextOpinion}
              className="text-[var(--color-white)] text-2xl hover:text-[var(--color-accent)] transition-colors font-light"
              aria-label="Następna opinia"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="o-kancelarii" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-light text-center mb-12 text-[var(--color-white)]">
          O Kancelarii
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed text-[var(--color-white)] font-light text-center">
            Tutaj znajdzie się szczegółowy opis kancelarii, jej historii,
            wartości i podejścia do klienta. Informacje o doświadczeniu,
            osiągnięciach i filozofii pracy.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-light text-center mb-12 text-[var(--color-white)]">
          Kontakt
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6 text-center">
            <div>
              <p className="text-lg text-[var(--color-white)] font-light mb-2">
                Telefon
              </p>
              <a
                href="tel:517192750"
                className="text-[var(--color-white)] hover:text-[var(--color-accent)] transition-colors font-light"
              >
                517192750
              </a>
            </div>
            <div>
              <p className="text-lg text-[var(--color-white)] font-light mb-2">
                Email
              </p>
              <a
                href="mailto:j.szypniewska@sjkancelaria.pl"
                className="text-[var(--color-white)] hover:text-[var(--color-accent)] transition-colors font-light"
              >
                j.szypniewska@sjkancelaria.pl
              </a>
            </div>
            <div>
              <p className="text-lg text-[var(--color-white)] font-light mb-2">
                Adres
              </p>
              <p className="text-[var(--color-white)] font-light">
                [Adres kancelarii]
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
