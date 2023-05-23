
    import { createHandler } from "../../helpers/factory";

    export const config = {
      runtime: "edge",
      regions: ["hkg1"],
    };

    export default createHandler("hkg1");
  