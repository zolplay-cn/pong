
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["iad1"],
    };

    export default createHandler("iad1");
  