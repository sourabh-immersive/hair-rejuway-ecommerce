import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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

          if (response.data.status) {
            const { user, token } = response.data.data;
            console.log("token rtest", token);
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
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        //after login with google save data to api
        // await saveUserToDatabase(user);
      } else if (account?.provider === "credentials") {
        console.log("Signed in using credentials");
      }

      return true; // Allow the sign-in
    },

    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
});

async function saveUserToDatabase(user: any) {
  const res = await fetch("https://your-api-url.com/api/save-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    }),
  });

  if (!res.ok) {
    console.error("Failed to save user to database");
  }
}
