import * as early from '@pushrocks/early';
early.start('tsbundle');
// lets import all plugins beforehand
import './tsbundle.plugins';

import { logger } from './tsbundle.logging';
import { runCli } from './tsbundle.cli';
early.stop();

// lets make this usable programmatically
export * from './tsbundle.class.tsbundle';
export {
  runCli
};
