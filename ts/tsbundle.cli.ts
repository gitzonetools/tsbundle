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
      case argvArg.production || process.env.CI:
        await tsbundle.buildProduction(argvArg.from, argvArg.to);
        await htmlHandler.minifyHtml();
        break;
      case argvArg.test:
      default:
        await tsbundle.buildTest(argvArg.from, argvArg.to);
        await htmlHandler.copyHtml();
        return;
    }
  });

  tsBundleCli.addCommand('element').subscribe(async argvArg => {
    const tsbundle = new TsBundle();
    // const htmlHandler = new HtmlHandler();
    switch (true) {
      case argvArg.production || process.env.CI:
        await tsbundle.buildProduction('./ts_web/index.ts', './dist_ts_web/bundle.js');
        // await htmlHandler.minifyHtml();
        break;
      case argvArg.test:
      default:
        await tsbundle.buildTest('./ts_web/index.ts', './dist_ts_web/bundle.js');
        // await htmlHandler.copyHtml();
        return;
    }
  });

  tsBundleCli.startParse();
};
