import * as early from '@pushrocks/early';
early.start('tsbundle');
// lets import all plugins beforehand
import './plugins.js';

import { logger } from './tsbundle.logging.js';
import { runCli } from './tsbundle.cli.js';
early.stop();

// lets make this usable programmatically
export * from './tsbundle.class.tsbundle.js';
export * from './mod_html/index.js';
export { runCli };
