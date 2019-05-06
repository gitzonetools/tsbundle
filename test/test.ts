import { expect, tap } from '@pushrocks/tapbundle';
import * as tsbundle from '../ts/index';

tap.test('first test', async () => {
  tsbundle;
  console.log('hi');
});

tap.start();
