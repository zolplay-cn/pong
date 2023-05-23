
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["dub1"],
    };

    export default createHandler("dub1");
  