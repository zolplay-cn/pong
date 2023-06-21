import { db } from '~/lib/db'
import { useLiveQuery } from 'dexie-react-hooks'

export function useURLs() {
  const urls = useLiveQuery(() => db.urls.orderBy('updatedAt').toArray())
  return urls || []
}
