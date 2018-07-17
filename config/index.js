'use strict';
const path = require('path');

module.exports = {
  // 【views】，默认为views，修改这里的配置的同时，也要同时重命名/src/views的这个文件夹名称
  // 对应webpack.dev.conf.js 多页面配置的文件夹名称
  // moduleName:'pages',
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    outConfigPath:'./',
    // 这里配置代理，但是只能用于开发
    proxyTable: {
      '/ubms': {
          target: 'http://192.168.91.121:8080/ubms-server', // 设置你调用的接口域名和端口号 别忘了加http
          changeOrigin: true,
          pathRewrite: {
            '^/ubms': ''// 这里理解成用‘/apii’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://192.168.91.121:8080/user/add'，直接写‘/api/user/add’即可
          }
      }
  },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 9001, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    openPage: 'login.html',// 启动页面
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
