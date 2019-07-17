import * as plugins from './tsbundle.plugins';
import * as paths from './tsbundle.paths';

export class HtmlHandler {
  public sourceFilePath: string = plugins.path.join(paths.htmlDir, 'index.html');
  public targetFilePath: string = plugins.path.join(paths.distWebDir, 'index.html');

  public async checkIfExists() {
    return plugins.smartfile.fs.fileExists(this.sourceFilePath);
  }

  // copies the html
  public async copyHtml() {
    if (!(await this.checkIfExists)) {
      return;
    }
    await plugins.smartfile.fs.copy(this.sourceFilePath, this.targetFilePath);
  }

  // copies and minifies the html
  public async minifyHtml() {
    if (!(await this.checkIfExists)) {
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
      removeComments: true
    });
    plugins.smartfile.memory.toFsSync(minifiedHtml, this.targetFilePath);
  }
}
