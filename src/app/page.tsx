'use client'
import { LinkIcon } from '@heroicons/react/20/solid'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import {
  AreaChart,
  Button,
  Card,
  Grid,
  Metric,
  Subtitle,
  Text,
  TextInput,
} from '@tremor/react'
import Image from 'next/image'
import { useState } from 'react'
import { regions } from '~/helpers/regions'
import pongLogo from './favicon.png'
import { Job, JobDTO, Task } from './types'
import { db } from '~/lib/db'

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
    await runJobs()
    setIsRunning(false)
  }

  const runJobs = async () => {
    setFinishedRegions(0)
    const finishedJobs: JobDTO[] = []
    await Promise.allSettled(
      Object.keys(regions).map(async (region) => {
        const response = await fetch(`/api/${region}`, {
          method: 'POST',
          body: JSON.stringify({ url }),
          signal: AbortSignal.timeout(30 * 1000),
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
    <main className="max-w-5xl mx-auto pb-32">
      <div className="my-6 w-full flex justify-center items-center">
        <Image src={pongLogo} alt="" className="w-16 h-16" />
      </div>
      <div className="flex max-w-md justify-center mx-auto">
        <TextInput
          type="text"
          required={false}
          placeholder="Enter your URL"
          value={url}
          icon={LinkIcon}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          className="flex-none rounded-md ml-4 bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={handlePong}
          icon={GlobeAltIcon}
        >
          Pong!
        </Button>
      </div>

      <div className="my-6 max-w-md mx-auto">
        {!!task.url && (
          <Card>
            <Text>Regions tested</Text>
            <Metric className="font-bold">
              {finishedRegions}/{TOTAL_REGIONS}
            </Metric>
          </Card>
        )}
      </div>

      <Grid numCols={1} numColsMd={2} numColsLg={3} className="gap-3">
        {task.jobs.map((job) => (
          <Card key={job.region} className="mt-5 relative">
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
            <div className="text-sm font-bold text-gray-900 ml-auto flex flex-col items-end">
              <Metric className="flex items-center font-bold">
                {isNaN(job.avg) ? '/' : job.avg.toFixed(0)}
                <Subtitle className="text-xs text-black/40 ml-2">ms</Subtitle>
              </Metric>
              {job.duration.length > 1 && (
                <div className="font-light text-xs mt-[2px]">
                  <span className="text-green-600 mr-1">
                    {Math.min(...job.duration)}
                  </span>
                  /
                  <span className="text-red-600 ml-1">
                    {Math.max(...job.duration)}
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </Grid>
    </main>
  )
}
