// Replace the content in src/lib/types/constant.ts
export const HEADER_CONTENT_TYPE = {
  "Content-Type": "application/json",
};

// Add your corrected AUTH_COOKIE implementation
export const AUTH_COOKIE = (() => {
  // Get the base URL from the environment variable or default to localhost
  const secureCookie = process.env.NEXTAUTH_URL?.startsWith("https://");

  /*
    Check if the protocol is HTTPS or HTTP and set the cookie name accordingly
    The cookie name is prefixed with __Secure- if the protocol is HTTPS for security reasons (NextAuth is responsible)
  */
  if (secureCookie) {
    return "__Secure-next-auth.session-token";
  } else {
    return "next-auth.session-token";
  }
})();
