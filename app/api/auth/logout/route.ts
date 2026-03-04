import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST() {
  const cookieHeader = clearSessionCookie();
  
  const response = NextResponse.json({ success: true });
  response.headers.set("Set-Cookie", cookieHeader);

  return response;
}
