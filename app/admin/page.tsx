import Link from 'next/link'
import { getPosts } from '@/lib/postsStore'
import LogoutButton from '@/components/admin/LogoutButton'

export default function AdminPanel() {
  const allPosts = getPosts()

  return (
    <div className="container mx-auto px-4 py-12 text-[var(--color-white)]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-light">Panel zarządzania</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/posts/new"
            className="px-6 py-3 rounded-lg border border-[var(--color-white)]/40 text-sm font-light hover:bg-[var(--color-white)] hover:text-[var(--color-black)] transition-colors"
          >
            + Nowy wpis
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="bg-[var(--color-black)] rounded-lg border border-[var(--color-white)]/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-white)]/10">
          <h2 className="text-2xl font-light">Wpisy na blogu</h2>
        </div>
        
        <div className="divide-y divide-[var(--color-white)]/10">
          {allPosts.map((post) => (
            <div
              key={post.id}
              className="px-6 py-4 flex justify-between items-center hover:bg-[var(--color-black)]/80 transition-colors"
            >
              <div>
                <h3 className="text-lg font-light">{post.title}</h3>
                <p className="text-xs text-[var(--color-white)]/60">
                  {new Date(post.date).toLocaleDateString('pl-PL')}
                </p>
              </div>
              
              <div className="flex gap-3 text-sm">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-[var(--color-white)]/80 hover:text-[var(--color-accent)] transition-colors"
                >
                  Edytuj
                </Link>
                <button className="text-red-500 hover:text-red-400 transition-colors">
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {allPosts.length === 0 && (
        <div className="mt-8 bg-[var(--color-black)] rounded-lg border border-[var(--color-white)]/10 p-12 text-center">
          <p className="text-[var(--color-white)]/70 text-lg mb-4">
            Brak wpisów na blogu.
          </p>
          <Link
            href="/admin/posts/new"
            className="px-6 py-3 rounded-lg border border-[var(--color-white)]/40 text-sm font-light hover:bg-[var(--color-white)] hover:text-[var(--color-black)] transition-colors inline-block"
          >
            Utwórz pierwszy wpis
          </Link>
        </div>
      )}
    </div>
  )
}

