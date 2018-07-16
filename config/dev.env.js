'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST_ENV:'',
  ISMOCK_ENV:1 //1:启用，0：禁用
});
