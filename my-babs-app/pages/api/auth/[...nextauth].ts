import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { prisma } from "../../../libs/prisma";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        try {
          const userExists = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!userExists) {
            throw new Error("User does not exist");
          }

          const passwordMatch = await bcrypt.compare(password, userExists.password);

          if (!passwordMatch) {
            throw new Error("Password is incorrect");
          }

          return {
            id: userExists.id,
            email: userExists.email,
            firstName: userExists.firstName,
            lastName: userExists.lastName
          }

        } catch (error) {
          console.log(error);
          throw new Error("Something went wrong");
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = { 
        email: token.email,
        id: token.id,
        firstName: token.firstName,
        lastName: token.lastName
      };
      return session;
    },
  },
});
