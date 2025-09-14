
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios'



export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }
console.log(credentials)
        try {
          // Call your Express backend login endpoint
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password
          })

          // Your backend returns { accessToken, userRole } but we need user data
          // Let's fetch user data using the token
          const { accessToken, userRole } = response.data

          if (accessToken) {
            // Fetch user profile using the token
            const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            })

            const userData = userResponse.data.data

            return {
              id: userData._id || userData.id,
              email: userData.email,
              name: userData.name || userData.email,
              role: userRole || userData.role,
              packageType: userData.packageType,
              subscriptionType: userData.subscriptionType,
              subscriptionStatus: userData.subscriptionStatus,
              subscriptionEndDate: userData.subscriptionEndDate,
              createdAt: userData.createdAt,
              accessToken // Store the backend token
            }
          }
          return null
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Auth error:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Invalid email or password');
          }
          console.error('Auth error:', (error as Error).message);
          throw new Error((error as Error).message || 'Invalid email or password');
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Add user data to JWT token on sign in
      if (user) {
        token.id = user.id
        token.role = user.role
        token.packageType = user.packageType
        token.subscriptionType = user.subscriptionType
        token.subscriptionStatus = user.subscriptionStatus
        token.subscriptionEndDate = user.subscriptionEndDate
        token.accessToken = user.accessToken // Store backend token in JWT
        token.createdAt = user.createdAt
      }
      return token
    },

    async session({ session, token }) {
      // Add token data to session
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.packageType = token.packageType as string
        session.user.subscriptionType = token.subscriptionType as string
        session.user.createdAt = token.createdAt as string
        session.user.subscriptionStatus = token.subscriptionStatus as string
        session.user.subscriptionEndDate = token.subscriptionEndDate as string
        session.accessToken = token.accessToken as string // Make backend token available
      }
      return session
    }
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)