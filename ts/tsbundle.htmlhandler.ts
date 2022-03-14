import * as plugins from './tsbundle.plugins.js';
import * as paths from './tsbundle.paths.js';

export class HtmlHandler {
  public sourceFilePath: string = plugins.path.join(paths.htmlDir, 'index.html');
  public targetFilePath: string = plugins.path.join(paths.distServeDir, 'index.html');

  public async checkIfExists() {
    return plugins.smartfile.fs.fileExists(this.sourceFilePath);
  }

  // copies the html
  public async copyHtml(targetPathArg = this.targetFilePath) {
    if (!(await this.checkIfExists())) {
      return;
    }
    await plugins.smartfile.fs.copy(this.sourceFilePath, targetPathArg);
  }

  // copies and minifies the html
  public async minifyHtml(targetPathArg = this.targetFilePath) {
    if (!(await this.checkIfExists())) {
      return;
    }
    const fileString = plugins.smartfile.fs.toStringSync(this.sourceFilePath);
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
    plugins.smartfile.memory.toFsSync(minifiedHtml, targetPathArg);
  }
}
