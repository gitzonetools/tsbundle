import { expect, tap } from '@pushrocks/tapbundle';
import * as tsbundle from '../dist_ts/index';

import * as path from 'path';

tap.test('should bundle test', async () => {
  const tsbundleInstance = new tsbundle.TsBundle();
  await tsbundleInstance.buildTest(process.cwd() + '/test', './ts_web/index.ts', './dist_manual/test.js', 'rollup')
})

tap.test('should bundle production', async () => {
  const tsbundleInstance = new tsbundle.TsBundle();
  await tsbundleInstance.buildProduction(process.cwd(), './test/ts_web/index.ts', './test/dist_manual/production.js')
})

tap.start();
