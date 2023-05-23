
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["cle1"],
    };

    export default createHandler("cle1");
  