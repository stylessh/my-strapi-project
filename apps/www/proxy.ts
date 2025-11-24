import { NextRequest, NextResponse } from "next/server";

const FRAME_ANCESTORS_WHITELIST = [process.env.NEXT_PUBLIC_STRAPI_URL];

const FRAME_ANCESTORS_HEADER = FRAME_ANCESTORS_WHITELIST.join(" ");

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    frame-ancestors ${FRAME_ANCESTORS_HEADER};
    upgrade-insecure-requests;
`;

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  return response;
}
