'use client'

import { LinkIcon } from '@heroicons/react/20/solid'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import {
  AreaChart,
  Card,
  Grid,
  Metric,
  Subtitle,
  Text,
  TextInput,
} from '@tremor/react'
import { regions } from '~/helpers/regions'
import { db } from '~/lib/db'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../_ui/Button'
import type { Job, JobDTO, Task } from '../types'
import pongLogo from './favicon.png'

const TOTAL_REGIONS = Object.keys(regions).length

export default function Home() {
  const [task, setTask] = useState<Task>({
    url: '',
    jobs: [],
  })
  const [url, setUrl] = useState('https://zolplay.com/')
  const [isRunning, setIsRunning] = useState(false)
  const [finishedRegions, setFinishedRegions] = useState(0)

  const handlePong = async () => {
    if (isRunning) return
    setIsRunning(true)
    if (url !== task.url) {
      setTask({ url, jobs: [] })
    }

    try {
      await runJobs()
    } finally {
      setIsRunning(false)
    }
  }

  const runJobs = async () => {
    setFinishedRegions(0)
    const finishedJobs: JobDTO[] = []

    const response = await fetch('/api/token')
    const { token } = (await response.json()) as { token: string }

    if (!token) {
      toast.error('Failed to get token')
      return
    }

    await Promise.allSettled(
      Object.keys(regions).map(async (region) => {
        const response = await fetch(`/api/regions/${region}`, {
          method: 'POST',
          body: JSON.stringify({ url }),
          signal: AbortSignal.timeout(30 * 1000),
          headers: {
            token,
          },
        })
        const data = (await response.json()) as JobDTO

        setFinishedRegions((count) => count + 1)
        finishedJobs.push(data)
        setTask((task) => {
          const job: Job = task.jobs.find((job) => job.region === region) || {
            ...data,
            duration: [],
            avg: 0,
          }

          const nextDuration =
            data.duration === -1
              ? job.duration
              : [...job.duration, data.duration]
          const avg =
            nextDuration.reduce((result, cur) => result + cur, 0) /
            nextDuration.length

          return {
            ...task,
            jobs: [
              ...task.jobs.filter((job) => job.region !== region),
              { ...job, duration: nextDuration, avg },
            ].sort((a, b) => a.avg - b.avg),
          }
        })
      })
    )
    db.appendTask(url, finishedJobs)
  }

  return (
    <>
      <div className="my-6 flex w-full items-center justify-center">
        <Image src={pongLogo} alt="" className="h-16 w-16" />
      </div>
      <div className="mx-auto flex max-w-md justify-center">
        <TextInput
          type="text"
          required={false}
          placeholder="Enter your URL"
          value={url}
          icon={LinkIcon}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button className="ml-4" onClick={handlePong} icon={GlobeAltIcon}>
          Pong!
        </Button>
      </div>

      <div className="mx-auto my-6 max-w-md">
        {!!task.url && (
          <Card>
            <Text>Regions tested</Text>
            <Metric className="font-bold">
              {finishedRegions}/{TOTAL_REGIONS}
            </Metric>
          </Card>
        )}
      </div>

      <Grid numItems={1} numItemsMd={2} numItemsLg={3} className="gap-3">
        {task.jobs.map((job) => (
          <Card key={job.region} className="relative mt-5">
            <Text className="text-xs font-medium">
              {regions[job.region].emoji} {regions[job.region].location}
            </Text>

            <AreaChart
              data={job.duration.map((duration, idx) => ({
                idx: `#${idx + 1}`,
                Latency: duration,
              }))}
              categories={['Latency']}
              index="idx"
              valueFormatter={(value) => `${value}ms`}
              showLegend={false}
              className="mt-3"
            />
            <div className="ml-auto flex flex-col items-end text-sm font-bold text-gray-900">
              <Metric className="flex items-center font-bold">
                {Number.isNaN(job.avg) ? '/' : job.avg.toFixed(0)}
                <Subtitle className="ml-2 text-xs text-black/40">ms</Subtitle>
              </Metric>
              {job.duration.length > 1 && (
                <div className="mt-[2px] text-xs font-light text-zinc-500">
                  <span className="mr-1 text-green-600 dark:text-green-400">
                    {Math.min(...job.duration)}
                  </span>
                  /
                  <span className="ml-1 text-red-600 dark:text-red-400">
                    {Math.max(...job.duration)}
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </Grid>
    </>
  )
}
