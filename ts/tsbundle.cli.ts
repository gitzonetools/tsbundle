import * as plugins from './tsbundle.plugins';
import { TsBundle } from './tsbundle.class.tsbundle';
import { HtmlHandler } from './tsbundle.htmlhandler';
import { logger } from './tsbundle.logging';

export const runCli = async () => {
  const tsBundleCli = new plugins.smartcli.Smartcli();
  tsBundleCli.standardTask().subscribe(async argvArg => {
    const tsbundle = new TsBundle();
    const htmlHandler = new HtmlHandler();
    switch (true) {
      case argvArg.production:
        await tsbundle.buildProduction();
        await htmlHandler.minifyHtml();
        break;
      case argvArg.test:
        await tsbundle.buildTest();
        await htmlHandler.copyHtml();
        break;
      default:
        logger.log('error', `Can not determine build target environement. Please specify via --production or --test`)
        return;
    }
  });

  tsBundleCli.startParse();
};
