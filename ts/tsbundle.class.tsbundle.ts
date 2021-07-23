import * as plugins from './tsbundle.plugins';
import { logger } from './tsbundle.logging';

export class TsBundle {
  public async buildTest(cwdArg: string, fromArg: string, toArg: string, bundlerArg: 'rollup' | 'parcel') {
    const done = plugins.smartpromise.defer();
    const threadsimple = new plugins.smartspawn.ThreadSimple(plugins.path.join(__dirname, './tsbundle.class.tsbundleprocess.js'), [], {
      env: {
        ...process.env,
        tsbundleMode: 'test',
        tsbundleCwd: cwdArg,
        tsbundleFrom: fromArg,
        tsbundleTo: toArg,
        tsbundleBundler: bundlerArg
      }
    })
    const childProcess = await threadsimple.start();
    childProcess.on('exit', (status) => {
      done.resolve();
    })
    await done.promise;
  };
  
  public async buildProduction(cwdArg: string, fromArg: string, toArg: string) {
    const done = plugins.smartpromise.defer();
    const threadsimple = new plugins.smartspawn.ThreadSimple(plugins.path.join(__dirname, './tsbundle.class.tsbundleprocess.js'), [], {
      env: {
        ...process.env,
        tsbundleMode: 'production',
        tsbundleCwd: cwdArg,
        tsbundleFrom: fromArg,
        tsbundleTo: toArg
      }
    })
    const childProcess = await threadsimple.start();
    childProcess.on('exit', (status) => {
      done.resolve();
    })
    await done.promise;
  };
}
