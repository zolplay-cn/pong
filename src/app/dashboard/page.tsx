'use client'

import { useURLCount } from '../hooks/useURLCount'
import { useURLs } from '../hooks/useURLs'

export default function PageDashboard() {
  const count = useURLCount()
  const urls = useURLs()

  return (
    <div>
      <div>Total: {count}</div>
      <ul>
        {urls.map(({ url, updatedAt }) => (
          <li key={url}>{url}</li>
        ))}
      </ul>
    </div>
  )
}
