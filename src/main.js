import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from 'axios'
import VueAxios from "vue-axios"

Vue.use(ElementUI);
Vue.use(VueAxios, axios)

axios.interceptors.request.use(config => {
    if (/get/i.test(config.method)) {
        config.params = config.params || {};
        config.params.timeset = Date.parse(new Date());
    }
    return config;
}, error => {
    return Promise.reject(error);
})

new Vue({
    el: '#app',
    render: h => h(App)
});