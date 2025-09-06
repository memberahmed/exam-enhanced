import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { HEADER_CONTENT_TYPE } from "./lib/types/constant";
export const authOption: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const baseUrl = process.env.API;
        const res = await fetch(`${baseUrl}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
          headers: { ...HEADER_CONTENT_TYPE },
        });
        const payLoad: ApiResponse<LoginResponse> = await res.json();

        if ("code" in payLoad) {
          throw new Error(payLoad.message || "Something went wrong!!");
        }
        return {
          id: payLoad?.user._id,
          accessToken: payLoad?.token,
          ...payLoad?.user,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
        token.isVerified = user.isVerified;
        token.createdAt = user.createdAt;
      }
      if (trigger === "update" && session) {
        if (session.firstName) token.firstName = session.firstName;
        if (session.lastName) token.lastName = session.lastName;
        if (session.email) token.email = session.email;
        if (session.phone) token.phone = session.phone;
      }

      return token;
    },
    session: ({ session, token }) => {
      session._id = token._id;
      session.username = token.username;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      session.email = token.email;
      session.phone = token.phone;
      session.role = token.role;
      session.isVerified = token.isVerified;
      session.createdAt = token.createdAt;
      return session;
    },
  },
};
