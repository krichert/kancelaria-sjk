"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { BlogPost } from "@/lib/mockPosts";

interface EditPostFormProps {
  postId: string;
  initialPost?: BlogPost;
}

export function EditPostForm({ postId, initialPost }: EditPostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [content, setContent] = useState(initialPost?.content ?? "");
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

    // W przyszłości: wywołanie API do aktualizacji posta
    try {
      // await fetch(`/api/posts/${postId}`, { method: 'PUT', body: JSON.stringify({...}) })
      setTimeout(() => {
        router.push("/admin");
      }, 500);
    } catch (error) {
      console.error("Błąd podczas aktualizacji posta:", error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p>Ładowanie...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link
        href="/admin"
        className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
      >
        ← Powrót do panelu
      </Link>

      <h1 className="text-4xl font-bold mb-2">Edytuj wpis</h1>
      <p className="text-sm text-gray-500 mb-8">ID wpisu: {postId}</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
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
          />
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
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Zapisywanie..." : "Zapisz zmiany"}
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
  );
}
