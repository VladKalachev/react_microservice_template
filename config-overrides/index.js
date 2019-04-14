const rewireCssModules = require('./rewireCssModules')
const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')
const theme = require('../src/theme')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ],
    config
  )

  config = rewireLess.withLoaderOptions({
    modifyVars: theme
  })(config, env)

  config = rewireCssModules(config, env)

  config = rewireReactHotLoader(config, env)

  return config
}
