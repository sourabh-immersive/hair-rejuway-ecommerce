import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
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

          if (response.data.status) {
            const { user, token } = response.data.data;
            console.log('token rtest',token)
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
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
});
