import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  response.headers.set(
    "Content-Security-Policy",
    `frame-ancestors 'self' ${strapiUrl};`
  );

  return response;
}

export const config = {
  matcher: "/:path*",
};
