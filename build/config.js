'use strict';
const config = require('../static/js/config.js');   //调用外部配置文件，获取所有接口方法信息（用于dev环境下mock数据使用）、域名信息（用于配置dev环境下的代理）
let apiGet = [];
let apiPost = [];
let host = [];
for (var key in config) {
    if (key.indexOf("_GET") >= 0) {
        apiGet.push({
            "url": config[key],
            "key": key
        })
    } else if (key.indexOf("_POST") >= 0) {
        apiPost.push({
            "url": config[key],
            "key": key
        })
    } else if (key.indexOf("_HOST") >= 0) {
        host.push({
            "url": config[key],
            "key": key,
            "proxyTableKey": '"/api'+host.length+'"'   //用作dev环境下代理的域名别名，配在环境变量里(config/dev.env.js/proxyTableKey_arr)
        })
    }
}

module.exports = {
    "get": apiGet,
    "post": apiPost,
    "host": host
}











