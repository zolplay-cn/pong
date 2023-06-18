import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_ENDPOINT || '',
  token: process.env.UPSTASH_PASSWORD || '',
})
