# FastDev-VUE

个人搭建的可快速开发VUE项目的DEMO，其中结合了VUE+WEBPACK+MOCK。通过配置实现DEV环境下MOCK数据对PRO环境下真实接口数据实现模拟，并且本DEMO满足多页与单页混合开发。
***
|Author|梦人无语|
|------|----|
|E-mail|wangyanan609@qq.com|
***

# 安装预览
clone项目地址 git clone git@github.com:wangyanan609/FastDev-VUE.git

安装第三方npm模块 npm install

在根目录下运行 npm run dev

自动打开页面,进行访问

# 项目结构
```

├── build                                      // webpack配置文件
├── config                                     // 项目打包路径
├── dist                                       // 打包项目文件
├── mock                                       // 模拟数据
├── src                                        // 源码目录
│   ├── assets                                 // 公共资源
│   │   ├── css                                // 公共css
│   │   ├── images                             // 公共images
│   │   ├── js                                 // 公共js
│   ├── components                             // 自定义组件
│   ├── pages                                  // 多页面文件
├── static                                     // 静态文件
│   ├── js                                     // 静态JS
│   │   ├── config.js                          // 外部配置JS
│   │   ├── init.js                            // 外部配置初始化JS

```
## 配置启动项
通过config文件夹下的index.js,可对启动IP、端口、启动页面等相关配置

## 是否启用MOCK数据

项目是否启动MOCK数据模拟，可以通过config文件夹下的dev.env.js，通过配置ISMOCK_ENV来决定是否启用。
```
'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST_ENV:'',
  ISMOCK_ENV:1 //1:启用，0：禁用
});

```

## MOCK文件规范

MOCK文件建议按页面分包，并且必须以static下config.js配置的API接口名为文件名，必须是标准的JSON格式。


## 多页+单页混合应用

src的pages存放开发页面,从目录结构可以看出通过多页分包,并在各自页面配置路由,满足各页面的单页应用。注意：各html页面,在head中引入static下的两个静态js，可在此处开放动态加载外部JS。
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0.maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
    <title></title>
    <script src="./config.js"></script>
    <script src="static/js/init.js"></script>
    <script>
      init.OutJS("map"); // 动态加载config中的map.js
      init.OutJS("serverPush"); // 动态加载config中的serverPush.js
    </script>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

## 静态配置文件

static下的静态文件不会被webpack打包压缩,在webpack打包后生成dist内仍然会保留static目录,static下的config.js为配置文件,可用于PRO环境下正式HOST和接口名等配置参数，也可以配置外部需要动态加载的JS，但必须严格按照配置要求进行配置。
```
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
```

## DEV模式关闭MOCK自动处理跨域问题
当接口涉及跨域问题,并且已经关闭MOCK的情况下,DEV环境下请求接口会自动通过proxyTable处理跨域。