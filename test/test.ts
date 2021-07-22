import { expect, tap } from '@pushrocks/tapbundle';
import * as tsbundle from '../ts/index';

import * as path from 'path';

tap.skip.test('first test', async () => {
  await tsbundle.runCli();
});

tap.test('should run a custom function', async () => {
  const tsbundleInstance = new tsbundle.TsBundle();
  await tsbundleInstance.buildProduction(process.cwd(), './test/ts_web/index.ts', './test/dist_manual/index.js')
})

tap.start();
