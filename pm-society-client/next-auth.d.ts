// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      avatar?: string
      bio?: string
      createdAt?: string
    }
    accessToken: string
  }

  interface User {
    id: string
    email: string
    name: string
    role: string
    avatar?: string
    bio?: string
    createdAt?: string
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    avatar?: string
    bio?: string
    createdAt?: string
    accessToken: string
  } 
}