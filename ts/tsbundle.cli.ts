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
      case (argvArg.production) || process.env.CI:
        await tsbundle.buildProduction();
        await htmlHandler.minifyHtml();
        break;
      case argvArg.test:
      default:
        await tsbundle.buildTest();
        await htmlHandler.copyHtml();
        return;
    }
  });

  tsBundleCli.startParse();
};
