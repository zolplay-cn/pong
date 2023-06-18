import { join } from 'node:path'
import { outputFileSync } from 'fs-extra'
import { regions } from '../src/helpers/regions'

Object.keys(regions).forEach((region) => {
  const code = `
import { createHandler } from '~/helpers/factory'

export const fetchCache = 'force-no-store'
export const runtime = 'edge'
export const preferredRegion = '${region}'

export const POST = createHandler('${region}')
  `

  outputFileSync(
    join(__dirname, `../src/app/api/regions/${region}/route.ts`),
    code
  )
})
