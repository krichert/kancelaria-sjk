import Link from 'next/link'
import { mockPosts } from '@/lib/mockPosts'

export default function AdminPanel() {
  // W przyszłości: const posts = await fetchPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Panel zarządzania</h1>
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          + Nowy wpis
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold">Wpisy na blogu</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {mockPosts.map((post) => (
            <div
              key={post.id}
              className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(post.date).toLocaleDateString('pl-PL')}
                </p>
              </div>
              
              <div className="flex gap-3">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Edytuj
                </Link>
                <button className="text-red-600 hover:text-red-700 font-semibold">
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mockPosts.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Brak wpisów na blogu.</p>
          <Link
            href="/admin/posts/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
          >
            Utwórz pierwszy wpis
          </Link>
        </div>
      )}
    </div>
  )
}

