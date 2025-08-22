import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { AUTH_COOKIE, NEXTAUTHCOOCKIES } from "@/lib/types/constant";

export default async function getUserToken() {
  // Get token
  try {
    // Prefer derived AUTH_COOKIE, fallback to env var name, then to default constant
    const cookieName = AUTH_COOKIE || (process.env.NEXTAUTHCOOCKIES as string) || NEXTAUTHCOOCKIES;
    const tokenCookies = cookies().get(cookieName)?.value;

    if (!tokenCookies || !process.env.NEXTAUTH_SECRET) return undefined;

    const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET });

    return token?.accessToken;
  } catch (error) {
    console.error("Error getting token:", error);
    return undefined;
  }
}
