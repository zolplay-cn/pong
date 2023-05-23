
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["hnd1"],
    };

    export default createHandler("hnd1");
  