// ------------------------------------------------------------------------------------------
// setup
// ------------------------------------------------------------------------------------------

import path from 'path'
import license from 'rollup-plugin-license'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import buble from '@rollup/plugin-buble'
import { uglify } from 'rollup-plugin-uglify'

const pkg = require('../package.json')
const external = Object.keys(pkg.dependencies || {})
const pkgName = pkg.name
const className = pkgName.replace(/(^\w|-\w)/g, c => c.replace('-', '').toUpperCase())

function output (ext, format = 'umd') {
  return {
    name: className,
    file: `dist/${pkgName}.${ext}`,
    format: format,
    exports: 'named',
  }
}

// ------------------------------------------------------------------------------------------
// build
// ------------------------------------------------------------------------------------------

const umd = {
  input: 'src/index.ts',
  external: external,
  output: output('js'),
  plugins: [
    typescript({
      cacheRoot: `build/.rpt2_cache`
    }),
    license({
      banner: {
        content: {
          file: path.join(__dirname, 'banner.txt')
        }
      },
    }),
    commonjs(),
    buble()
  ]
}

const min = Object.assign({}, umd, {
  output: output('min.js'),
  plugins: [...umd.plugins, uglify()]
})

const es = Object.assign({}, umd, {
  output: output('esm.js', 'es')
})

export default [umd, min, es]
