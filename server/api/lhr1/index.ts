
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["lhr1"],
    };

    export default createHandler("lhr1");
  