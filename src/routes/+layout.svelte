<script>
	import '../app.css';
</script>

<html lang="en" class={`bg-zinc-100 font-sans antialiased dark:bg-zinc-900`}>
	<body class="min-w-min tracking-tight">
		<main class="mx-auto max-w-5xl px-4 md:pb-16">
			<slot />
		</main>
		<footer class="w-full pb-6 pt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
			<div class="inline-flex items-center">
				<a
					class="mr-2 font-bold text-zinc-900/90 underline dark:text-zinc-100"
					href={'https://github.com/withyellow/pong'}
				>
					{'"Pong"'}
				</a>
				is an open source project by
				<a
					class="ml-2 inline-flex items-center space-x-1 font-bold text-zinc-900/90 dark:text-zinc-100"
					href={'https://zolplay.com/?utm_source=pong&utm_medium=footer&utm_campaign=pong'}
				>
					<span>Zolplay</span>
				</a>
				.
			</div>
		</footer>
	</body>
</html>
