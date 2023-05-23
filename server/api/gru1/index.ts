
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["gru1"],
    };

    export default createHandler("gru1");
  