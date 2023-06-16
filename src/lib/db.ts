import type { JobDTO } from '~/types'
import Dexie from 'dexie'

interface Url {
  id?: number
  url: string
  createdAt: Date
}

interface Task {
  id?: number
  url: string
  jobs: JobDTO[]
  createdAt: Date
}

class PongDatabase extends Dexie {
  urls: Dexie.Table<Url, number>
  tasks: Dexie.Table<Task, number>

  constructor() {
    super('Pong')

    this.version(1).stores({
      urls: '++id, url, tasks, createdAt',
      tasks: '++id, url, jobs, createdAt',
    })

    this.urls = this.table('urls')
    this.tasks = this.table('tasks')
  }

  async appendTask(url: string, jobs: JobDTO[]) {
    const urlRecord = await this.urls.get({ url })
    if (!urlRecord) {
      await this.urls.add({
        url,
        createdAt: new Date(),
      })
    }

    await this.tasks.add({
      url,
      jobs,
      createdAt: new Date(),
    })
  }
}

export const db = new PongDatabase()
