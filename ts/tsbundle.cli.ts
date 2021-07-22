import * as plugins from './tsbundle.plugins';
import { TsBundle } from './tsbundle.class.tsbundle';
import { HtmlHandler } from './tsbundle.htmlhandler';
import { logger } from './tsbundle.logging';

export const runCli = async () => {
  const tsBundleCli = new plugins.smartcli.Smartcli();
  tsBundleCli.standardTask().subscribe(async argvArg => {
    const tsbundle = new TsBundle();
    // const htmlHandler = new HtmlHandler();
    switch (true) {
      case argvArg.production || process.env.CI:
        await tsbundle.buildProduction(process.cwd(), argvArg.from, argvArg.to);
        // await htmlHandler.minifyHtml();
        break;
      case argvArg.test:
      default:
        await tsbundle.buildTest(argvArg.from, argvArg.to);
        // await htmlHandler.copyHtml();
        return;
    }
  });

  tsBundleCli.addCommand('element').subscribe(async argvArg => {
    const tsbundle = new TsBundle();
    // const htmlHandler = new HtmlHandler();
    switch (true) {
      case argvArg.production || process.env.CI:
        await tsbundle.buildProduction(process.cwd(), './ts_web/index.ts', './dist_bundle/bundle.js');
        // await htmlHandler.minifyHtml();
        break;
      case argvArg.test:
      default:
        await tsbundle.buildTest('./ts_web/index.ts', './dist_bundle/bundle.js');
        // await htmlHandler.copyHtml();
        return;
    }
  });

  tsBundleCli.addCommand('npm').subscribe(async argvArg => {
    const tsbundle = new TsBundle();
    // const htmlHandler = new HtmlHandler();
    switch (true) {
      case argvArg.production || process.env.CI:
        await tsbundle.buildProduction(process.cwd(), './ts/index.ts', './dist_bundle/bundle.js');
        // await htmlHandler.minifyHtml();
        break;
      case argvArg.test:
      default:
        await tsbundle.buildTest('./ts/index.ts', './dist_bundle/bundle.js');
        // await htmlHandler.copyHtml();
        return;
    }
  });

  tsBundleCli.addCommand('website').subscribe(async argvArg => {
    const tsbundle = new TsBundle();
    const htmlHandler = new HtmlHandler();
    switch (true) {
      case argvArg.production || process.env.CI:
        await tsbundle.buildProduction(process.cwd(), './ts_web/index.ts', './dist_serve/bundle.js');
        await htmlHandler.minifyHtml();
        break;
      case argvArg.test:
      default:
        await tsbundle.buildTest('./ts_web/index.ts', './dist_serve/bundle.js');
        await htmlHandler.copyHtml();
        return;
    }
  });

  tsBundleCli.startParse();
};
