import * as plugins from './tsbundle.plugins';
import { logger } from './tsbundle.logging';

export class TsBundle {
  /**
   * the basic default options for rollup
   */
  public getBaseOptions(fromArg: string = `ts_web/index.ts`, toArg: string = 'dist_web/bundle.js') {
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
          useTsconfigDeclarationDir: true,
          tsconfigOverride: {
            compilerOptions: {
              declaration: true,
              emitDecoratorMetadata: true,
              experimentalDecorators: true,
              inlineSourceMap: true,
              noEmitOnError: true,
              lib: ['es2017', 'dom'],
              target: 'es2017',
              noImplicitAny: false
            }
          }
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
        plugins.rollupSourceMaps(),
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
    return this.getBaseOptions();
  }

  public getOptionsProduction(fromArg: string, toArg: string): plugins.rollup.RollupOptions {
    const productionOptions = this.getBaseOptions();
    productionOptions.plugins.push(plugins.rollupTerser());
    return productionOptions;
  }

  constructor() {}

  /**
   * creates a bundle for the test enviroment
   */
  public async buildTest(fromArg: string, toArg: string) {
    // create a bundle
    logger.log('info', `bundling for TEST!`);
    const bundle = await plugins.rollup.rollup(this.getOptionsTest(fromArg, toArg));
    bundle.generate(this.getOptionsTest(fromArg, toArg).output);
    await bundle.write(this.getOptionsTest(fromArg, toArg).output);
    logger.log('ok', `Successfully bundled files!`);
  }

  /**
   * creates a bundle for the production environment
   */
  public async buildProduction(fromArg: string, toArg: string) {
    // create a bundle
    logger.log('info', `bundling for PRODUCTION!`);
    const bundle = await plugins.rollup.rollup(this.getOptionsProduction(fromArg, toArg));
    bundle.generate(this.getOptionsProduction(fromArg, toArg).output);
    await bundle.write(this.getOptionsProduction(fromArg, toArg).output);
    logger.log('ok', `Successfully bundled files!`);
  }
}
