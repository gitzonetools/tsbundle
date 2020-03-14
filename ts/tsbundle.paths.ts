import * as plugins from './tsbundle.plugins';

export const cwd = process.cwd();
export const packageDir = plugins.path.join(__dirname, '../');
export const htmlDir = plugins.path.join(cwd, './html');
export const distServeDir = plugins.path.join(cwd, './dist_serve');
export const assetsDir = plugins.path.join(packageDir, 'assets');
