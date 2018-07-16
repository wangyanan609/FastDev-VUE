//配置文件处理并初始化
var Init = function () {
  this.HOST = [];
  this.URL = [];
  for (var key in config) {
    if (key.indexOf("_HOST") >= 0) {
      this.HOST.push({
        key: key,
        url: config[key],
        proxyTableKey: '/api' + this.HOST.length   //用作dev环境下代理的域名别名，(config/index.js/proxyTable)
      });
    } else if (key.indexOf("_URL") >= 0) {
      this.URL.push({
        key: key,
        url: config[key]
      });
    }
  }
}
//观察者：监听环境变量
Init.prototype.Observer = function (MyProcess) {
  if (MyProcess.NODE_ENV == 'development' && MyProcess.ISMOCK_ENV) {
    //dev 无服务的环境，用本地json数据模拟
    for (var i = 0; i < this.HOST.length; i++) {
      var host = this.HOST[i];
      config[host.key] = "http://" + MyProcess.HOST_ENV; //模拟数据的时候，接口方法用本项目下路由路径来模拟
    }
  } else if (MyProcess.NODE_ENV == 'development' && !MyProcess.ISMOCK_ENV) {
    //dev 有服务的环境，配置代理到本地的关键字，如‘/api’
    for (let i = 0; i < this.HOST.length; i++) {
      var host = this.HOST[i];
      config[host.key] = host.proxyTableKey;
    }
  }
}
//启动加载外部JS
Init.prototype.OutJS = function (outJSName) {
  outJSName += "_URL";
  for (let i = 0; i < this.URL.length; i++) {
    var item = this.URL[i]
    if (item.key == outJSName)
      document.write("<script type='text/javascript' src='" + item.url + "'></script>");
  }
}

window.init = new Init();
