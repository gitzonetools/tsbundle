import * as plugins from './plugins.js';
import * as paths from '../paths.js';

export class HtmlHandler {
  public defaultFromPath: string = plugins.path.join(paths.htmlDir, 'index.html');
  public defaultToPath: string = plugins.path.join(paths.distServeDir, 'index.html');

  public async checkIfExists() {
    return plugins.smartfile.fs.fileExists(this.defaultFromPath);
  }

  // copies the html
  public async copyHtml(fromArg: string = this.defaultFromPath, toArg: string = this.defaultToPath) {
    if (await this.checkIfExists()) {
      console.log(`${fromArg} replaces file at ${toArg}`);
    }
    fromArg = plugins.smartpath.transform.toAbsolute(fromArg, paths.cwd) as string;
    toArg = plugins.smartpath.transform.toAbsolute(toArg, paths.cwd) as string;
    await plugins.smartfile.fs.copy(fromArg, toArg);
    console.log(`html copy succeeded!`);
  }

  // copies and minifies the html
  public async minifyHtml(fromArg: string = this.defaultFromPath, toArg: string = this.defaultToPath) {
    if (await this.checkIfExists()) {
      console.log(`${fromArg} replaces file at ${toArg}`);
    }
    fromArg = plugins.smartpath.transform.toAbsolute(fromArg, paths.cwd) as string;
    toArg = plugins.smartpath.transform.toAbsolute(toArg, paths.cwd) as string;
    const fileString = plugins.smartfile.fs.toStringSync(fromArg);
    const minifiedHtml = plugins.htmlMinifier.minify(fileString, {
      minifyCSS: true,
      minifyJS: true,
      sortAttributes: true,
      sortClassName: true,
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true,
    });
    await plugins.smartfile.memory.toFs(minifiedHtml, toArg);
    console.log(`html minification succeeded!`);
  }
}
