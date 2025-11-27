import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALES = ["en", "fr", "es", "de"] as const;
type Locale = typeof LOCALES[number];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip next internals, static files, API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/internal-api") ||
    pathname.match(/\.[^/]+$/)
  ) {
    return NextResponse.next();
  }

  const host = req.nextUrl.hostname || req.headers.get("host") || "";
  const [, maybeLocale, ...rest] = pathname.split("/");
  if (LOCALES.includes(maybeLocale as Locale)) {
    const locale = maybeLocale as Locale;
    const newPath = "/" + rest.join("/");
    const url = req.nextUrl.clone();
    url.pathname = newPath === "/" ? "/" : newPath;
    const res = NextResponse.rewrite(url);
    // Persist chosen locale for server-side detection
    res.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      sameSite: "lax",
    });
    return res;
  }

  // No locale prefix: set default per domain/subdomain
  // - fr.fincargo.ai → fr
  // - fincargo.be    → fr
  // - otherwise      → en
  const defaultLocale: Locale =
    host === "fr.fincargo.ai" || host.endsWith(".fr.fincargo.ai") || host === "fr.localhost" || host.endsWith(".fr.localhost")
      ? "fr"
      : host === "be.fincargo.ai" || host.endsWith(".be.fincargo.ai") || host === "be.localhost" || host.endsWith(".be.localhost")
      ? "en" // Belgium defaults to English (en-BE content)
      : host.endsWith("fincargo.be")
      ? "en"
      : "en";
  const res = NextResponse.next();
  if (!req.cookies.get("NEXT_LOCALE")?.value) {
    res.cookies.set("NEXT_LOCALE", defaultLocale, {
      path: "/",
      sameSite: "lax",
    });
  }
  return res;
}

export const config = {
  matcher: "/((?!_next|.*\\..*|api|internal-api).*)",
};
