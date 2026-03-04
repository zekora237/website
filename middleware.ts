import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "fr"] as const;
const defaultLocale = "en";

function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language");
  if (!acceptLang) return defaultLocale;

  // Parse accept-language: "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7"
  const preferred = acceptLang
    .split(",")
    .map((lang) => {
      const [code, qStr] = lang.trim().split(";q=");
      return { code: code.split("-")[0].toLowerCase(), q: qStr ? parseFloat(qStr) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of preferred) {
    if ((locales as readonly string[]).includes(code)) {
      return code;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths, API routes, and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already includes a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect locale from browser and redirect
  const locale = getLocaleFromHeaders(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|.*\\..*).*)"],
};
