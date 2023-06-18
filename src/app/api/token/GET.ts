import { Ratelimit } from '@upstash/ratelimit'
import { ipAddress } from '@vercel/edge'
import { redis } from '~/lib/redis'
import { SignJWT } from 'jose'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const ip = ipAddress(req)

  if (!ip) {
    return new Response('Bad Request', {
      status: 404,
    })
  }

  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '5 s'),
    analytics: true,
  })

  const { success } = await ratelimit.limit('token' + `_${ip}`)
  if (!success) {
    return new Response('Too Many Requests', {
      status: 429,
    })
  }

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ip)
    .setExpirationTime('5s')
    .sign(new TextEncoder().encode(process.env.TOKEN_SECRET))

  return NextResponse.json({
    ip,
    // token,
  })
}
