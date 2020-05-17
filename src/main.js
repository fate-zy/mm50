import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'

Vue.config.productionTip = false

// 导入less
import '@/styles/base.less'
// import './styles/base.less'



//导入外部路由js文件
import '@/plugins/element.js'
import router from './router/index.js'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
