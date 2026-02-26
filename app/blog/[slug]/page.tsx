import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPostSlugs, findPostBySlug, type BlogPost } from '@/lib/mockPosts'
import { getPostBySlug } from '@/lib/postsStore'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    // Pobierz slugi z mockPosts
    const mockSlugs = blogPostSlugs.map((slug) => ({ slug: String(slug) }));

    if (!mockSlugs || mockSlugs.length === 0) {
      return [];
    }

    // W trybie statycznego eksportu (output: 'export') API routes nie działają w czasie builda,
    // więc zwracamy tylko slugi z mockPosts. Posty z API będą dostępne w runtime.
    return mockSlugs;
  } catch (error) {
    console.error('Błąd w generateStaticParams:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  // Sprawdź najpierw w mockPosts, potem w postsStore
  let post: BlogPost | null = findPostBySlug(params.slug) ?? null
  
  if (!post) {
    // Jeśli nie znaleziono w mockPosts, sprawdź w postsStore
    post = getPostBySlug(params.slug) ?? null
  }

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
        className="max-w-none text-[var(--color-white)]/90 font-light leading-relaxed [&_p]:mb-4 [&_a]:text-[var(--color-accent)] [&_a]:underline [&_a:hover]:opacity-90"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}

