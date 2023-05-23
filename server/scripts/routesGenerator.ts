import { outputFileSync } from "fs-extra";
import { regions } from "../helpers/regions";
import { join } from "path";

Object.keys(regions).forEach((region) => {
  const code = `
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["${region}"],
    };

    export default createHandler("${region}");
  `;

  outputFileSync(join(__dirname, `../api/${region}/index.ts`), code);
});
