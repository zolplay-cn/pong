import { withHttps, withQuery } from 'ufo';
import type { RequestHandler } from '@sveltejs/kit';

export const createHandler = (region: string) => {
	const handler: RequestHandler = async ({ request }) => {
		const body = await request.json();
		const { url } = body as { url: string };
		if (!url) throw new Error('url is required');

		try {
			const startAt = Date.now();

			await fetch(withQuery(withHttps(url), { __pong: startAt }));

			return new Response(
				JSON.stringify({
					region,
					duration: Date.now() - startAt,
					code: 200
				})
			);
		} catch (error) {
			const err = error as { statusCode: number };
			return new Response(
				JSON.stringify({
					region,
					duration: -1,
					code: err.statusCode
				})
			);
		}
	};

	return handler;
};
