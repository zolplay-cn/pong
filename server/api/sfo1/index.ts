
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["sfo1"],
    };

    export default createHandler("sfo1");
  