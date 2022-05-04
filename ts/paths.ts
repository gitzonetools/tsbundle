import * as plugins from './plugins.js';

export const cwd = process.cwd();
export const packageDir = plugins.path.join(
  plugins.smartpath.get.dirnameFromImportMetaUrl(import.meta.url),
  '../'
);
export const htmlDir = plugins.path.join(cwd, './html');
export const distServeDir = plugins.path.join(cwd, './dist_serve');
export const assetsDir = plugins.path.join(packageDir, 'assets');
export const tsconfigPath = plugins.path.join(packageDir, './assets/tsconfig.json');
