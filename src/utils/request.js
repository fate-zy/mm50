import Vue from 'vue'
import axios from 'axios'

//设置基础路径
//配置的环境变量里的基地址  （固定格式）process.env.VUE_APP_BASEURL
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
// 允许携带cookies
axios.defaults.withCredentials = true;

//axios全局调用
Vue.prototype.$axios = axios;