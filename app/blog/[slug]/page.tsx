import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BlogPost {
  id: string
  title: string
  content: string
  date: string
  author: string
  slug: string
}

// To będzie zastąpione danymi z API/bazy danych
const mockPost: BlogPost = {
  id: '1',
  title: 'Pierwszy wpis na blogu',
  content: `
    <p>To jest przykładowy wpis na blogu. W przyszłości treść będzie przechowywana w bazie danych 
    i możliwa do edycji w panelu admin.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquip ex ea commodo consequat.</p>
  `,
  date: '2024-01-15',
  author: 'Admin',
  slug: 'pierwszy-wpis'
}

interface PageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  // W przyszłości: const post = await fetchPostBySlug(params.slug)
  const post = mockPost.slug === params.slug ? mockPost : null

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link 
        href="/blog"
        className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
      >
        ← Powrót do bloga
      </Link>
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600">
          <span>{new Date(post.date).toLocaleDateString('pl-PL')}</span>
          <span className="mx-2">•</span>
          <span>{post.author}</span>
        </div>
      </header>
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}

