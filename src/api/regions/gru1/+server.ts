import { createHandler } from '~/helpers/factory';

export const fetchCache = 'force-no-store';
export const runtime = 'edge';
export const preferredRegion = 'gru1';

export const POST = createHandler('gru1');
