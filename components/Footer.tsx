import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="kontakt"
      className="bg-[var(--color-black)] text-[var(--color-white)] mt-8"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-light mb-4">Kancelaria SJK</h3>
            <p className="text-[var(--color-white)] opacity-75 font-light">
              Profesjonalne usługi prawne
            </p>
          </div>

          <div>
            <h4 className="text-lg font-light mb-4">Linki</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-[var(--color-white)] opacity-75 hover:text-[var(--color-accent)] transition-colors font-light"
                >
                  Strona główna
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[var(--color-white)] opacity-75 hover:text-[var(--color-accent)] transition-colors font-light"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/polityka-prywatnosci"
                  className="text-[var(--color-white)] opacity-75 hover:text-[var(--color-accent)] transition-colors font-light"
                >
                  Polityka prywatności
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-light mb-4">Kontakt</h4>
            <ul className="space-y-2">
              <li className="text-[var(--color-white)] opacity-75 hover:text-[var(--color-accent)] transition-colors font-light">
                j.szypniewska@sjkancelaria.pl
              </li>
              <li className="text-[var(--color-white)] opacity-75 hover:text-[var(--color-accent)] transition-colors font-light">
                517 192 750
              </li>
              <li className="text-[var(--color-white)] opacity-75 hover:text-[var(--color-accent)] transition-colors font-light">
                ul. Rynek 13/1, 33-332 Wrocław
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-white)] mt-8 pt-8 text-center text-[var(--color-white)] opacity-50 font-light">
          <p>
            &copy; {new Date().getFullYear()} Kancelaria SJK. Wszelkie prawa
            zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
