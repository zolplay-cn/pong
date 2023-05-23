
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["kix1"],
    };

    export default createHandler("kix1");
  