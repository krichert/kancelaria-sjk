"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

interface EditPostFormProps {
  postId: string;
  initialPost?: BlogPost;
}

export function EditPostForm({ postId, initialPost }: EditPostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [paragraphs, setParagraphs] = useState<string[]>(() => {
    if (!initialPost?.content || initialPost.content.length === 0) {
      return [""];
    }

    const stripParagraphHtml = (html: string) =>
      html
        .replace(/^<p[^>]*>/i, "")
        .replace(/<\/p>\s*$/i, "")
        .trim();

    let items = [...initialPost.content];

    // Jeśli ostatni akapit wygląda jak footer (wyrównanie do prawej), wyciągnij go osobno
    if (
      items.length > 0 &&
      /text-align\s*:\s*right/i.test(items[items.length - 1])
    ) {
      items = items.slice(0, -1);
    }

    const cleaned = items.map(stripParagraphHtml).filter((p) => p.length > 0);
    return cleaned.length > 0 ? cleaned : [""];
  });
  const [footer, setFooter] = useState<string>(() => {
    if (!initialPost?.content || initialPost.content.length === 0) {
      return "";
    }

    const last = initialPost.content[initialPost.content.length - 1];
    if (!/text-align\s*:\s*right/i.test(last)) {
      return "";
    }

    return last
      .replace(/^<p[^>]*>/i, "")
      .replace(/<\/p>\s*$/i, "")
      .trim();
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialPost);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!initialPost) {
      // W przyszłości: pobranie danych posta z API
      setIsLoading(false);
    }
  }, [initialPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const trimmedParagraphs = paragraphs
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      if (trimmedParagraphs.length === 0) {
        throw new Error("Co najmniej jeden akapit musi zawierać treść.");
      }

      const content = trimmedParagraphs.map((p) => `<p>${p}</p>`);

      if (footer.trim()) {
        content.push(
          `<p style="text-align:right;font-style:italic;margin-top:2rem;">${footer.trim()}</p>`
        );
      }

      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          excerpt,
          slug,
          content,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error || "Błąd podczas aktualizacji posta."
        );
      }

      router.push("/admin");
    } catch (error) {
      console.error("Błąd podczas aktualizacji posta:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Wystąpił nieznany błąd podczas zapisu."
      );
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[var(--color-black)] text-[var(--color-white)] min-h-screen">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <p className="text-center text-[var(--color-white)]">Ładowanie...</p>
        </div>
      </div>
    );
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

        <h1 className="text-4xl font-light mb-2 text-[var(--color-white)]">
          Edytuj wpis
        </h1>
        <p className="text-sm text-[var(--color-white)]/60 mb-8">
          ID wpisu: {postId}
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-[var(--color-black)] border border-[var(--color-white)]/20 rounded-lg shadow-[0_0_18px_rgba(237,237,237,0.12)] p-6"
        >
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-light mb-2 text-[var(--color-white)]"
            >
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

          <div className="mb-6">
            <label
              htmlFor="slug"
              className="block text-sm font-light mb-2 text-[var(--color-white)]"
            >
              Slug (URL) *
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full px-4 py-2 bg-transparent border border-[var(--color-white)]/40 rounded-md text-sm font-light text-[var(--color-white)] placeholder:text-[var(--color-white)]/40 focus:outline-none focus:border-[var(--color-accent)]"
              placeholder="np. jak-pracujemy"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="excerpt"
              className="block text-sm font-light mb-2 text-[var(--color-white)]"
            >
              Krótki opis
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-transparent border border-[var(--color-white)]/40 rounded-md text-sm font-light text-[var(--color-white)] placeholder:text-[var(--color-white)]/40 focus:outline-none focus:border-[var(--color-accent)] resize-none"
              placeholder="Krótki opis posta..."
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-light text-[var(--color-white)]">
                Akapity (treść posta) *
              </label>
              <button
                type="button"
                onClick={() => setParagraphs((prev) => [...prev, ""])}
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
                        onClick={() =>
                          setParagraphs((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="text-xs text-[var(--color-white)]/60 hover:text-red-400 transition-colors"
                      >
                        Usuń
                      </button>
                    )}
                  </div>
                  <textarea
                    value={paragraph}
                    onChange={(e) =>
                      setParagraphs((prev) => {
                        const copy = [...prev];
                        copy[index] = e.target.value;
                        return copy;
                      })
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

          <div className="mb-6">
            <label
              htmlFor="footer"
              className="block text-sm font-light mb-2 text-[var(--color-white)]"
            >
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

          {error && (
            <p className="text-sm text-red-400 mb-4">{error}</p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--color-accent)] text-[var(--color-black)] px-6 py-3 rounded-md hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-light"
            >
              {isSubmitting ? "Zapisywanie..." : "Zapisz zmiany"}
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
  );
}
