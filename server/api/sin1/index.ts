
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["sin1"],
    };

    export default createHandler("sin1");
  