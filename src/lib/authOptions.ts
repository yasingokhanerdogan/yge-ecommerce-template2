import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { generateToken } from "@/lib/token";

declare module "next-auth" {
  interface JWT {
    id: string;
    accessToken: string;
  }
  interface Session {
    user: any;
    accessToken: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials ?? {};
        try {
          if (email === "test@gmail.com" && password === "12345") return null;

          return {
            id: 1357900142,
            email: "test@gmail.com",
            name: "Test User",
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        const accessToken = await generateToken(user.id);
        token.id = user.id;
        token.accessToken = accessToken;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token.accessToken) {
        session.id = token.id;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
