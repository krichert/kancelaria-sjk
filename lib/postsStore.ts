import type { BlogPost } from './mockPosts'

let posts: BlogPost[] = [];

let nextId = 1;

export function getPosts(): BlogPost[] {
    return posts;
}

export function getPostById(id: string): BlogPost | undefined {
    return posts.find((p) => p.id === id);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
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

function ensureUniqueSlug(baseSlug: string): string {
    let slug = baseSlug;
    let counter = 1;
    while (posts.some((p) => p.slug === slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }
    return slug;
}

export function createPost(data: Omit<BlogPost, "id" | "date" | "slug" | "author"> & { slug?: string; author?: string }): BlogPost {
    const baseSlug = data.slug || generateSlug(data.title);
    const uniqueSlug = ensureUniqueSlug(baseSlug);

    const newPost: BlogPost = {
        id: String(nextId++),
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        date: formatDate(new Date()),
        author: data.author || 'Kancelaria SJK',
        slug: uniqueSlug,
    };

    posts = [...posts, newPost];
    return newPost;
}

export function updatePost(
    id: string,
    data: Partial<Omit<BlogPost, "id">>
): BlogPost | undefined {
    const existing = getPostById(id);
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

    posts = posts.map((p) => (p.id === id ? updated : p));
    return updated;
}

export function deletePost(id: string): boolean {
    const beforeLength = posts.length;
    posts = posts.filter((p) => p.id !== id);
    return posts.length < beforeLength;
}

