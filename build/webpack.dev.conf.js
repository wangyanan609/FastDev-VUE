'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');



// ================== 静态模拟接口配置(还有下面devServer里的before钩子函数也是)
var glob = require('glob');
const express = require('express')
const app = express()
var apiRoutes = express.Router()
var appData = require('./config')       //读取build下的配置文件（该配置文件是对外部配置变量的一些操作）
var getApi = appData['get'];            //所有的get请求
var postApi = appData['post'];          //所有的post请求


//查找mock下所有的json文件
let entryJS = {};
entryJS = glob.sync('./mock/*/*.json').reduce(function (prev, curr) {
  prev[curr.slice(7)] = '.' + curr;
  return prev;
}, {});

//合并所有的json文件到一个json中
let jsonData = {};
for (let i in entryJS) {
   let start = i.lastIndexOf("\/");
   let end = i.lastIndexOf(".");
   let key = i.substring(start+1,end); //获取json文件的fileName
   let data = {};
  data[key] = require(entryJS[i]);           //读取对应的json文件,读到的内容（内容为每个接口返回的具体数据）存到对应的key（key为json文件的fileName）里
  jsonData = Object.assign(jsonData,data);   //把所有读到的json文件内容拼成一个json，便于在路由before的钩子里遍历用
}
app.use('/', apiRoutes);
//静态模拟接口配置


const HOST = process.env.HOST || config.dev.host;
const PORT = process.env.PORT && Number(process.env.PORT) || config.dev.port
const localhost = HOST + ":" + PORT;

var MyProcess = require('../config/dev.env');
MyProcess.HOST_ENV = JSON.stringify(localhost);//把本地ip和端口赋值给环境变量

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST,
    port: PORT,
    open: config.dev.autoOpenBrowser,
    openPage: config.dev.openPage, //启动时的默认页，不写默认index.html
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },

    //mock数据的路由钩子配置，返回值为mock里对应的json文件返回值
    before(app) {
      for (let i in getApi) {
        app.get(getApi[i].url, function (req, res) {
          res.json(jsonData[getApi[i].key]);
        });
      }

      for (let j in postApi) {
        app.post(postApi[j].url, function (req, res) {
          res.json(jsonData[postApi[j].key]);
        });
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': MyProcess
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin({
      format: chalk.cyanBright.bold('项目进化') + ' :bar ' + chalk.greenBright.bold(':percent') + ' (:elapsed seconds)',
      width: 30,
      complete: '▆',
      incomplete: '  ',
      clear: false
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static/js/config.js'),
        to: config.dev.outConfigPath,
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static/js/init.js'),
        to: config.dev.assetsSubDirectory+'/js',
        ignore: ['.*']
      }
    ])
  ].concat(utils.htmlPlugin())
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port
      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`进化完成，请访问: http://${devWebpackConfig.devServer.host}:${port}/${devWebpackConfig.devServer.openPage || ''}`]
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))
      resolve(devWebpackConfig)
    }
  })
})



