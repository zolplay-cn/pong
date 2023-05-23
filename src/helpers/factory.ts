import { NextRequest, NextResponse } from "next/server";
import { withQuery } from "ufo";

export const createHandler = (region: string) => {
  return async (req: NextRequest) => {
    const body = await req.json();
    const { url } = body;
    if (!url) return;

    try {
      const startAt = Date.now();

      await fetch(withQuery(url, { __pong: startAt }));

      return NextResponse.json({
        region,
        duration: Date.now() - startAt,

        code: 200,
      });
    } catch (error) {
      const err = error as { statusCode: number };
      return NextResponse.json({
        region,
        duration: -1,
        code: err.statusCode,
      });
    }
  };
};
