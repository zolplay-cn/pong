import Dexie from 'dexie'

interface Job {
  region: string
  duration: number
}

interface Url {
  id?: number
  url: string
  createdAt: Date
}

interface Task {
  id?: number
  url: string
  jobs: Job[]
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

  async appendTask(url: string, jobs: Job[]) {
    let urlRecord = await db.urls.get({ url })
    if (!urlRecord) {
      await db.urls.add({
        url,
        createdAt: new Date(),
      })
    }

    await db.tasks.add({
      url,
      jobs,
      createdAt: new Date(),
    })
  }
}

export const db = new PongDatabase()
