
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["bom1"],
    };

    export default createHandler("bom1");
  