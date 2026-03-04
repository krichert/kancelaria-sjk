import { NextRequest, NextResponse } from "next/server";
import { createPost, getPosts } from "@/lib/postsStore";
import { checkAuth } from "@/lib/auth";

export async function GET() {
    const posts = getPosts();
    return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
    // Sprawdzenie autentykacji
    const authCheck = checkAuth(req);
    if (!authCheck.authenticated) {
        return NextResponse.json(
            { error: "Brak autoryzacji. Zaloguj się, aby kontynuować." },
            { status: 401 }
        );
    }

    try {
        const body = await req.json();
        const { title, excerpt, content, slug, author } = body as {
            title?: unknown;
            excerpt?: unknown;
            content?: unknown;
            slug?: unknown;
            author?: unknown;
        };

        if (typeof title !== "string" || typeof excerpt !== "string") {
            return NextResponse.json(
                { error: "Brak wymaganych pól (title, excerpt)." },
                { status: 400 }
            );
        }

        if (!Array.isArray(content) || content.length === 0) {
            return NextResponse.json(
                { error: "Pole content musi być tablicą z co najmniej jednym elementem." },
                { status: 400 }
            );
        }

        const normalizedContent = content.map((item) => String(item));

        const post = createPost({
            title,
            excerpt,
            content: normalizedContent,
            slug: typeof slug === "string" ? slug : undefined,
            author: typeof author === "string" ? author : undefined,
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

