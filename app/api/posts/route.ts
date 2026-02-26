import { NextRequest, NextResponse } from "next/server";
import { createPost, getPosts } from "@/lib/postsStore";

export async function GET() {
  const posts = getPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, excerpt, content, slug, author } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: "Brak wymaganych pól (title, excerpt, content)." },
        { status: 400 }
      );
    }

    const post = createPost({
      title: String(title),
      excerpt: String(excerpt),
      content: String(content),
      slug: slug ? String(slug) : undefined,
      author: author ? String(author) : undefined,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Błąd POST /api/posts:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera." },
      { status: 500 }
    );
  }
}

