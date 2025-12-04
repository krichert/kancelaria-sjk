'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // W przyszłości: wywołanie API do zapisania posta
    try {
      // await fetch('/api/posts', { method: 'POST', body: JSON.stringify({...}) })
      
      // Tymczasowo przekierowanie
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    } catch (error) {
      console.error('Błąd podczas zapisywania posta:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link 
        href="/admin"
        className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
      >
        ← Powrót do panelu
      </Link>

      <h1 className="text-4xl font-bold mb-8">Nowy wpis na blogu</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Tytuł *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Wpisz tytuł..."
          />
        </div>

        <div className="mb-6">
          <label htmlFor="slug" className="block text-sm font-medium mb-2">
            Slug (URL) *
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="przykladowy-wpis"
          />
          <p className="text-sm text-gray-500 mt-1">
            Używaj małych liter, myślników zamiast spacji
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
            Krótki opis
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Krótki opis posta..."
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Treść *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={15}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            placeholder="Wpisz treść posta..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Obsługa HTML będzie dodana w przyszłości
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Zapisywanie...' : 'Zapisz wpis'}
          </button>
          <Link
            href="/admin"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition inline-block"
          >
            Anuluj
          </Link>
        </div>
      </form>
    </div>
  )
}

