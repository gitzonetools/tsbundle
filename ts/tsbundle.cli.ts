import * as plugins from './plugins.js';
import { TsBundle } from './tsbundle.class.tsbundle.js';
import { HtmlHandler } from './mod_html/index.js';
import { logger } from './tsbundle.logging.js';

export const runCli = async () => {
  const tsBundleCli = new plugins.smartcli.Smartcli();
  tsBundleCli.standardTask().subscribe(async (argvArg) => {
    const tsbundle = new TsBundle();
    await tsbundle.build(process.cwd(), argvArg.from, argvArg.to, argvArg);
    return;
  });

  tsBundleCli.addCommand('element').subscribe(async (argvArg) => {
    const tsbundle = new TsBundle();
    await tsbundle.build(
      process.cwd(),
      './ts_web/index.ts',
      './dist_bundle/bundle.js',
      argvArg
    );
  });

  tsBundleCli.addCommand('npm').subscribe(async (argvArg) => {
    const tsbundle = new TsBundle();
    const htmlHandler = new HtmlHandler();
    await tsbundle.build(
      process.cwd(),
      './ts/index.ts',
      './dist_bundle/bundle.js',
      argvArg
    );
  });

  tsBundleCli.addCommand('website').subscribe(async (argvArg) => {
    const tsbundle = new TsBundle();
    const htmlHandler = new HtmlHandler();
    await tsbundle.build(
      process.cwd(),
      './ts_web/index.ts',
      './dist_serve/bundle.js',
      argvArg
    );
    const htmlFiles = await plugins.smartfile.fs.listFiles('./html', /\.html/);
    for (const htmlFile of htmlFiles) {
      await htmlHandler.processHtml({
        from: `./html/${htmlFile}`,
        to: `./dist_serve/${htmlFile}`,
        minify: true,
      });
    }
  });

  tsBundleCli.startParse();
};
