"use client";
import { useRef, useState } from "react";
import { regions } from "~/helpers/regions";
import { motion, useAnimate } from "framer-motion";
type Job = { region: string; duration: number; statusCode: number };

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [url, setUrl] = useState("https://zolplay.com/");
  const [isRunning, setIsRunning] = useState(false);
  const longestRef = useRef(0);

  const handleTest = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setJobs([]);
    longestRef.current = 0;

    await Promise.allSettled(
      Object.keys(regions).map(async (region) => {
        const data = await fetch(`/api/${region}`, {
          method: "POST",
          body: JSON.stringify({ url }),
        });
        const job = (await data.json()) as Job;

        if (job.duration > longestRef.current)
          longestRef.current = job.duration;
        setJobs((jobs) =>
          [...jobs, job].sort((a, b) => a.duration - b.duration)
        );
      })
    );

    setIsRunning(false);
  };

  return (
    <main className="max-w-[640px] mx-auto pb-32">
      <div className="relative">
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
      </div>
      <div className="h-96">map</div>
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
          Test
        </button>
      </div>
      <ul className="mx-auto w-80 mt-14">
        {jobs.map((job) => (
          <li key={job.region} className="flex mt-5 justify-between relative">
            <div className="text-sm text-slate-600">
              {regions[job.region].location}
            </div>
            <div className="text-sm font-bold text-gray-900">
              {job.duration}
              <span className="text-xs text-black/40 ml-2">ms</span>
            </div>
            {job.duration !== -1 && !isRunning && (
              <div className="absolute bottom-0 left-0 h-[1px] w-full">
                <motion.div
                  className="bg-black h-[1px]"
                  initial={{ width: "100%" }}
                  animate={{
                    width: `${(job.duration / longestRef.current) * 100}%`,
                  }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
