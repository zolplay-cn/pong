
import { createHandler } from '~/helpers/factory'

export const fetchCache = 'force-no-store'
export const runtime = 'edge'
export const preferredRegion = 'pdx1'

export const POST = createHandler('pdx1')
  