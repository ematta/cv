import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

const store = new Map<string, { count: number; resetTime: number }>();

export function proxy(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous";

  const now = Date.now();
  const entry = store.get(ip);

  if (entry && now < entry.resetTime && entry.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return new Response("Too many requests", {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    });
  }

  if (entry && now < entry.resetTime) {
    entry.count++;
  } else {
    store.set(ip, { count: 1, resetTime: now + WINDOW_MS });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/resume",
};
