import * as plugins from './tsbundle.plugins';
import * as paths from './tsbundle.paths';

export class HtmlHandler {
  public sourceFilePath: string = plugins.path.join(paths.htmlDir, 'index.html');
  public targetFilePath: string = plugins.path.join(paths.distWebDir, 'index.html');

  // copies the html
  public async copyHtml() {
    await plugins.smartfile.fs.copy(
      this.sourceFilePath,
      this.targetFilePath
    );
  }

  // copies and minifies the html
  public async minifyHtml() {
    const fileString = plugins.smartfile.fs.toStringSync(this.sourceFilePath);
    const minifiedHtml = plugins.htmlMinifier.minify(fileString, {
      minifyCSS: true,
      minifyJS: true,
      sortAttributes: true,
      sortClassName: true,
      removeAttributeQuotes: true
    });
    plugins.smartfile.memory.toFsSync(minifiedHtml, this.targetFilePath);
  }
}