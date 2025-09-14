import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      createdAt: string
      id: string
      email: string
      name: string
      role: string
      packageType: string
      subscriptionType: string
      subscriptionStatus: string
      subscriptionEndDate: string
    }
    accessToken: string
  }

  interface User {
    id: string
    email: string
    name: string
    role: string
    packageType: string
    subscriptionType: string
    subscriptionStatus: string
    subscriptionEndDate: string
    createdAt: Date
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    packageType: string
    subscriptionStatus: string
    subscriptionEndDate: string
    accessToken: string
  }
}