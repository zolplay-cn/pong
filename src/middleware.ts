import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.headers.get('token')

  if (!token) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET))
  } catch (error) {
    return new Response('Token verify failed', { status: 404 })
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/regions/:region*',
}
