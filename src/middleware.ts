import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { LOCALES, routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const authPages = ["/login", "/singup", "/forgot-password"];
const publicPages = ["/about", ...authPages];

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

  // Public pages regex
  const publicPathnameRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  );

  // Auth pages regex
  const authPathnameRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${authPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  );

  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname);
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  // If the user navigating to a public page check if logged or not
  if (isPublicPage) {
    //  If user logged in and try to go to auth pages, redirect to home page
    if (token && isAuthPage) {
      const homePageUrl = new URL("/", req.nextUrl.origin);
      return handleI18nRouting(new NextRequest(homePageUrl, req));
    }

    // If not logged let him navigate
    return handleI18nRouting(req);
  } else {
    // If the user navigating to privte page authtacte him

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
