import sourceMaps from 'rollup-plugin-sourcemaps'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
import { terser } from 'rollup-plugin-terser'
import { getIfUtils, removeEmpty } from 'webpack-config-utils'
import pkg from './package.json'

/**
 * @typedef {import('./types').RollupConfig} Config
 */
/**
 * @typedef {import('./types').RollupPlugin} Plugin
 */

const env = process.env.NODE_ENV || 'development'
const { ifProduction } = getIfUtils(env)
const libraryName = 'trackable-entities'

/**
 * @type {string[]}
 */
const external = Object.keys(pkg.peerDependencies) || []

/**
 *  @type {Plugin[]}
 */
const plugins = /** @type {Plugin[]} */ ([
  // Allow json resolution
  json(),

  // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
  commonjs(),

  // Allow node_modules resolution, so you can use 'external' to control
  // which external modules to include in the bundle
  // https://github.com/rollup/rollup-plugin-node-resolve#usage
  nodeResolve(),

  // Resolve source maps to the original source
  sourceMaps(),

  // properly set process.env.NODE_ENV within `./environment.ts`
  replace({
    exclude: 'node_modules/**',
    'process.env.NODE_ENV': JSON.stringify(env),
  }),
])

/**
 * @type {Config}
 */
const CommonConfig = {
  input: {},
  output: {},
  inlineDynamicImports: true,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external,
}

/**
 * @type {Config}
 */
const UMDconfig = {
  ...CommonConfig,
  // input: resolve(PATHS.entry.compiled, `${libraryName}.js`),
  input: `dist/compiled/${libraryName}.js`,
  output: {
    file: `dist/bundles/${libraryName}.umd.js`,
    format: 'umd',
    name: libraryName,
    sourcemap: true,
    globals: {
      'tslib': 'TypeScriptLib'
    }
  },
  plugins: removeEmpty(
    /** @type {Plugin[]} */ ([...plugins, ifProduction(uglify())])
  ),
}

/**
 * @type {Config}
 */
const FESMconfig = {
  ...CommonConfig,
  // input: resolve(PATHS.entry.compiled, `${libraryName}.js`),
  input: `dist/compiled/${libraryName}.js`,
  output: [
    {
      file: `dist/bundles/${libraryName}.es2015.js`,
      format: 'es',
      sourcemap: true,
      globals: {
        'tslib': 'TypeScriptLib'
      }
    },
  ],
  plugins: removeEmpty(
    /** @type {Plugin[]} */ ([...plugins, ifProduction(terser())])
  ),
}

export default [UMDconfig, FESMconfig]
