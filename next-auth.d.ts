// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    image: string;
    phone: string;
    email: string;
    apiToken: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      image: any;
      phone: string;
      email: string;
      apiToken: string;
    };
    apiToken: string; // Add apiToken to the session
  }

  interface JWT {
    apiToken: string; // Add apiToken to the JWT token
  }
}
