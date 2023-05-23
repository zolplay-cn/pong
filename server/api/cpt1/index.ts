
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["cpt1"],
    };

    export default createHandler("cpt1");
  