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
            name: userExists.firstName + " " + userExists.lastName,
            pincode: userExists.pincode
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
    maxAge: 30
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.pincode = false;
      }
      if (trigger === "update" && session?.pincode)
      {
        const userExists = await prisma.user.findUnique({
          where: {
            id: token.id
          },
        });
        if (userExists?.pincode === session?.pincode)
        {
          token.pincode = true;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user = { 
        id: token.id,
        email: token.email,
        name: token.name,
        pincode: token.pincode
      };
      return session;
    },
  },
});
