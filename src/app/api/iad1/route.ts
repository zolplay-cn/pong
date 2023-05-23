
    import { createHandler } from "~/helpers/factory";

    export const fetchCache = 'force-no-store';
    export const runtime = 'edge';
    export const preferredRegion = 'iad1';
    
    export const POST = createHandler("iad1");
  