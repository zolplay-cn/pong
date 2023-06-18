import { ipAddress } from '@vercel/edge'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const ip = ipAddress(req) || 'unknown'

  return NextResponse.json({
    ip,
  })
}
