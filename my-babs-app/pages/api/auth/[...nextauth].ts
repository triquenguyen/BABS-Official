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
        username: { label: "Username", type: "text", placeholder: "example" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as { username: string; password: string };

        if (!username || !password) {
          throw new Error("Username and password are required");
        }

        try {
          const userExists = await prisma.user.findUnique({
            where: {
              username: username,
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
            username: userExists.username,
            name: userExists.firstName + " " + userExists.lastName,
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
        token.username = user.username;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = { 
        id: token.id,
        username: token.username,
        name: token.name,
      };
      return session;
    },
  },
});
