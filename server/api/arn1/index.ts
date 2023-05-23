
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["arn1"],
    };

    export default createHandler("arn1");
  