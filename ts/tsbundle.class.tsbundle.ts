import * as plugins from './tsbundle.plugins.js';
import { logger } from './tsbundle.logging.js';

export class TsBundle {
  public async buildTest(
    cwdArg: string,
    fromArg: string,
    toArg: string,
    bundlerArg: 'rollup' | 'parcel',
    argvArg: any
  ) {
    const done = plugins.smartpromise.defer();
    const threadsimple = new plugins.smartspawn.ThreadSimple(
      plugins.path.join(
        plugins.smartpath.get.dirnameFromImportMetaUrl(import.meta.url),
        './tsbundle.class.tsbundleprocess.js'
      ),
      [],
      {
        env: {
          ...process.env,
          tsbundleMode: 'test',
          tsbundleCwd: cwdArg,
          tsbundleFrom: fromArg,
          tsbundleTo: toArg,
          tsbundleBundler: bundlerArg,
          tsbundleArgv: argvArg ? JSON.stringify(argvArg) : '{}',
        },
      }
    );
    const childProcess = await threadsimple.start();
    childProcess.on('exit', (status) => {
      done.resolve();
    });
    await done.promise;
  }

  public async buildProduction(
    cwdArg: string,
    fromArg: string,
    toArg: string,
    bundlerArg: 'rollup' | 'parcel',
    argvArg: any
  ) {
    const done = plugins.smartpromise.defer();
    const threadsimple = new plugins.smartspawn.ThreadSimple(
      plugins.path.join(
        plugins.smartpath.get.dirnameFromImportMetaUrl(import.meta.url),
        './tsbundle.class.tsbundleprocess.js'
      ),
      [],
      {
        env: {
          ...process.env,
          tsbundleMode: 'production',
          tsbundleCwd: cwdArg,
          tsbundleFrom: fromArg,
          tsbundleTo: toArg,
          tsbundleBundler: bundlerArg,
          tsbundleArgv: argvArg ? JSON.stringify(argvArg) : '{}',
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
