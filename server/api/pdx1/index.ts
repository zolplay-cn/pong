
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["pdx1"],
    };

    export default createHandler("pdx1");
  