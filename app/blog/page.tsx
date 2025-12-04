import Link from 'next/link'
import { mockPosts } from '@/lib/mockPosts'

export default async function BlogPage() {
  // W przyszłości: const posts = await fetchPosts()
  const posts = mockPosts

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">
                {new Date(post.date).toLocaleDateString('pl-PL')} • {post.author}
              </div>
              <h2 className="text-2xl font-semibold mb-3">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Czytaj więcej →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Brak postów na blogu. Sprawdź później!</p>
        </div>
      )}
    </div>
  )
}

