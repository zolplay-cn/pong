
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["cdg1"],
    };

    export default createHandler("cdg1");
  