export * from '../plugins.js';

// third party scope
import * as rollup from 'rollup';
import rollupBabel from 'rollup-plugin-babel';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupJson from '@rollup/plugin-json';
import rollupResolve from '@rollup/plugin-node-resolve';
import rollupSourceMaps from 'rollup-plugin-sourcemaps';
import { terser as rollupTerser } from 'rollup-plugin-terser';
import rollupTypescript from '@rollup/plugin-typescript';

export {
  rollup,
  rollupBabel,
  rollupCommonjs,
  rollupJson,
  rollupResolve,
  rollupSourceMaps,
  rollupTerser,
  rollupTypescript,
};
