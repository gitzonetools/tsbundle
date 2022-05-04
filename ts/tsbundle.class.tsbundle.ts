import * as plugins from './plugins.js';
import * as interfaces from './interfaces/index.js';
import { logger } from './tsbundle.logging.js';

export class TsBundle {

  public async build(
    cwdArg: string,
    fromArg: string = './ts_web/index.ts',
    toArg: string = './dist_bundle/bundle.js',
    argvArg: interfaces.ICliOptions
  ) {
    const done = plugins.smartpromise.defer();
    const getBundlerPath = () => {
      if (argvArg.bundler === 'esbuild') {
        return './mod_esbuild/index.child.js'
      }
      return './mod_esbuild/index.child.js'
    }
    const transportOptions: interfaces.IEnvTransportOptions = {
      cwd: cwdArg,
      from: fromArg,
      to: toArg,
      mode: argvArg && argvArg.production ? 'production' : 'test',
      argv:  {
        bundler: 'esbuild',
        ...argvArg
      } 
    }
    const threadsimple = new plugins.smartspawn.ThreadSimple(
      plugins.path.join(
        plugins.smartpath.get.dirnameFromImportMetaUrl(import.meta.url),
        getBundlerPath()
      ),
      [],
      {
        env: {
          ...process.env,
          transportOptions: JSON.stringify(transportOptions),
        },
      }
    );
    const childProcess = await threadsimple.start();
    childProcess.on('exit', (status) => {
      done.resolve();
    });
    await done.promise;
  }
}
