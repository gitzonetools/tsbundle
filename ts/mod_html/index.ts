import * as plugins from './plugins.js';
import * as paths from '../paths.js';

export class HtmlHandler {
  public defaultFromPath: string = plugins.path.join(paths.htmlDir, 'index.html');
  public defaultToPath: string = plugins.path.join(paths.distServeDir, 'index.html');

  public async checkIfExists() {
    return plugins.smartfile.fs.fileExists(this.defaultFromPath);
  }

  // copies the html
  public async processHtml(optionsArg: {
    from?: string;
    to?: string;
    minify?: boolean;
  }) {
    optionsArg = {
      ... {
        from: this.defaultFromPath,
        to: this.defaultToPath,
        minify: false,
      },
      ...optionsArg
    }
    if (await this.checkIfExists()) {
      console.log(`${optionsArg.from} replaces file at ${optionsArg.to}`);
    }
    optionsArg.from = plugins.smartpath.transform.toAbsolute(optionsArg.from, paths.cwd) as string;
    optionsArg.to = plugins.smartpath.transform.toAbsolute(optionsArg.to, paths.cwd) as string;
    let fileString = plugins.smartfile.fs.toStringSync(optionsArg.from);
    if (optionsArg.minify) {
      fileString = plugins.htmlMinifier.minify(fileString, {
        minifyCSS: true,
        minifyJS: true,
        sortAttributes: true,
        sortClassName: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
      });
    }
    await plugins.smartfile.memory.toFs(fileString, optionsArg.to);
    console.log(`html processing succeeded!`);
  }
}
