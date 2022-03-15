import * as plugins from './plugins.js';
import * as interfaces from '../interfaces/index.js';
import { logger } from '../tsbundle.logging.js';

export class TsBundleProcess {

  constructor() {
    // Nothing here
  }

  /**
   * creates a bundle for the test enviroment
   */
  public async buildTest (
    fromArg: string,
    toArg: string,
    argvArg: any
  ) {
    const parsedPath = plugins.path.parse(toArg);
    const parcelInstance = new plugins.smartparcel.Parcel(
      fromArg,
      parsedPath.dir,
      parsedPath.base
    );
    await parcelInstance.build();
  }

  /**
   * creates a bundle for the production environment
   */
  public async buildProduction (
    fromArg: string,
    toArg: string,
    argvArg: any
  ) {
    // create a bundle
    const parsedPath = plugins.path.parse(toArg);
    const parcelInstance = new plugins.smartparcel.Parcel(
      fromArg,
      parsedPath.dir,
      parsedPath.base
    );
    await parcelInstance.build();
  }
}

const run = async () => {
  console.log('running spawned compilation process');
  const transportOptions: interfaces.IEnvTransportOptions = JSON.parse(process.env.transportOptions);
  console.log('bundling with parcel:');
  console.log(transportOptions);
  process.chdir(transportOptions.cwd);
  console.log(`switched to ${process.cwd()}`);
  const tsbundleProcessInstance = new TsBundleProcess();
  if (transportOptions.mode === 'test') {
    tsbundleProcessInstance.buildTest(
      transportOptions.from,
      transportOptions.to,
      transportOptions.argv
    );
  } else {
    tsbundleProcessInstance.buildProduction(
      transportOptions.from,
      transportOptions.to,
      transportOptions.argv
    );
  }
};

run();
