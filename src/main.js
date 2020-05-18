import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'

Vue.config.productionTip = false

// 导入less
import '@/styles/base.less'
// import './styles/base.less'



//导入外部路由js文件
//element.js 不用挂载 所以不要写from
import '@/plugins/element.js'

//导入 request（封装了axios）
import '@/utils/request.js'

import router from './router/index.js'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
