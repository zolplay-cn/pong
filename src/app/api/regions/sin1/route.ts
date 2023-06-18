
import { createHandler } from '~/helpers/factory'

export const fetchCache = 'force-no-store'
export const runtime = 'edge'
export const preferredRegion = 'sin1'

export const POST = createHandler('sin1')
  