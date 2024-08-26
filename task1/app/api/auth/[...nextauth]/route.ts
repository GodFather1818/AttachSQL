// import axios from 'axios';
// import { NextAuthOptions } from 'next-auth';
// import NextAuth from 'next-auth/next';
// import CredentialsProvider from 'next-auth/providers/credentials';

// export const authOptions: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) return null;

//                 try {
//                     const res = await axios.post('http://localhost:3002/user/login', {
//                         email: credentials.email,
//                         password: credentials.password,
//                     });

//                     const { userId, name, userRole, token, permissions } = res.data;
//                     return { userId, name, role: userRole, token, permissions };
//                 } catch (error) {
//                     console.error('Login failed:', error);
//                     return null;
//                 }
//             }
//         })
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.userId = user.userId;
//                 token.name = user.name;
//                 token.role = user.role;
//                 token.accessToken = user.token;
//                 token.permissions = user.permissions;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session.user = {
//                 id: token.userId,
//                 name: token.name,
//                 role: token.role,
//                 token: token.accessToken,
//                 permissions: token.permissions
//             } as any; // Type assertion to avoid TypeScript errors
//             session.accessToken = token.accessToken as string;
//             return session;
//         }
//     },
//     secret: 'SAHIL2102',
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Login
          const loginResponse = await fetch("http://localhost:3002/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (loginResponse.ok) {
            const user = await loginResponse.json();
            return user;
          }

          // If login fails, try to register
          const registerResponse = await fetch("http://localhost:3002/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              name: credentials.email.split("@")[0], // Using email username as name
            }),
          });

          if (registerResponse.ok) {
            // If registration is successful, try to login again
            const loginAfterRegisterResponse = await fetch("http://localhost:3002/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });

            if (loginAfterRegisterResponse.ok) {
              const user = await loginAfterRegisterResponse.json();
              return user;
            }
          }
        } catch (error) {
          console.error("Authentication error:", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'SAHIL2102', // Ensure this is set correctly
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };