import type { BlogPost } from "./types";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const POSTS_FILE = join(process.cwd(), "lib", "posts.json");

const MOCK_POSTS = [
    {
        id: "1",
        title: "Witaj na blogu",
        excerpt: "Witaj na blogu",
        content: ["<p>Witaj na blogu</p>", "<p>To jest testowy post</p>"],
        date: "2026-03-04",
        author: "Kancelaria SJK",
        slug: "test-slug",
    },
];

function loadPosts(): BlogPost[] {
    try {
        const data = readFileSync(POSTS_FILE, "utf-8");
        const posts = JSON.parse(data) as BlogPost[];
        return Array.isArray(posts) ? posts : [];
    } catch (error) {
        // Jeśli plik nie istnieje lub jest pusty, zwróć pustą tablicę
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
            return [];
        }
        console.error("Błąd podczas wczytywania postów:", error);
        return [];
    }
}

function savePosts(posts: BlogPost[]): void {
    try {
        writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8");
    } catch (error) {
        console.error("Błąd podczas zapisywania postów:", error);
        throw new Error("Nie udało się zapisać postów do pliku");
    }
}

function getNextId(posts: BlogPost[]): number {
    if (posts.length === 0) return 1;
    const maxId = Math.max(...posts.map((p) => parseInt(p.id, 10) || 0));
    return maxId + 1;
}

export function getPosts(): BlogPost[] {
    return MOCK_POSTS; // TODO change
}

export function getPostById(id: string): BlogPost | undefined {
    const posts = loadPosts();
    return posts.find((p) => p.id === id);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
    const posts = loadPosts();
    return posts.find((p) => p.slug === slug);
}

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Usuń znaki diakrytyczne
        .replace(/[^a-z0-9\s-]/g, "") // Usuń znaki specjalne
        .trim()
        .replace(/\s+/g, "-") // Zamień spacje na myślniki
        .replace(/-+/g, "-") // Usuń podwójne myślniki
        .replace(/^-|-$/g, ""); // Usuń myślniki na początku i końcu
}

function ensureUniqueSlug(baseSlug: string, posts: BlogPost[]): string {
    let slug = baseSlug;
    let counter = 1;
    while (posts.some((p) => p.slug === slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }
    return slug;
}

export function createPost(data: Omit<BlogPost, "id" | "date" | "slug" | "author"> & { slug?: string; author?: string }): BlogPost {
    const posts = loadPosts();
    const baseSlug = data.slug || generateSlug(data.title);
    const uniqueSlug = ensureUniqueSlug(baseSlug, posts);
    const nextId = getNextId(posts);

    const newPost: BlogPost = {
        id: String(nextId),
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        date: formatDate(new Date()),
        author: data.author || 'Kancelaria SJK',
        slug: uniqueSlug,
    };

    const updatedPosts = [...posts, newPost];
    savePosts(updatedPosts);
    return newPost;
}

export function updatePost(
    id: string,
    data: Partial<Omit<BlogPost, "id">>
): BlogPost | undefined {
    const posts = loadPosts();
    const existing = posts.find((p) => p.id === id);
    if (!existing) return undefined;

    let updatedData = { ...data };

    // Jeśli slug jest zmieniany, upewnij się że jest unikalny (z wykluczeniem aktualnego posta)
    if (data.slug && data.slug !== existing.slug) {
        let slug = data.slug;
        let counter = 1;
        while (posts.some((p) => p.id !== id && p.slug === slug)) {
            slug = `${data.slug}-${counter}`;
            counter++;
        }
        updatedData = { ...updatedData, slug };
    }

    const updated: BlogPost = {
        ...existing,
        ...updatedData,
    };

    const updatedPosts = posts.map((p) => (p.id === id ? updated : p));
    savePosts(updatedPosts);
    return updated;
}

export function deletePost(id: string): boolean {
    const posts = loadPosts();
    const beforeLength = posts.length;
    const updatedPosts = posts.filter((p) => p.id !== id);

    if (updatedPosts.length < beforeLength) {
        savePosts(updatedPosts);
        return true;
    }
    return false;
}
