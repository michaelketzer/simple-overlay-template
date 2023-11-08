import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitchProvider({
      id: "twitch",
      name: "Twitch",
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const account = await prisma.account.findFirst({
        where: {
          userId: user.id,
        },
      });

      let accessToken: string | null = null;
      if (account) {
        accessToken = account.access_token!;
      }

      session.user.token = accessToken;
      return session;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
