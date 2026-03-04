// import { NextRequest, NextResponse } from "next/server";
// import { checkAuth } from "@/lib/auth";

// export async function GET(req: NextRequest) {
//     const { authenticated } = checkAuth(req);

//     if (!authenticated) {
//         return NextResponse.json(
//             { authenticated: false },
//             { status: 401 }
//         );
//     }

//     return NextResponse.json({ authenticated: true });
// }

import { NextResponse } from "next/server";

export async function GET() {

    return NextResponse.json({ authenticated: true });
}
