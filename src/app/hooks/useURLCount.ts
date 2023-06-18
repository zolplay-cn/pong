import { db } from '~/lib/db'
import { useLiveQuery } from 'dexie-react-hooks'

export function useURLCount() {
  return useLiveQuery(() => db.urls.count())
}
