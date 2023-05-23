<script setup lang="ts">
import { regions } from './server/helpers/regions';

const url = ref("https://jsonplaceholder.typicode.com/todos/1")
const isRunning = ref(false);

type Job = { region: string, duration: number, statusCode: number }

const jobs = ref<Job[]>([])



const handleTest = async () => {
  if (isRunning.value) return;
  jobs.value = []
  isRunning.value = true

  await Promise.allSettled(Object.keys(regions).map(async (region) => {
    const res = await $fetch<Job>(`/api/${region}`, { body: { url: unref(url) }, method: 'POST' })
    jobs.value.push(res)
  }))

  isRunning.value = false;
}

</script>

<template>
  <main>
    <div class="mt-6 flex max-w-md justify-center mx-auto">
      <input type="url" required="false" class="text-blue-400" placeholder="Enter your URL" v-model="url" />
      <button
        class="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        @click="handleTest">Test</button>
    </div>
    <ul class="mx-auto">
      <li v-for="job in jobs" :key="job.region" class="flex mt-4 justify-center">
        <div class="w-60">
          {{ regions[job.region].location }}
        </div>
        <div>
          {{ job.duration }}
        </div>
      </li>
    </ul>
  </main>
</template>
