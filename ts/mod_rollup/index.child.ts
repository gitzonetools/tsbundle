import * as plugins from './plugins.js';
import * as interfaces from '../interfaces/index.js';
import { logger } from '../tsbundle.logging.js';

export class TsBundleProcess {
  /**
   * the basic default options for rollup
   */
  public getBaseOptions(
    fromArg: string = `ts_web/index.ts`,
    toArg: string = 'dist_bundle/bundle.js',
    argvArg: any
  ) {
    logger.log('info', `from: ${fromArg}`);
    logger.log('info', `to: ${toArg}`);

    const baseOptions: plugins.rollup.RollupOptions = {
      input: fromArg,
      output: {
        name: 'tsbundle',
        file: toArg,
        format: 'iife',
        sourcemap: true,
      },
      // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
      external: [],
      watch: {
        include: ['src/**'],
      },
      plugins: [
        // Compile TypeScript files
        (plugins.rollupTypescript as any)({
          include: plugins.path.parse(fromArg).dir
            ? plugins.path.parse(fromArg).dir + '/**/*.ts'
            : '**/*.ts',
          declaration: false,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          inlineSourceMap: true,
          noEmitOnError: true,
          lib: ['dom'],
          noImplicitAny: false,
          target: 'es2020',
          module: 'es2020',
          moduleResolution: 'node12',
          allowSyntheticDefaultImports: true,
          importsNotUsedAsValues: 'preserve',
          ...(argvArg && argvArg.skiplibcheck
            ? {
                skipLibCheck: true,
              }
            : {}),
          ...(argvArg && argvArg.allowimplicitany
            ? {
                noImplicitAny: false,
              }
            : {}),
          ...(argvArg && argvArg.commonjs
            ? {
                module: 'commonjs',
                moduleResolution: 'node',
              }
            : {}),
        }),
        (plugins.rollupJson as any)(),
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        plugins.rollupResolve(),
        (plugins.rollupCommonjs as any)({}),

        // Resolve source maps to the original source
        plugins.rollupSourceMaps(),
      ],
    };
    return baseOptions;
  }

  public getOptionsTest(
    fromArg: string,
    toArg: string,
    argvArg: any
  ): plugins.rollup.RollupOptions {
    return this.getBaseOptions(fromArg, toArg, argvArg);
  }

  public getOptionsProduction(
    fromArg: string,
    toArg: string,
    argvArg: any
  ): plugins.rollup.RollupOptions {
    const productionOptions = this.getBaseOptions(fromArg, toArg, argvArg);
    productionOptions.plugins.push(
      plugins.rollupTerser({
        compress: true,
        mangle: true,
      })
    );
    return productionOptions;
  }

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
    logger.log('info', `bundling for TEST!`);
    const buildOptions = this.getOptionsTest(fromArg, toArg, argvArg);
    const bundle = await plugins.rollup.rollup(buildOptions);
    bundle.generate(buildOptions.output as plugins.rollup.OutputOptions);
    await bundle.write(buildOptions.output as plugins.rollup.OutputOptions);
    logger.log('ok', `Successfully bundled files!`);
    process.exit(0);
  }

  /**
   * creates a bundle for the production environment
   */
  public async buildProduction(fromArg: string, toArg: string, argvArg: any) {
    // create a bundle
    logger.log('info', `bundling for PRODUCTION!`);
    const buildOptions = this.getOptionsProduction(fromArg, toArg, argvArg);
    const bundle = await plugins.rollup.rollup(buildOptions);
    bundle.generate(buildOptions.output as plugins.rollup.OutputOptions);
    await bundle.write(buildOptions.output as plugins.rollup.OutputOptions);
    logger.log('ok', `Successfully bundled files!`);
    process.exit(0);
  }
}

const run = async () => {
  console.log('running spawned compilation process');
  const transportOptions: interfaces.IEnvTransportOptions = JSON.parse(process.env.transportOptions);
  console.log('bundling with rollup:');
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
