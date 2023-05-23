
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["fra1"],
    };

    export default createHandler("fra1");
  