"use client"

import { useAuth } from "@/hooks/useAuth"



interface ProtectedPageProps {
  children: React.ReactNode
  requiredRole?: string
}

export function ProtectedPage({ children, requiredRole }: ProtectedPageProps) {
  const { session, isLoading } = useAuth('/login')

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return null // Will redirect to signin
  }

  if (requiredRole && session.user.role !== requiredRole) {
    return <div>Access denied. Required role: {requiredRole}</div>
  }

  return <>{children}</>
}