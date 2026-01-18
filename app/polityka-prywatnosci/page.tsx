export const metadata = {
  title: "Polityka prywatności - Kancelaria SJK",
  description: "Polityka prywatności Kancelarii SJK",
};

export default function PolitykaPrywatnosci() {
  return (
    <div className="bg-[var(--color-black)] text-[var(--color-white)] min-h-screen">
      <section className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-light mb-8 text-center">
          Polityka prywatności
        </h1>

        <div className="space-y-6 text-base leading-relaxed font-light">
          <div>
            <h2 className="text-xl font-light mb-4 mt-8">
              1. Postanowienia ogólne
            </h2>
            <p className="opacity-90">
              Niniejsza Polityka prywatności określa zasady przetwarzania i
              ochrony danych osobowych przekazanych przez Użytkowników w
              związku z korzystaniem przez nich z usług oferowanych przez
              Kancelarię SJK.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-light mb-4 mt-8">
              2. Administrator danych
            </h2>
            <p className="opacity-90">
              Administratorem danych osobowych jest Kancelaria SJK z siedzibą
              w Wrocławiu, ul. Rynek 13/1, 33-332 Wrocław.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-light mb-4 mt-8">
              3. Podstawa prawna przetwarzania danych
            </h2>
            <p className="opacity-90">
              Dane osobowe przetwarzane są na podstawie:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 opacity-90 ml-4">
              <li>
                Zgody osoby, której dane dotyczą (art. 6 ust. 1 lit. a RODO)
              </li>
              <li>
                Wykonania umowy lub podjęcia działań przed zawarciem umowy (art.
                6 ust. 1 lit. b RODO)
              </li>
              <li>
                Prawnego obowiązku administratora (art. 6 ust. 1 lit. c RODO)
              </li>
              <li>
                Prawnie uzasadnionego interesu administratora (art. 6 ust. 1
                lit. f RODO)
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-light mb-4 mt-8">
              4. Cel przetwarzania danych
            </h2>
            <p className="opacity-90">
              Dane osobowe przetwarzane są w celach:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 opacity-90 ml-4">
              <li>Świadczenia usług prawnych</li>
              <li>Kontaktu z klientami</li>
              <li>Prowadzenia dokumentacji prawnej</li>
              <li>Wypełnienia obowiązków prawnych</li>
              <li>Marketingowych (za zgodą)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-light mb-4 mt-8">
              5. Prawa osób, których dane dotyczą
            </h2>
            <p className="opacity-90">
              Osoba, której dane dotyczą, ma prawo do:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 opacity-90 ml-4">
              <li>Dostępu do swoich danych osobowych</li>
              <li>Sprostowania (poprawiania) danych</li>
              <li>Usunięcia danych</li>
              <li>Ograniczenia przetwarzania</li>
              <li>Przenoszenia danych</li>
              <li>Wniesienia sprzeciwu wobec przetwarzania</li>
              <li>Cofnięcia zgody w dowolnym momencie</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-light mb-4 mt-8">
              6. Okres przechowywania danych
            </h2>
            <p className="opacity-90">
              Dane osobowe będą przechowywane przez okres niezbędny do
              realizacji celów, dla których zostały zebrane, oraz zgodnie z
              obowiązującymi przepisami prawa, w szczególności przepisami
              dotyczącymi archiwizacji dokumentów.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-light mb-4 mt-8">
              7. Przekazywanie danych
            </h2>
            <p className="opacity-90">
              Dane osobowe mogą być przekazywane zaufanym partnerom, którzy
              wspierają nas w świadczeniu usług, oraz organom uprawnionym na
              podstawie przepisów prawa.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-light mb-4 mt-8">
              8. Pliki cookies
            </h2>
            <p className="opacity-90">
              Strona wykorzystuje pliki cookies w celu zapewnienia prawidłowego
              działania serwisu oraz w celach analitycznych. Użytkownik może
              w każdej chwili zmienić ustawienia dotyczące plików cookies w
              swojej przeglądarce.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-light mb-4 mt-8">
              9. Kontakt
            </h2>
            <p className="opacity-90">
              W sprawach związanych z ochroną danych osobowych można się
              kontaktować pod adresem e-mail: j.szypniewska@sjkancelaria.pl lub
              telefonicznie: 517 192 750.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--color-white)] border-opacity-20">
            <p className="text-sm opacity-75">
              Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
