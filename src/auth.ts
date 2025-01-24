import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { initializeSession } from "./lib/features/authSlice/authSlice";
import { useAppDispatch } from "./lib/hooks";
import { authenticateGoogleUser } from "./api/auth";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        try {
          const { email, password } = credentials;

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`,
            { email, password }
          );

          // set session in redux

          if (response.data.status) {
            const { user, token } = response.data.data;
            console.log("token rtest user", user);
            // return { ...user, token, }
            return {
              id: user.id,
              name: user.full_name,
              phone: user.phone,
              email: user.email,
              apiToken: token, // Include apiToken
            };
          } else {
            throw new Error(response.data.message || "Invalid credentials.");
          }
        } catch (error: any) {
          console.error("Authorization error:", error?.response?.data || error);
          throw new Error(
            error?.response?.data?.message || "Authorization failed."
          );
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.pId = account.providerAccountId;
        token.name = user.name;
      }

      return { ...token, ...user };
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        // console.log("google account data ", account);
        // console.log("google profile data ", profile);
        // console.log("google user data ", user);

        const userD = {
          login_type: "google",
          email: user.email,
          name: user.name,
          id: account.providerAccountId,
        };

        const authResponse = await authenticateGoogleUser(userD);
        // console.log('authResponse', authResponse)
        if (user && authResponse?.status) {
          user.apiToken = authResponse.token;

          return true;
        }

      } else if (account?.provider === "credentials") {
        // console.log("Signed in using credentials");
        return true;
      }

      return false;
    },

    async session({ session, token, user }) {
      session.user = token as any;
      // console.log("google user account token session ", session);
      return session;
    },
  },
});
