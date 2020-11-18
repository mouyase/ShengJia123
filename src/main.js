import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from 'axios'
import VueAxios from "vue-axios"

Vue.use(ElementUI);
Vue.use(VueAxios, axios)
//axios请求拦截器
axios.interceptors.request.use(config => {
    if (/get/i.test(config.method)) { //判断get请求
        config.params = config.params || {};
        config.params.t = Date.parse(new Date()) / 1000; //添加时间戳
    }
    return config;
}, error => {
    return Promise.reject(error);
})

new Vue({
    el: '#app',
    render: h => h(App)
});