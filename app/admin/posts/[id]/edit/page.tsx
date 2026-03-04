import { EditPostForm } from '@/components/admin/EditPostForm'
import { getPostById, getPosts } from '@/lib/postsStore'

interface EditPageProps {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  return [{ id: '1' }];
  const posts = getPosts()
  return posts.map((post) => ({ id: post.id }))
}

export default function EditPostPage({ params }: EditPageProps) {
  const post = getPostById(params.id)

  return <EditPostForm postId={params.id} initialPost={post} />
}

