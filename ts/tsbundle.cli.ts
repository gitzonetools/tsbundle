import * as plugins from './tsbundle.plugins';
import { TsBundle } from './tsbundle.class.tsbundle';
import { logger } from './tsbundle.logging';

export const runCli = async () => {
  const tsBundleCli = new plugins.smartcli.Smartcli();
  tsBundleCli.standardTask().subscribe(async argvArg => {
    const tsbundle = new TsBundle();
    switch (true) {
      case argvArg.production:
        await tsbundle.buildProduction();
        break;
      case argvArg.test:
        await tsbundle.buildTest();
        break;
      default:
        logger.log('error', `Can not determine build target environement. Please specify via --production or --test`)
        return;
    }
  });

  tsBundleCli.startParse();
};
