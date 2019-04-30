import * as plugins from './tsbundle.plugins';

const rollupOptions: plugins.rollup.RollupOptions = {
  input: `ts_web/index.ts`,
  output: {
    name: 'tsbundle',
    // file: 'dist_web/bundle.js',
    file: 'dist_web/bundle.js',
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
    plugins.rollupBabel({
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
      ]
    })
  ]
};

async function build() {
  // create a bundle
  const bundle = await plugins.rollup.rollup(rollupOptions);
  bundle.generate(rollupOptions.output);
  bundle.write(rollupOptions.output);
}

build();
