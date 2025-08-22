export const HEADER_CONTENT_TYPE = {
  "Content-Type": "application/json",
};

export const NEXTAUTHCOOCKIES = "next-auth.session-token";

// Derive the correct NextAuth session cookie name based on protocol
export const AUTH_COOKIE = (() => {
  const isSecure = process.env.NEXTAUTH_URL?.startsWith("https://");
  return isSecure ? "__Secure-next-auth.session-token" : "next-auth.session-token";
})();
