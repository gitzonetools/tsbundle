import * as plugins from './tsbundle.plugins';
import { logger } from './tsbundle.logging';

export class TsBundle {
  /**
   * the basic default options for rollup
   */
  public getBaseOptions(
    fromArg: string = `ts_web/index.ts`,
    toArg: string = 'dist_bundle/bundle.js'
  ) {
    logger.log('info', `from: ${fromArg}`);
    logger.log('info', `to: ${toArg}`);

    const baseOptions: plugins.rollup.RollupOptions = {
      input: fromArg,
      output: {
        name: 'tsbundle',
        file: toArg,
        format: 'iife',
        sourcemap: true
      },
      // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
      external: [],
      watch: {
        include: ['src/**']
      },
      plugins: [
        // Compile TypeScript files
        plugins.rollupTypescript({
          declaration: false,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          inlineSourceMap: true,
          noEmitOnError: true,
          lib: ['esnext', 'dom'],
          noImplicitAny: false,
          target: 'es2018'
        }),
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        plugins.rollupResolve(),
        plugins.rollupCommonjs({
          namedExports: {
            'node_modules/@pushrocks/smartstate/dist/index.js': ['Smartstate']
          }
        }),

        // Resolve source maps to the original source
        plugins.rollupSourceMaps()
        /*plugins.rollupBabel({
          runtimeHelpers: true,
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                targets: {
                  chrome: '41'
                }
              }
            ]
          ],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                regenerator: true
              }
            ]
          ]
        })*/
      ]
    };
    return baseOptions;
  }

  public getOptionsTest(fromArg: string, toArg: string): plugins.rollup.RollupOptions {
    return this.getBaseOptions(fromArg, toArg);
  }

  public getOptionsProduction(fromArg: string, toArg: string): plugins.rollup.RollupOptions {
    const productionOptions = this.getBaseOptions(fromArg, toArg);
    productionOptions.plugins.push(
      plugins.rollupTerser({
        compress: true,
        mangle: true,
        sourcemap: true
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
  public async buildTest(fromArg: string, toArg: string) {
    // create a bundle
    logger.log('info', `bundling for TEST!`);
    const buildOptions = this.getOptionsTest(fromArg, toArg);
    const bundle = await plugins.rollup.rollup(buildOptions);
    bundle.generate(buildOptions.output as plugins.rollup.OutputOptions);
    await bundle.write(buildOptions.output as plugins.rollup.OutputOptions);
    logger.log('ok', `Successfully bundled files!`);
  }

  /**
   * creates a bundle for the production environment
   */
  public async buildProduction(fromArg: string, toArg: string) {
    // create a bundle
    logger.log('info', `bundling for PRODUCTION!`);
    const buildOptions = this.getOptionsProduction(fromArg, toArg);
    const bundle = await plugins.rollup.rollup(buildOptions);
    bundle.generate(buildOptions.output as plugins.rollup.OutputOptions);
    await bundle.write(buildOptions.output as plugins.rollup.OutputOptions);
    logger.log('ok', `Successfully bundled files!`);
  }
}
