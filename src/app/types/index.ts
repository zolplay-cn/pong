export type Job = Omit<JobDTO, 'duration'> & { duration: number[]; avg: number }
export type JobDTO = { region: string; duration: number; statusCode: number }
export type Task = { url: string; jobs: Job[] }
