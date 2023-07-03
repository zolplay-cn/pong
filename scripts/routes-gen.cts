import { join } from 'node:path';

import { regions } from '../src/helpers/regions';
import { outputFileSync } from 'fs-extra';

Object.keys(regions).forEach((region) => {
	const code = `
import { createHandler } from '~/helpers/factory'

export const fetchCache = 'force-no-store'
export const runtime = 'edge'
export const preferredRegion = '${region}'

export const POST = createHandler('${region}')
  `;

	outputFileSync(join(__dirname, `../src/api/regions/${region}/+server.ts`), code);
});
