import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getUserToken() {
  // Get token
  try {
    const tokenCookies = cookies().get(process.env.NEXTAUTHCOOCKIES as string)?.value;
    const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

    return token?.accessToken;
  } catch (error) {
    console.error("Error getting token:", error);
    return undefined;
  }
}
