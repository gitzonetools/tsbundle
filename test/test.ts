import { expect, tap } from '@pushrocks/tapbundle';
import * as tsbundle from '../ts/index';

tap.test('first test', async () => {
  await tsbundle.runCli();
});

tap.start();
