import * as plugins from './tsbundle.plugins';

export const cwd = process.cwd();
export const packageDir = plugins.path.join(__dirname, '../');
export const htmlDir = plugins.path.join(cwd, './html');
export const distWebDir = plugins.path.join(cwd, './dist_web');
