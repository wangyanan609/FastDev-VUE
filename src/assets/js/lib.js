import Vue from 'vue';
import api from '@/assets/js/http.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 将API方法绑定到全局
Vue.prototype.$api = api;
Vue.config.productionTip = false;
Vue.use(ElementUI);

// 启动观察者模式
init.Observer(process.env);
