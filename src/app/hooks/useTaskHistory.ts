import { useCallback } from 'react'
import useLocalStorage from 'use-local-storage'

import { isEqual } from 'ufo'
import { JobDTO } from '../types'

export type TaskHistoryItem = {
  url: string
  history: { time: number; jobs: JobDTO[] }[]
}

export function useTaskHistory() {
  const [history, setTaskHistory] = useLocalStorage<TaskHistoryItem[]>(
    'TASK_HISTORY',
    []
  )

  const appendTask = useCallback(
    (url: string, jobs: JobDTO[]) => {
      setTaskHistory((taskHistory) => {
        let existTask: TaskHistoryItem = { url, history: [] }

        const nextHistory =
          taskHistory?.filter((task) => {
            if (isEqual(task.url, url)) {
              existTask = task
              return false
            }
            return true
          }) || []

        return [
          {
            url: url,
            history: [{ time: Date.now(), jobs }, ...existTask.history],
          },
          ...nextHistory,
        ]
      })
    },
    [setTaskHistory]
  )

  return {
    history,
    appendTask,
  }
}
