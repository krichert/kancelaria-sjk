import { EditPostForm } from '@/components/admin/EditPostForm'
import { blogPostIds, findPostById } from '@/lib/mockPosts'

interface EditPageProps {
  params: {
    id: string
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  return blogPostIds.map((id) => ({ id }))
}

export default function EditPostPage({ params }: EditPageProps) {
  const post = findPostById(params.id)

  return <EditPostForm postId={params.id} initialPost={post} />
}

