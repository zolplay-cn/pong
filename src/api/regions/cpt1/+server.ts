import { createHandler } from '~/helpers/factory';

export const fetchCache = 'force-no-store';
export const runtime = 'edge';
export const preferredRegion = 'cpt1';

export const POST = createHandler('cpt1');
