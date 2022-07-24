import * as plugins from './plugins.js';
import * as paths from '../paths.js';
import * as interfaces from '../interfaces/index.js';
import { logger } from '../tsbundle.logging.js';

export class TsBundleProcess {

  constructor() {
    // Nothing here
  }

  /**
   * creates a bundle for the test enviroment
   */
  public async buildTest(
    fromArg: string,
    toArg: string,
    argvArg: any
  ) {
    // create a bundle
    const esbuild = await plugins.esbuild.build({
      entryPoints: [fromArg],
      bundle: true,
      sourcemap: true,
      format: 'esm',
      target: 'es2020',
      outfile: toArg,
      tsconfig: paths.tsconfigPath
    });
  }

  /**
   * creates a bundle for the production environment
   */
  public async buildProduction(
    fromArg: string,
    toArg: string,
    argvArg: any
  ) {
    // create a bundle
    console.log('esbuild specific:');
    console.log(`from: ${fromArg}`);
    console.log((`to: ${toArg}`));
    const esbuild = await plugins.esbuild.build({
      entryPoints: [fromArg],
      bundle: true,
      sourcemap: true,
      format: 'esm',
      target: 'es2020',
      minify: true,
      outfile: toArg,
      tsconfig: paths.tsconfigPath
    });
  }
}

const run = async () => {
  console.log('running spawned compilation process');
  const transportOptions: interfaces.IEnvTransportOptions = JSON.parse(process.env.transportOptions);
  console.log('=======> ESBUILD');
  console.log(transportOptions);
  process.chdir(transportOptions.cwd);
  console.log(`switched to ${process.cwd()}`);
  const tsbundleProcessInstance = new TsBundleProcess();
  if (transportOptions.mode === 'test') {
    console.log('building for test:')
    tsbundleProcessInstance.buildTest(
      plugins.smartpath.transform.makeAbsolute(transportOptions.from, process.cwd()),
      plugins.smartpath.transform.makeAbsolute(transportOptions.to, process.cwd()),
      transportOptions.argv
    );
  } else {
    console.log('building for production:')
    tsbundleProcessInstance.buildProduction(
      plugins.smartpath.transform.makeAbsolute(transportOptions.from, process.cwd()),
      plugins.smartpath.transform.makeAbsolute(transportOptions.to, process.cwd()),
      transportOptions.argv
    );
  }
};

run();