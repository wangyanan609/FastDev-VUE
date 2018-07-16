import Vue from 'vue';
import router from './router';
import login from './login.vue';
require('@/assets/js/lib.js');

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        login
    },
    template: '<login/>'
});
