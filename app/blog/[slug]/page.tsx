import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { BlogPost } from '@/lib/types'
import { getPostBySlug, getPosts } from '@/lib/postsStore'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
    return [{ slug: 'test-slug' }];
  try {
    const posts = getPosts()
    if (!posts || posts.length === 0) {
      return []
    }

    return posts.map((post) => ({ slug: String(post.slug) }))
  } catch (error) {
    console.error('Błąd w generateStaticParams:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post: BlogPost | null = getPostBySlug(params.slug) ?? null

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl text-[var(--color-white)]">
      <Link 
        href="/blog"
        className="text-[var(--color-white)]/60 hover:text-[var(--color-accent)] mb-6 inline-block transition-colors"
      >
        ← Powrót do bloga
      </Link>
      
      <header className="mb-8">
        <h1 className="text-4xl font-light mb-4">{post.title}</h1>
        <div className="text-[var(--color-white)]/60 text-sm font-light">
          <span>{new Date(post.date).toLocaleDateString('pl-PL')}</span>
          <span className="mx-2">•</span>
          <span>{post.author}</span>
        </div>
      </header>
      
      <div 
        className="max-w-none text-[var(--color-white)]/90 font-light leading-relaxed [&_p]:mb-4 [&_a]:text-[var(--color-accent)] [&_a]:underline [&_a:hover]:opacity-90 [&_blockquote]:italic [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-accent)] [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote]:text-[var(--color-white)]/80 [&_q]:italic [&_q]:before:content-['\201C'] [&_q]:after:content-['\201D']"
        dangerouslySetInnerHTML={{ __html: post.content.join('') }}
      />
    </article>
  )
}

