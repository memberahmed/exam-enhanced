import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { LOCALES, routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const authPages = ["/login", "/singup", "/forgot-passwords"];
const publicPages = ["/about", "/", ...authPages];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
      error: "/login",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req: req });

  const publicPathnameRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  );
  const authPathnameRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${authPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  );
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname);
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  // If user is logged in and trying to access an auth page, redirect to homepage
  if (token && isAuthPage) {
    const locale = req.nextUrl.pathname.split("/")[1] || "en"; // Extract locale or default to 'en'
    const homeUrl = `/${locale}`; // Construct localized homepage URL
    return NextResponse.redirect(new URL(homeUrl, req.url));
  }

  if (isPublicPage) {
    return handleI18nRouting(req);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
