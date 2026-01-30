"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import foto1 from "@/assets/foto1.jpg";
import foto3 from "@/assets/foto3.jpg";
import foto4 from "@/assets/foto4.jpg";
import person1 from "@/assets/person1.png";
import person2 from "@/assets/person2.png";

const allOpinions = [
  {
    id: 1,
    text: "Joanna to jedna z najlepszych prawniczek w Polsce",
    author: "prezes spółki kapitałowej",
  },
  {
    id: 2,
    text: "Znam już ze stu prawników i żaden by tego tak dobrze nie zrobił",
    author: "przedsiębiorca",
  },
  {
    id: 3,
    text: "Jest Pani najbardziej niepozornym CZOŁGIEM!",
    author: "przedsiębiorczyni",
  },
  {
    id: 4,
    text: "Decyzja o rozpoczęciu z Panią współpracy była jedną z najlepszych moich personalnych decyzji w życiu",
    author: "wspólniczka spółki osobowej",
  },
  {
    id: 5,
    text: "To pismo jest jak rozstrzelanie! Jakby ktoś w trakcie czytania przez przypadek pomyślał, że jednak nie mamy racji, to kolejne słowa i tak spowodują, że zmieni zdanie",
    author: "przedsiębiorczyni",
  },
  {
    id: 6,
    text: "Prawniczy geniusz, wkurzająco dobra w tym, co robi. Nie chciałbym jej spotkać w sądzie.",
    author: "prawnik",
  },
];

// Funkcja do losowego mieszania tablicy (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Home() {
  const [currentOpinion, setCurrentOpinion] = useState(0);

  // Losowe mieszanie opinii przy każdym załadowaniu strony
  const opinions = useMemo(() => shuffleArray(allOpinions), []);

  useEffect(() => {
    // Obsługa scrollowania do sekcji po załadowaniu strony z hashem
    if (window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, []);

  const nextOpinion = () => {
    setCurrentOpinion((prev) => (prev + 1) % opinions.length);
  };

  const prevOpinion = () => {
    setCurrentOpinion((prev) => (prev - 1 + opinions.length) % opinions.length);
  };

  return (
    <div className="bg-[var(--color-black)] text-[var(--color-white)] min-h-screen">
      {/* Hero Section - Main content area with large background photo */}
      <section
        className="relative hero-height flex items-center justify-center bg-cover bg-center w-full"
        style={{
          backgroundImage: `url(${foto1.src})`,
          backgroundPosition: "center center",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div
          className="absolute inset-0 bg-[var(--color-black)] opacity-70 z-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-[75vw] mx-auto">
            {/* Text content */}
            <div className="text-[var(--color-white)]">
              <p className="text-lg md:text-xl leading-relaxed font-light">
                Kancelaria stworzona z myślą o przedsiębiorcach <br />
                <br />
                Doradzamy bez nadmiernego komplikowania i rozwlekłych opinii.
                Wierzymy, że prawo może wspierać biznes zamiast go blokować.
                Stawiamy na praktyczne rozwiązania i skuteczny rozwój.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section - visible without scrolling */}
      <section
        id="specjalizacje"
        className="container mx-auto px-4 py-12 md:py-16 mb-8 md:mb-16"
      >
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
                  Tworzę, weryfikuję i negocjuję umowy gospodarcze. Dzięki
                  doświadczeniu wiem, gdzie kryją się ryzyka i jak je skutecznie
                  zabezpieczyć. Nie poprawiam przecinków, skupiam się na
                  praktycznych zagadnieniach i rzeczywistych zagrożeniach,
                  rozumiejąc kontekst biznesowy.
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
                  Wspieram biznes na co dzień, zarówno JDG, jak i spółki.
                  Przygotowuję i negocjuję umowy gospodarcze a następnie pomagam
                  egzekwować ich wykonywanie. Reaguję na sytuacje kryzysowe,
                  wykraczające poza zwykłe ryzyko biznesowe. Wspieram również
                  wewnętrzne relacje korporacyjne odpowiednimi uchwałami organów
                  i umowami wspólników.
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
                  Dbam o ochronę praw własności intelektualnej oraz pozostałego
                  know-how. Rozumiem wagę tych aktywów i kompleksowo działam w
                  celu ich zabezpieczenia. Wspieram zarówno w relacjach z
                  konkretnymi kontrahentami, wykorzystując sprawdzone zapisy
                  umowne, jak w relacji z całym rynkiem, pomagając w rejestracji
                  i ochronie znaku towarowego.
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
                  Wspieram start-upy na każdym etapie rozwoju, od wyboru formy
                  prawnej po współpracę z inwestorem. Mam doświadczenie w
                  umowach inwestycyjnych, wiem jak chronić założycieli i ich
                  know-how.
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
                  Prowadzę procesy reorganizacyjne i transakcyjne, w tym
                  przekształcenia JDG w spółki kapitałowe, przekształcenia
                  spółek, połączenia i podziały spółek oraz sprzedaże udziałów i
                  akcji. Wiem, gdzie mogą pojawić się ryzyka i jak je
                  zaadresować, by zapewnić klientowi spokój i bezpieczeństwo w
                  toku całego procesu.
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

          <div className="group bg-[var(--color-black)] shadow-[0_0_18px_rgba(237,237,237,0.12)] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer">
            <div className="p-4">
              <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                Prawo korporacyjne i spółek handlowych
              </h3>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                  Doradzam w zakresie zakładania spółek, rejestracji w KRS,
                  treści umów spółek i statutów. Pomagam w uregulowaniu relacji
                  między wspólnikami, struktury organów oraz organizacji
                  zgromadzeń wspólników i walnych zgromadzeń akcjonariuszy.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-[var(--color-black)] shadow-[0_0_18px_rgba(237,237,237,0.12)] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer">
            <div className="p-4">
              <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                Spory gospodarcze / konflikty biznesowe
              </h3>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                  Pomagam przedsiębiorcom w sporach gospodarczych z
                  kontrahentami i wspieram w korporacyjnych konfliktach
                  wspólników (np. wyłączenie wspólnika/uchylenie uchwały).
                  Prowadzę negocjacje na etapie przedsądowym i reprezentuję na
                  etapie sądowym.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opinions Section - visible without scrolling */}
      <section
        id="opinie"
        className="relative py-12 min-h-[420px] flex items-center bg-cover bg-center mb-16 md:mb-24"
        style={{
          backgroundImage: `url(${foto3.src})`,
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div
          className="absolute inset-0 bg-[var(--color-black)] opacity-80 z-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)",
          }}
        ></div>
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

      {/* Lawyers Section */}
      <section
        id="prawnicy"
        className="relative py-24 md:py-32 mb-8 md:mb-16 flex items-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${foto4.src})`,
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 3%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0.1) 97%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 3%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0.1) 97%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div
          className="absolute inset-0 bg-[var(--color-black)] opacity-80 z-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 3%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0.1) 97%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 3%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0.1) 97%, rgba(0,0,0,0) 100%)",
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10 py-12 sm:py-20">
          <h2 className="text-2xl font-light text-center mb-16 text-[var(--color-white)]">
            Prawnicy
          </h2>
          <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
          {/* Joanna */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 items-center">
            {/* Mobile: Title and name first */}
            <div className="md:hidden text-center mb-4 w-full">
              <h3 className="text-2xl font-bold mb-1 text-[var(--color-white)]">
                Adwokat
              </h3>
              <p className="text-lg italic text-[var(--color-white)] font-light">
                Joanna Szypniewska
              </p>
            </div>

            {/* Mobile: Image */}
            <div className="md:hidden flex relative justify-center mb-6 w-full">
              <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                <Image
                  src={person1}
                  alt="Adw. Joanna Szypniewska"
                  fill
                  sizes="12rem"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Left side - Text content */}
            <div className="text-[var(--color-white)] w-full">
              {/* Desktop: Title and name */}
              <div className="hidden md:block">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-[var(--color-white)]">
                  Adwokat
                </h3>
                <p className="text-lg md:text-xl italic mb-6 text-[var(--color-white)] font-light">
                  Joanna Szypniewska
                </p>
              </div>
              <div className="space-y-4 text-sm md:text-base text-[var(--color-white)] font-light leading-relaxed">
                <p>
                  Kancelaria SJK Law&Tax jest prowadzona przez adw. Joannę Szypniewską, członkinię
                  Pomorskiej Izby Adwokackiej w Gdańsku. Swoje usługi adresuje do mikro, małych i średnich
                  przedsiębiorców (MŚP) i obejmują one obszar prawa gospodarczego, handlowego,
                  kontraktowego i podatkowego.
                </p>
                <p>
                  Adw. Joanna Szypniewska posiada dziesięcioletnie doświadczenie w obsłudze prawnej
                  klientów biznesowych zdobywane także w ramach współpracy z trójmiejskimi i warszawskimi
                  kancelariami prawnymi. Jest ekspertką z zakresu prawa spółek, transakcji M&A oraz
                  prawa umów i nowych technologii.
                </p>
                <p>
                  Stawia nacisk na praktyczne rozwiązania, uwzględniające realia biznesowe. Rozumie tempo
                  funkcjonowania przedsiębiorców i formułuje możliwie zwięzłe rekomendacje. Matematyczny
                  umysł pozwala jej ujmować skomplikowane zagadnienia w przejrzyste schematy logiczne.
                  Przez lata doradzała największym podmiotom, dzięki czemu zna skalę biznesu i potrafi
                  wspierać w każdym kalibru działalności gospodarczej.
                </p>
                <p>
                  Świadczy usługi w języku polskim i angielskim.
                </p>
              </div>
              {/* <a
                href="#kontakt"
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#2a2a2a] border border-[var(--color-white)] rounded-lg text-[var(--color-white)] hover:bg-[#3a3a3a] transition-colors font-light text-sm"
              >
                <span>Skontaktuj się</span>
                <span className="text-lg">→</span>
              </a> */}
            </div>

            {/* Right side - Image (Desktop only) */}
            <div className="hidden md:flex relative justify-center">
              <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                <Image
                  src={person1}
                  alt="Adw. Joanna Szypniewska"
                  fill
                  sizes="20rem"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Kuba */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 items-center">
            {/* Mobile: Title and name first */}
            <div className="md:hidden text-center mb-4 w-full order-1">
              <h3 className="text-2xl font-bold mb-1 text-[var(--color-white)]">
                Radca prawny
              </h3>
              <p className="text-lg italic text-[var(--color-white)] font-light">
                Jakub Topolewicz
              </p>
            </div>

            {/* Mobile: Image */}
            <div className="md:hidden flex relative justify-center mb-6 w-full order-2">
              <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                <Image
                  src={person2}
                  alt="Radca prawny Jakub Topolewicz"
                  fill
                  sizes="12rem"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Left side - Image (Desktop only) */}
            <div className="hidden md:flex relative justify-center order-1">
              <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                <Image
                  src={person2}
                  alt="Radca prawny Jakub Topolewicz"
                  fill
                  sizes="20rem"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right side - Text content */}
            <div className="text-[var(--color-white)] order-3 md:order-2 w-full">
              {/* Desktop: Title and name */}
              <div className="hidden md:block">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-[var(--color-white)]">
                  Radca prawny
                </h3>
                <p className="text-lg md:text-xl italic mb-6 text-[var(--color-white)] font-light">
                  Jakub Topolewicz
                </p>
              </div>
              <div className="space-y-4 text-sm md:text-base text-[var(--color-white)] font-light leading-relaxed">
                <p>
                  W sprawach podatkowych kancelaria SJK Law&Tax współpracuje z Jakubem Topolewiczem,
                  jako prawnikiem of counsel. Jakub Topolewicz jest radcą prawnym i członkiem Okręgowej
                  Izby Radców Prawnych w Gdańsku. Specjalizuje się w doradztwie prawnym i podatkowym
                  dla przedsiębiorców oraz inwestorów, ze szczególnym uwzględnieniem procesów
                  transakcyjnych oraz planowania podatkowego.
                </p>
                <p>
                  Doświadczenie zawodowe zdobywał współpracując z podmiotami z tzw. Wielkiej Czwórki w
                  zespołach doradztwa podatkowego oraz z kancelariami prawniczymi w Trójmieście.
                </p>
                <p>
                  W ramach doradztwa podatkowego uczestniczy w audytach podatkowych oraz badaniach
                  due diligence, w tym prowadzonych na potrzeby procesów transakcyjnych, zapewniając
                  wsparcie na etapie planowania transakcji oraz strukturyzowania jej od strony prawnej i
                  podatkowej. Doradza również w zakresie wdrażania ulg podatkowych oraz optymalizacji
                  podatkowych.
                </p>
                <p>
                  Świadczy usługi w języku polskim i angielskim.
                </p>
              </div>
              {/* <a
                href="#kontakt"
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#2a2a2a] border border-[var(--color-white)] rounded-lg text-[var(--color-white)] hover:bg-[#3a3a3a] transition-colors font-light text-sm"
              >
                <span>Skontaktuj się</span>
                <span className="text-lg">→</span>
              </a> */}
            </div>
          </div>
          </div>
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
                517 192 750
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
