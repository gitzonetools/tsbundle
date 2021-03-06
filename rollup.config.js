import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

const pkg = require('./package.json');

export default {
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
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true, tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        inlineSourceMap: true,
        noEmitOnError: true,
        lib: ['es2016', 'es2017', 'dom'],
        noImplicitAny: false
      }
    } }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    commonjs({
      namedExports: {
          'node_modules/@pushrocks/smartstate/dist/index.js': ['Smartstate']
      }
    }),

    // Resolve source maps to the original source
    sourceMaps(),
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      babelrc: false,
      presets: [["@babel/preset-env", { modules: false }]]
    })
  ]
};
