import { withQuery } from "ufo";

export const createHandler = (region: string) => {
  return defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { url } = body;
    if (!url) return;

    try {
      const startAt = Date.now();

      await $fetch(withQuery(url, { __t: startAt }));

      return {
        region,
        duration: Date.now() - startAt,
        code: 200,
      };
    } catch (error) {
      const err = error as { statusCode: number };
      return {
        region,
        duration: -1,
        code: err.statusCode,
      };
    }
  });
};
