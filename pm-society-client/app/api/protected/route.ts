import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import axios from 'axios'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Use the stored backend token to make authenticated requests
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/some-endpoint`, {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`
      }
    })

    return NextResponse.json(response.data)
  } catch {
    return NextResponse.json({ error: 'Backend request failed' }, { status: 500 })
  }
}