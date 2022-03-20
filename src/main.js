// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vant from 'vant';
import WebIM from './utils/WebIM';
import store from './store';

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'



import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Router from 'vue-router'

Vue.config.productionTip = false
Vue.use(Antd)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(ElementUI).use(vant)
Vue.config.productionTip = false

/* eslint-disable no-new */
window.Vue = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store,
    WebIM,
    render: h => h(App)
})



// -----------zhou----------------
import axios from 'axios'
import NProgress from 'nprogress' // 引入nprogress插件
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:9001'
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API_ZZ
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

if (process.env.NODE_ENV !== "production") {
  Vue.createElement = new Vue().$createElement;
  // Vue.use(NotificationPlugin);
  Vue.config.devtools = true;
}

// 创建axios实例
axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: process.env.VUE_APP_BASE_API_ZZ,
  baseURL: 'http://localhost:9001',
  // 超时
  timeout: 10000
})
// 感觉这一段没有用
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.$http = axios.create({
  baseURL: "/api",
  headers:{
    post: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
  }
})

/**
 *  axios请求拦截器
 */
axios.interceptors.request.use(config => {
  NProgress.start() // 设置加载进度条(开始..)
  config.headers.Authorization = window.sessionStorage.getItem('JWT_TOKEN');
  console.log("config",config);
  return config;
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(
  function (response) {
    NProgress.done() // 设置加载进度条(结束..)
    if (response.data.code == 40300) { //如果返回的code==40300说明token错误或者token过期
      window.sessionStorage.clear();
      var vm = new Vue();
      vm.$message.error("您的登入状态已失效,请您重新登入~")
      return router.push("/login");
    } else {
      return Promise.resolve(response.data);
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 使用loading 组件

Vue.config.productionTip = false;
Vue.prototype.request = request;

export default Vue;
