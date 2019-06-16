import * as early from '@pushrocks/early';
early.start('tsbundle');
// lets import all plugins beforehand
import './tsbundle.plugins';

import { logger } from './tsbundle.logging';
import { runCli } from './tsbundle.cli';
early.stop();

if (process.env.CLI_CALL) {
  runCli();
}
