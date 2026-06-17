import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it } from "vitest";
import { _clearStore, config, proxy } from "@/proxy";

function makeRequest(ip?: string) {
  const headers: Record<string, string> = {};
  if (ip) headers["x-forwarded-for"] = ip;
  return new NextRequest("https://example.com/api/resume", { headers });
}

describe("config.matcher", () => {
  it("matches /api/resume", () => {
    expect(unstable_doesMiddlewareMatch({ config, url: "/api/resume" })).toBe(
      true,
    );
  });

  it("does not match /", () => {
    expect(unstable_doesMiddlewareMatch({ config, url: "/" })).toBe(false);
  });

  it("does not match /themed", () => {
    expect(unstable_doesMiddlewareMatch({ config, url: "/themed" })).toBe(
      false,
    );
  });
});

describe("proxy", () => {
  beforeEach(() => {
    _clearStore();
  });

  it("passes through requests within the rate limit", () => {
    for (let i = 0; i < 10; i++) {
      const res = proxy(makeRequest("1.2.3.4"));
      expect(res.status).not.toBe(429);
    }
  });

  it("returns 429 when rate limit is exceeded", () => {
    for (let i = 0; i < 10; i++) {
      proxy(makeRequest("2.3.4.5"));
    }
    const res = proxy(makeRequest("2.3.4.5"));
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeDefined();
  });

  it("tracks different IPs independently", () => {
    for (let i = 0; i < 10; i++) {
      proxy(makeRequest("3.4.5.6"));
    }
    const res = proxy(makeRequest("4.5.6.7"));
    expect(res.status).not.toBe(429);
  });

  it("uses 'anonymous' when x-forwarded-for header is missing", () => {
    for (let i = 0; i < 10; i++) {
      const res = proxy(makeRequest());
      expect(res.status).not.toBe(429);
    }
    const res = proxy(makeRequest());
    expect(res.status).toBe(429);
  });

  it("treats different x-forwarded-for values as different IPs", () => {
    for (let i = 0; i < 5; i++) {
      proxy(makeRequest("5.6.7.8"));
    }
    proxy(makeRequest("6.7.8.9"));
    const res = proxy(makeRequest("5.6.7.8"));
    expect(res.status).not.toBe(429);
  });
});
