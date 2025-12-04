import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPostSlugs, findPostBySlug } from '@/lib/mockPosts'

interface PageProps {
  params: {
    slug: string
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  return blogPostSlugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: PageProps) {
  // W przyszłości: const post = await fetchPostBySlug(params.slug)
  const post = findPostBySlug(params.slug) ?? null

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

