"use client";
import { useState } from "react";
import { regions } from "~/helpers/regions";

type Job = { region: string; duration: number; statusCode: number };

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [url, setUrl] = useState("https://zolplay.com/");
  const [isRunning, setIsRunning] = useState(false);

  const handleTest = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setJobs([]);

    await Promise.allSettled(
      Object.keys(regions).map(async (region) => {
        const data = await fetch(`/api/${region}`, {
          method: "POST",
          body: JSON.stringify({ url }),
        });
        const job = (await data.json()) as Job;

        setJobs((jobs) => [...jobs, job]);
      })
    );

    setIsRunning(false);
  };

  return (
    <main>
      <div className="mt-6 flex max-w-md justify-center mx-auto">
        <input
          type="url"
          required={false}
          className="text-blue-300 w-80"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={handleTest}
        >
          Test
        </button>
      </div>
      <ul className="mx-auto">
        {jobs.map((job) => (
          <li key={job.region} className="flex mt-4 justify-center">
            <div className="w-60">{regions[job.region].location}</div>
            <div>{job.duration}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
