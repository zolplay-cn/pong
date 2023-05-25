"use client";
import { useState } from "react";
import { regions } from "~/helpers/regions";

type JobDTO = { region: string; duration: number; statusCode: number };
type Job = Omit<JobDTO, "duration"> & { duration: number[]; avg: number };
const TOTAL_REGIONS = Object.keys(regions).length;

export default function Home() {
  const [task, setTask] = useState<{ url: string; jobs: Job[] }>({
    url: "",
    jobs: [],
  });
  const [url, setUrl] = useState("https://zolplay.com/");
  const [isRunning, setIsRunning] = useState(false);
  const [finishedRegions, setFinishedRegions] = useState(0);

  const handleTest = async () => {
    if (isRunning) return;
    setIsRunning(true);
    if (url !== task.url) {
      setTask({ url, jobs: [] });
    }
    await runJobs();
    setIsRunning(false);
  };

  const runJobs = async () => {
    setFinishedRegions(0);
    await Promise.allSettled(
      Object.keys(regions).map(async (region) => {
        const response = await fetch(`/api/${region}`, {
          method: "POST",
          body: JSON.stringify({ url }),
          signal: AbortSignal.timeout(30 * 1000),
        });
        const data = (await response.json()) as JobDTO;

        setFinishedRegions((count) => count + 1);
        setTask((task) => {
          const job: Job = task.jobs.find((job) => job.region === region) || {
            ...data,
            duration: [],
            avg: 0,
          };

          const nextDuration =
            data.duration === -1
              ? job.duration
              : [...job.duration, data.duration];
          const avg =
            nextDuration.reduce((result, cur) => result + cur, 0) /
            nextDuration.length;

          return {
            ...task,
            jobs: [
              ...task.jobs.filter((job) => job.region !== region),
              { ...job, duration: nextDuration, avg },
            ].sort((a, b) => a.avg - b.avg),
          };
        });
      })
    );
  };

  return (
    <main className="max-w-[640px] mx-auto pb-32">
      {/* <div className="relative">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div> */}
      {/* <div className="h-96">map</div> */}
      <div className="mt-6 flex max-w-md justify-center mx-auto">
        <input
          type="url"
          required={false}
          className="block w-full rounded-md border-0 py-1.5 px-2 outline-none text-gray-900/50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-400 sm:text-sm sm:leading-6"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="flex-none rounded-md ml-4 bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={handleTest}
        >
          Pong!
        </button>
      </div>

      <div className="mx-auto w-80 mt-12">
        {!!task.url && (
          <div className="text-xs text-right text-slate-400">
            {finishedRegions}/{TOTAL_REGIONS}
          </div>
        )}
        <ul>
          {task.jobs.map((job) => (
            <li key={job.region} className="mt-5 relative flex">
              <div>
                <div className="text-sm text-slate-600">
                  {regions[job.region].emoji} {regions[job.region].location}
                </div>
                <ul className="flex flex-wrap mr-20">
                  {job.duration?.length > 1 &&
                    job.duration.map((duration, idx) => (
                      <div
                        key={job.region + idx}
                        className={
                          "text-xs scale-[0.85] text-black/30 px-1 py-[1px] border border-slate-500/10 rounded"
                        }
                      >
                        {duration}
                      </div>
                    ))}
                </ul>
              </div>

              <div className="text-sm font-bold text-gray-900 ml-auto">
                <div>
                  {isNaN(job.avg) ? "/" : job.avg.toFixed(0)}
                  <span className="text-xs text-black/40 ml-2">ms</span>
                </div>
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
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
