import Link from 'next/link'
import type { BlogPost } from '@/lib/types'
import { getPosts } from '@/lib/postsStore'

export default async function BlogPage() {
  const posts: BlogPost[] = getPosts()

  return (
    <div className="container mx-auto px-4 py-12 text-[var(--color-white)]">
      <h1 className="text-4xl font-light mb-8">Blog</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-[var(--color-black)] rounded-lg shadow-[0_0_18px_rgba(237,237,237,0.12)] overflow-hidden transition-transform duration-200 hover:-translate-y-1 h-full"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="text-xs text-[var(--color-white)]/60 mb-2">
                {new Date(post.date).toLocaleDateString('pl-PL')} • {post.author}
              </div>
              <h2 className="text-2xl font-light mb-3">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="hover:text-[var(--color-accent)] transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-[var(--color-white)]/80 mb-4">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-auto text-sm text-[var(--color-white)]/60 hover:text-[var(--color-accent)] transition-colors"
              >
                Czytaj więcej →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--color-white)]/70 text-lg">
            Brak postów na blogu. Sprawdź później!
          </p>
        </div>
      )}
    </div>
  )
}

