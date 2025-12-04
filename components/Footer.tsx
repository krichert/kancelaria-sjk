import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-black)] text-[var(--color-white)] mt-auto border-t border-[var(--color-white)]">
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
                <Link href="/" className="text-[var(--color-white)] opacity-75 hover:text-[var(--color-accent)] transition-colors font-light">
                  Strona główna
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[var(--color-white)] opacity-75 hover:text-[var(--color-accent)] transition-colors font-light">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#kontakt" className="text-[var(--color-white)] opacity-75 hover:text-[var(--color-accent)] transition-colors font-light">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-light mb-4">Kontakt</h4>
            <p className="text-[var(--color-white)] opacity-75 font-light">
              Email: j.szypniewska@sjkancelaria.pl<br />
              Telefon: 517192750
            </p>
          </div>
        </div>
        
        <div className="border-t border-[var(--color-white)] mt-8 pt-8 text-center text-[var(--color-white)] opacity-50 font-light">
          <p>&copy; {new Date().getFullYear()} Kancelaria SJK. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  )
}

