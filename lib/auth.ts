import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "default-secret-change-in-production";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Tworzenie tokenu sesji
export function createSession(): string {
    const timestamp = Date.now();
    const token = Buffer.from(`${timestamp}-${SESSION_SECRET}`).toString("base64");
    return token;
}

// Weryfikacja tokenu sesji
export function verifySession(token: string): boolean {
    try {
        const decoded = Buffer.from(token, "base64").toString();
        const [timestamp] = decoded.split("-");
        const sessionTime = parseInt(timestamp, 10);
        const now = Date.now();

        // Sesja ważna przez 24 godziny
        const SESSION_DURATION = 24 * 60 * 60 * 1000;
        return now - sessionTime < SESSION_DURATION;
    } catch {
        return false;
    }
}

// Weryfikacja hasła
export function verifyPassword(password: string): boolean {
    return password === ADMIN_PASSWORD;
}

// Sprawdzenie czy użytkownik jest zalogowany (dla Server Components)
export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
        return false;
    }

    return verifySession(sessionToken);
}

// Sprawdzenie autentykacji w API routes
export function checkAuth(request: NextRequest): { authenticated: boolean; error?: string } {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
        return { authenticated: false, error: "Brak sesji" };
    }

    if (!verifySession(sessionToken)) {
        return { authenticated: false, error: "Sesja wygasła" };
    }

    return { authenticated: true };
}

// Ustawienie cookie sesji
export function setSessionCookie(token: string): string {
    return `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${24 * 60 * 60}`;
}

// Usunięcie cookie sesji
export function clearSessionCookie(): string {
    return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
