'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [slug, setSlug] = useState('')
  const [paragraphs, setParagraphs] = useState<string[]>([''])
  const [footer, setFooter] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleParagraphChange = (index: number, value: string) => {
    setParagraphs((prev) => {
      const copy = [...prev]
      copy[index] = value
      return copy
    })
  }

  const handleAddParagraph = () => {
    setParagraphs((prev) => [...prev, ''])
  }

  const handleRemoveParagraph = (index: number) => {
    setParagraphs((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const trimmedParagraphs = paragraphs
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
      
      if (trimmedParagraphs.length === 0) {
        throw new Error('Co najmniej jeden akapit musi zawierać treść.')
      }

      // Każdy akapit jako osobny element z <p>
      const content = trimmedParagraphs.map((p) => `<p>${p}</p>`)

      if (footer.trim()) {
        content.push(
          `<p style="text-align:right;font-style:italic;margin-top:2rem;">${footer.trim()}</p>`
        )
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          excerpt,
          slug: slug.trim() || undefined,
          content,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Błąd podczas zapisywania posta.')
      }

      router.push('/blog')
    } catch (err) {
      console.error('Błąd podczas zapisywania posta:', err)
      setError(
        err instanceof Error ? err.message : 'Wystąpił nieznany błąd.'
      )
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[var(--color-black)] text-[var(--color-white)] min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/admin"
          className="text-[var(--color-white)]/60 hover:text-[var(--color-accent)] mb-6 inline-block transition-colors"
        >
          ← Powrót do panelu
        </Link>

        <h1 className="text-4xl font-light mb-8 text-[var(--color-white)]">Nowy post</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[var(--color-black)] border border-[var(--color-white)]/20 rounded-lg shadow-[0_0_18px_rgba(237,237,237,0.12)] p-6 space-y-6"
        >
          <div>
            <label htmlFor="title" className="block text-sm font-light mb-2 text-[var(--color-white)]">
              Tytuł *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 bg-transparent border border-[var(--color-white)]/40 rounded-md text-sm font-light text-[var(--color-white)] placeholder:text-[var(--color-white)]/40 focus:outline-none focus:border-[var(--color-accent)]"
              placeholder="Wpisz tytuł..."
            />
          </div>

          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-light mb-2 text-[var(--color-white)]"
            >
              Opis (wyświetlany na liście) *
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              rows={3}
              className="w-full px-4 py-2 bg-transparent border border-[var(--color-white)]/40 rounded-md text-sm font-light text-[var(--color-white)] placeholder:text-[var(--color-white)]/40 focus:outline-none focus:border-[var(--color-accent)] resize-none"
              placeholder="Krótki opis posta..."
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-light mb-2 text-[var(--color-white)]"
            >
              Slug (URL) – opcjonalny
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-[var(--color-white)]/40 rounded-md text-sm font-light text-[var(--color-white)] placeholder:text-[var(--color-white)]/40 focus:outline-none focus:border-[var(--color-accent)]"
              placeholder="np. jak-pracujemy (gdy puste, zostanie wygenerowany z tytułu)"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-light text-[var(--color-white)]">
                Akapity (treść posta) *
              </label>
              <button
                type="button"
                onClick={handleAddParagraph}
                className="text-sm text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors"
              >
                + Dodaj akapit
              </button>
            </div>

            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-[var(--color-white)]/60">
                      Akapit {index + 1}
                    </label>
                    {paragraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveParagraph(index)}
                        className="text-xs text-[var(--color-white)]/60 hover:text-red-400 transition-colors"
                      >
                        Usuń
                      </button>
                    )}
                  </div>
                  <textarea
                    value={paragraph}
                    onChange={(e) =>
                      handleParagraphChange(index, e.target.value)
                    }
                    required={index === 0}
                    rows={3}
                    className="w-full px-4 py-2 bg-transparent border border-[var(--color-white)]/40 rounded-md text-sm font-light text-[var(--color-white)] placeholder:text-[var(--color-white)]/40 focus:outline-none focus:border-[var(--color-accent)] resize-none"
                    placeholder="Treść akapitu..."
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="footer" className="block text-sm font-light mb-2 text-[var(--color-white)]">
              Footer (opcjonalny, na końcu posta)
            </label>
            <input
              type="text"
              id="footer"
              value={footer}
              onChange={(e) => setFooter(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-[var(--color-white)]/40 rounded-md text-sm font-light text-[var(--color-white)] placeholder:text-[var(--color-white)]/40 focus:outline-none focus:border-[var(--color-accent)]"
              placeholder="Np. imię i nazwisko lub podsumowanie"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--color-accent)] text-[var(--color-black)] px-6 py-3 rounded-md hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-light"
            >
              {isSubmitting ? 'Zapisywanie...' : 'Zapisz post'}
            </button>
            <Link
              href="/admin"
              className="bg-transparent border border-[var(--color-white)]/40 text-[var(--color-white)] px-6 py-3 rounded-md hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors inline-block font-light"
            >
              Anuluj
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

