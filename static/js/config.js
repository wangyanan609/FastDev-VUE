'use strict';

/* 配置项
 *接口IP必须以XXX_HOST命名,
 *接口方法名必须指明GET请求还是POST请求，命名为XXX_GET或XXX_POST,
 *需要远程调取JS的地址必须以XXX_URL命名,
 *其他自定义配置参数避免以上的命名冲突
 */
var config = {
    "map_URL":"http://192.168.91.130:8080/js/map.js",
    "serverPush_URL":"http://192.168.91.130:6201/serverpush.js",
    "uumsUrl_HOST":"http://192.168.56.2:8081",
    "getToken_GET":"/getToken"
};

/* 
 *兼容性写法
 *同时满足script标签直接引入
 *和ES6语法下直接require引入 
*/
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = config;
}
else {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return config;
        });
    }
    else {
        window.config = config;
    }
}
