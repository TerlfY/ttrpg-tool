import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./validation-schemas";
import { getUserByUsername } from "./prisma/services/userService";
import * as bcrypt from "bcryptjs";

/**
 * This file is necessary for NextAuth to work with Prisma
 */

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = validatedFields.data;

          const user = await getUserByUsername(username);

          if (!user || typeof user === "string" || !user.password_hash) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password_hash,
          );

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  trustHost: true,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user?.id) {
        token.user_id = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.userId = String(token.user_id);

      return session;
    },
  },
} satisfies NextAuthConfig;
