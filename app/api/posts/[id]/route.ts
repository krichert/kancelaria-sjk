import { NextRequest, NextResponse } from "next/server";
import { deletePost, getPostById, updatePost } from "@/lib/postsStore";

interface RouteParams {
    params: {
        id: string;
    };
}

export async function GET(_: NextRequest, { params }: RouteParams) {
    const id = params.id;

    const post = getPostById(id);
    if (!post) {
        return NextResponse.json({ error: "Post nie znaleziony." }, { status: 404 });
    }

    return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
    try {
        const id = params.id;

        const existing = getPostById(id);
        if (!existing) {
            return NextResponse.json(
                { error: "Post nie znaleziony." },
                { status: 404 }
            );
        }

        const body = await req.json();
        const { title, excerpt, content, slug, author } = body;

        const updatedData: {
            title?: string;
            excerpt?: string;
            content?: string;
            slug?: string;
            author?: string;
        } = {};

        if (typeof title === "string") {
            updatedData.title = title;
        }
        if (typeof excerpt === "string") {
            updatedData.excerpt = excerpt;
        }
        if (typeof content === "string") {
            updatedData.content = content;
        }
        if (typeof slug === "string") {
            updatedData.slug = slug;
        }
        if (typeof author === "string") {
            updatedData.author = author;
        }

        const updated = updatePost(id, updatedData);
        if (!updated) {
            return NextResponse.json(
                { error: "Nie udało się zaktualizować posta." },
                { status: 500 }
            );
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Błąd PUT /api/posts/[id]:", error);
        return NextResponse.json(
            { error: "Wystąpił błąd serwera." },
            { status: 500 }
        );
    }
}

export async function DELETE(_: NextRequest, { params }: RouteParams) {
    const id = params.id;

    const success = deletePost(id);
    if (!success) {
        return NextResponse.json({ error: "Post nie znaleziony." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
}

