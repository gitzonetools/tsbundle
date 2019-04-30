import * as rollup from 'rollup';
import rollupResolve from 'rollup-plugin-node-resolve';
import rollupCommonjs from 'rollup-plugin-commonjs';
import rollupSourceMaps from 'rollup-plugin-sourcemaps';
import rollupTypescript from 'rollup-plugin-typescript2';
import rollupBabel from 'rollup-plugin-babel';

export {
  rollup,
  rollupResolve,
  rollupCommonjs,
  rollupSourceMaps,
  rollupTypescript,
  rollupBabel
};