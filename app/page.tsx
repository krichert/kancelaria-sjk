"use client";

import Image from "next/image";
import { useState, useEffect, useMemo, FormEvent } from "react";
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
  const [isOpinionAutoRotateEnabled, setIsOpinionAutoRotateEnabled] =
    useState(true);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

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

  // Automatyczne przewijanie opinii co 3 sekundy
  useEffect(() => {
    if (!isOpinionAutoRotateEnabled) return;

    const interval = setInterval(() => {
      setCurrentOpinion((prev) => (prev + 1) % opinions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpinionAutoRotateEnabled, opinions.length]);

  const nextOpinion = () => {
    setCurrentOpinion((prev) => (prev + 1) % opinions.length);
  };

  const prevOpinion = () => {
    setCurrentOpinion((prev) => (prev - 1 + opinions.length) % opinions.length);
  };

  const handleManualOpinionChange = (nextIndex?: number) => {
    setIsOpinionAutoRotateEnabled(false);
    if (typeof nextIndex === "number") {
      setCurrentOpinion(nextIndex);
    }
  };

  const secondOpinionIndex = (currentOpinion + 1) % opinions.length;
  const thirdOpinionIndex = (currentOpinion + 2) % opinions.length;

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formName || !formEmail || !formMessage) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          subject: formSubject,
          message: formMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Błąd wysyłki formularza");
      }

      setSubmitStatus("success");
      setFormName("");
      setFormEmail("");
      setFormSubject("");
      setFormMessage("");
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--color-black)] text-[var(--color-white)] min-h-screen">
      {/* Hero + Specializations Section - shared background with skyscrapers */}
      <section
        className="relative flex items-start bg-cover bg-center w-full"
        style={{
          backgroundImage: `url(${foto1.src})`,
          backgroundPosition: "center center",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div
          className="absolute inset-0 bg-[var(--color-black)] opacity-70 z-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-10 md:py-16 relative z-10">
          <div className="lg:max-w-[75vw] md:max-w-3xl mx-auto md:mx-0 mb-10 md:mb-14">
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

          {/* Specializations tiles on the same skyscraper background */}
          <div id="specjalizacje" className="mb-4 md:mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="group bg-[var(--color-black)]/80 border border-[var(--color-white)]/10 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] cursor-pointer">
                <div className="p-4">
                  <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                    Umowy / kontrakty gospodarcze
                  </h3>
                  <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                    <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                      Tworzę, weryfikuję i negocjuję umowy gospodarcze. Dzięki
                      doświadczeniu wiem, gdzie kryją się ryzyka i jak je
                      skutecznie zabezpieczyć. Nie poprawiam przecinków, skupiam
                      się na praktycznych zagadnieniach i rzeczywistych
                      zagrożeniach, rozumiejąc kontekst biznesowy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-[var(--color-black)]/80 border border-[var(--color-white)]/10 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] cursor-pointer">
                <div className="p-4">
                  <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                    Bieżąca obsługa przedsiębiorców (JDG i spółek)
                  </h3>
                  <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                    <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                      Wspieram biznes na co dzień, zarówno JDG, jak i spółki.
                      Przygotowuję i negocjuję umowy gospodarcze a następnie
                      pomagam egzekwować ich wykonywanie. Reaguję na sytuacje
                      kryzysowe, wykraczające poza zwykłe ryzyko biznesowe.
                      Wspieram również wewnętrzne relacje korporacyjne
                      odpowiednimi uchwałami organów i umowami wspólników.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-[var(--color-black)]/80 border border-[var(--color-white)]/10 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] cursor-pointer">
                <div className="p-4">
                  <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                    Prawo własności intelektualnej i nowych technologii
                  </h3>
                  <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                    <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                      Dbam o ochronę praw własności intelektualnej oraz
                      pozostałego know-how. Rozumiem wagę tych aktywów i
                      kompleksowo działam w celu ich zabezpieczenia. Wspieram
                      zarówno w relacjach z konkretnymi kontrahentami,
                      wykorzystując sprawdzone zapisy umowne, jak w relacji z
                      całym rynkiem, pomagając w rejestracji i ochronie znaku
                      towarowego.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-[var(--color-black)]/80 border border-[var(--color-white)]/10 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] cursor-pointer">
                <div className="p-4">
                  <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                    Start-upy i innowacyjne przedsięwzięcia
                  </h3>
                  <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                    <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                      Wspieram start-upy na każdym etapie rozwoju, od wyboru
                      formy prawnej po współpracę z inwestorem. Mam doświadczenie
                      w umowach inwestycyjnych, wiem jak chronić założycieli i
                      ich know-how.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-[var(--color-black)]/80 border border-[var(--color-white)]/10 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] cursor-pointer">
                <div className="p-4">
                  <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                    Przekształcenia spółek, przekształcenia JDG w spółkę, fuzje i
                    przejęcia (M&A)
                  </h3>
                  <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                    <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                      Prowadzę procesy reorganizacyjne i transakcyjne, w tym
                      przekształcenia JDG w spółki kapitałowe, przekształcenia
                      spółek, połączenia i podziały spółek oraz sprzedaże udziałów
                      i akcji. Wiem, gdzie mogą pojawić się ryzyka i jak je
                      zaadresować, by zapewnić klientowi spokój i bezpieczeństwo w
                      toku całego procesu.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-[var(--color-black)]/80 border border-[var(--color-white)]/10 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] cursor-pointer">
                <div className="p-4">
                  <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                    Prawo podatkowe (doradztwo podatkowe)
                  </h3>
                  <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                    <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                      Optymalizacja podatkowa, doradztwo w zakresie rozliczeń
                      podatkowych, reprezentacja przed organami podatkowymi i
                      skarbowymi. Pomoc w interpretacjach podatkowych oraz sporach
                      z fiskusem. Planowanie podatkowe dla przedsiębiorców.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-[var(--color-black)]/80 border border-[var(--color-white)]/10 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] cursor-pointer">
                <div className="p-4">
                  <h3 className="text-base font-light mb-0 text-[var(--color-white)] transition-all duration-300 group-hover:text-[var(--color-accent)]">
                    Prawo korporacyjne i spółek handlowych
                  </h3>
                  <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-96 group-hover:mt-4">
                    <p className="text-sm text-[var(--color-white)] font-light leading-relaxed">
                      Doradzam w zakresie zakładania spółek, rejestracji w KRS,
                      treści umów spółek i statutów. Pomagam w uregulowaniu
                      relacji między wspólnikami, struktury organów oraz
                      organizacji zgromadzeń wspólników i walnych zgromadzeń
                      akcjonariuszy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-[var(--color-black)]/80 border border-[var(--color-white)]/10 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] cursor-pointer">
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
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div
          className="absolute inset-0 bg-[var(--color-black)] opacity-80 z-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
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
                Radca prawny - of counsel
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
                  Radca prawny - of counsel
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

      {/* Opinions Section - fixed height */}
      <section
        id="opinie"
        className="relative h-[600px] flex flex-col bg-cover bg-center mb-16 md:mb-24"
        style={{
          backgroundImage: `url(${foto3.src})`,
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div
          className="absolute inset-0 bg-[var(--color-black)] opacity-80 z-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col h-full py-12">
          <h2 className="text-2xl font-light text-center mb-6 text-[var(--color-white)]">
            Opinie
          </h2>

          <div className="max-w-5xl mx-auto flex-1 flex items-center">
            <div className="grid gap-6 lg:grid-cols-3 w-full">
              {/* Główna opinia – widoczna na wszystkich ekranach */}
              <div className="bg-transparent p-6 text-center">
                <p className="text-base text-[var(--color-white)] mb-3 font-light">
                  {opinions[currentOpinion].text}
                </p>
                <p className="text-sm text-[var(--color-white)] opacity-75 font-light">
                  — {opinions[currentOpinion].author}
                </p>
              </div>

              {/* Dwie kolejne opinie – tylko na dużych ekranach, obok siebie */}
              <div className="hidden lg:block">
                <div className="bg-transparent p-6 text-center">
                  <p className="text-base text-[var(--color-white)] mb-3 font-light">
                    {opinions[secondOpinionIndex].text}
                  </p>
                  <p className="text-sm text-[var(--color-white)] opacity-75 font-light">
                    — {opinions[secondOpinionIndex].author}
                  </p>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="bg-transparent p-6 text-center">
                  <p className="text-base text-[var(--color-white)] mb-3 font-light">
                    {opinions[thirdOpinionIndex].text}
                  </p>
                  <p className="text-sm text-[var(--color-white)] opacity-75 font-light">
                    — {opinions[thirdOpinionIndex].author}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation dots above arrows - both fixed near bottom */}
          <div className="max-w-3xl mx-auto pb-4">
            <div className="flex justify-between items-center h-10">
              <button
                onClick={() => {
                  handleManualOpinionChange();
                  prevOpinion();
                }}
                className="text-[var(--color-white)] text-2xl hover:text-[var(--color-accent)] transition-colors font-light h-10 flex items-center"
                aria-label="Poprzednia opinia"
              >
                &lt;&lt;
              </button>
              <div className="flex justify-center items-center h-6 mx-10">
              {opinions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleManualOpinionChange(index)}
                  className={`w-2 h-2 rounded-full transition-colors mx-1 ${
                    index === currentOpinion
                      ? "bg-[var(--color-accent)]"
                      : "bg-[var(--color-white)] opacity-50"
                  }`}
                  aria-label={`Przejdź do opinii ${index + 1}`}
                />
              ))}
            </div>
              <button
                onClick={() => {
                  handleManualOpinionChange();
                  nextOpinion();
                }}
                className="text-[var(--color-white)] text-2xl hover:text-[var(--color-accent)] transition-colors font-light h-10 flex items-center"
                aria-label="Następna opinia"
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-light text-center mb-12 text-[var(--color-white)]">
          Kontakt
        </h2>
        <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2 md:items-start">
          {/* Formularz kontaktowy – na mobile jako pierwszy */}
          <div className="order-1 md:order-2">
            <h3 className="text-xl font-light mb-4 text-[var(--color-white)]">
              Napisz wiadomość
            </h3>
            <form
              onSubmit={handleContactSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-light mb-1 text-[var(--color-white)]"
                >
                  Imię i nazwisko
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-transparent border border-[var(--color-white)]/40 rounded-md text-sm font-light text-[var(--color-white)] placeholder:text-[var(--color-white)]/40 focus:outline-none focus:border-[var(--color-accent)]"
                  placeholder="Jan Kowalski"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-light mb-1 text-[var(--color-white)]"
                >
                  Adres e-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-transparent border border-[var(--color-white)]/40 rounded-md text-sm font-light text-[var(--color-white)] placeholder:text-[var(--color-white)]/40 focus:outline-none focus:border-[var(--color-accent)]"
                  placeholder="nazwa@firma.pl"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-light mb-1 text-[var(--color-white)]"
                >
                  Temat
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="w-full px-3 py-2 bg-transparent border border-[var(--color-white)]/40 rounded-md text-sm font-light text-[var(--color-white)] placeholder:text-[var(--color-white)]/40 focus:outline-none focus:border-[var(--color-accent)]"
                  placeholder="Krótko opisz sprawę"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-light mb-1 text-[var(--color-white)]"
                >
                  Wiadomość
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-3 py-2 bg-transparent border border-[var(--color-white)]/40 rounded-md text-sm font-light text-[var(--color-white)] placeholder:text-[var(--color-white)]/40 focus:outline-none focus:border-[var(--color-accent)] resize-none"
                  placeholder="Opisz proszę swoją sprawę lub zadaj pytanie."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--color-accent)] text-[var(--color-black)] text-sm font-light rounded-md hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
              </button>

              {submitStatus === "success" && (
                <p className="text-sm text-green-400 font-light">
                  Dziękuję, wiadomość została wysłana.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-sm text-red-400 font-light">
                  Wystąpił problem z wysyłką. Spróbuj proszę ponownie lub skontaktuj się bezpośrednio mailem.
                </p>
              )}
            </form>
          </div>

          {/* Dane kontaktowe – na mobile pod formularzem */}
          <div className="order-2 md:order-1">
            <div className="space-y-6 text-left">
              <div>
                <p className="text-lg text-[var(--color-white)] font-light mb-1">
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
                <p className="text-lg text-[var(--color-white)] font-light mb-1">
                  Email
                </p>
                <a
                  href="mailto:j.szypniewska@sjkancelaria.pl"
                  className="text-[var(--color-white)] hover:text-[var(--color-accent)] transition-colors font-light break-all"
                >
                  j.szypniewska@sjkancelaria.pl
                </a>
              </div>

              <div>
                <p className="text-lg text-[var(--color-white)] font-light mb-2">
                  Gdzie pracuję
                </p>
                <p className="text-sm text-[var(--color-white)] font-light mb-3">
                  Stacjonarnie w Trójmieście, zdalnie w całej Polsce.
                </p>
                <div className="space-y-2 text-sm text-[var(--color-white)] font-light">
                  <p>ul. Do Studzienki 63, 80-227 Gdańsk</p>
                  <p>ul. Wolności 18C/3, 81-327 Gdynia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
