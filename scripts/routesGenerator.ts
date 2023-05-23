import { outputFileSync } from "fs-extra";
import { regions } from "../src/helpers/regions";
import { join } from "path";

Object.keys(regions).forEach((region) => {
  const code = `
    import { createHandler } from "~/helpers/factory";

    export const fetchCache = 'force-no-store';
    export const runtime = 'edge';
    export const preferredRegion = '${region}';
    
    export const POST = createHandler("${region}");
  `;

  outputFileSync(join(__dirname, `../src/app/api/${region}/route.ts`), code);
});
