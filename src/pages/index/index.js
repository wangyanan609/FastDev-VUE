import Vue from 'vue';
import Index from './index.vue'; // 说明：若js和vue名称相同，需要加上后缀.vue，如页面login
import router from './router';
require('@/assets/js/lib.js');

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        Index
    },
    template: '<Index/>'
});
