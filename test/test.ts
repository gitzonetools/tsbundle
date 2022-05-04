import { expect, tap } from '@pushrocks/tapbundle';
import * as tsbundle from '../ts/index.js';

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


tap.start();
