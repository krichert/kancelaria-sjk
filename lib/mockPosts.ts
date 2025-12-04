export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  slug: string
}

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Pierwszy wpis na blogu',
    excerpt:
      'To jest przykładowy wpis na blogu, który pokazuje jak będzie wyglądać lista postów...',
    content: `
      <p>To jest przykładowy wpis na blogu. W przyszłości treść będzie przechowywana w bazie danych 
      i możliwa do edycji w panelu admin.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
      laboris nisi ut aliquip ex ea commodo consequat.</p>
    `,
    date: '2024-01-15',
    author: 'Admin',
    slug: 'pierwszy-wpis',
  },
  {
    id: '2',
    title: 'Drugi wpis na blogu',
    excerpt:
      'Kolejny przykładowy wpis, który można będzie edytować w panelu admin...',
    content: `
      <p>To jest drugi przykładowy wpis pokazujący jak będą wyglądały kolejne publikacje na blogu.</p>
      <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Praesent sapien massa, 
      convallis a pellentesque nec, egestas non nisi.</p>
    `,
    date: '2024-01-20',
    author: 'Admin',
    slug: 'drugi-wpis',
  },
]

export const blogPostSlugs = mockPosts.map((post) => post.slug)
export const blogPostIds = mockPosts.map((post) => post.id)

export const findPostBySlug = (slug: string) =>
  mockPosts.find((post) => post.slug === slug)

export const findPostById = (id: string) => mockPosts.find((post) => post.id === id)

