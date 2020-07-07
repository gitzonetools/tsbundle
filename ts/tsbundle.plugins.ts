// node native
import * as path from 'path';

export { path };

// pushrocks scope
import * as smartcli from '@pushrocks/smartcli';
import * as smartfile from '@pushrocks/smartfile';
import * as smartlog from '@pushrocks/smartlog';
import * as smartlogDestinationLocal from '@pushrocks/smartlog-destination-local';
import * as smartparcel from '@pushrocks/smartparcel';

export { smartcli, smartfile, smartlog, smartlogDestinationLocal, smartparcel };

// third party scope
import * as rollup from 'rollup';
import rollupBabel from 'rollup-plugin-babel';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupJson from '@rollup/plugin-json';
import rollupResolve from '@rollup/plugin-node-resolve';
import rollupSourceMaps from 'rollup-plugin-sourcemaps';
import { terser as rollupTerser } from 'rollup-plugin-terser';
import rollupTypescript from '@rollup/plugin-typescript';

import * as htmlMinifier from 'html-minifier';

export {
  rollup,
  rollupBabel,
  rollupCommonjs,
  rollupJson,
  rollupResolve,
  rollupSourceMaps,
  rollupTerser,
  rollupTypescript,
  htmlMinifier
};
