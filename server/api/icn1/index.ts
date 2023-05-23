
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["icn1"],
    };

    export default createHandler("icn1");
  