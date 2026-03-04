import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSession, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { error: "Hasło jest wymagane." },
        { status: 400 }
      );
    }

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: "Nieprawidłowe hasło." },
        { status: 401 }
      );
    }

    const sessionToken = createSession();
    const cookieHeader = setSessionCookie(sessionToken);

    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", cookieHeader);

    return response;
  } catch (error) {
    console.error("Błąd logowania:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera." },
      { status: 500 }
    );
  }
}
