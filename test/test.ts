import { expect, tap } from '@pushrocks/tapbundle';
import * as tsbundle from '../ts/index.js';

import * as path from 'path';

tap.test('should bundle with esbuild', async () => {
  const tsbundleInstance = new tsbundle.TsBundle();
  await tsbundleInstance.build(
    process.cwd() + '/test',
    './ts_web/index.ts',
    './dist_manual/test.js',
    {
      bundler: 'esbuild'
    }
  );
});

tap.test('should bundle with parcel', async () => {
  const tsbundleInstance = new tsbundle.TsBundle();
  await tsbundleInstance.build(
    process.cwd() + '/test',
    './ts_web/index.ts',
    './dist_manual/test.js',
    {
      bundler: 'parcel'
    }
  );
});

tap.test('should bundle with rollup', async () => {
  const tsbundleInstance = new tsbundle.TsBundle();
  await tsbundleInstance.build(
    process.cwd(),
    './test/ts_web/index.ts',
    './test/dist_manual/production.js',
    {bundler: 'rollup'}
  );
});

tap.start();
