//导包
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'

// 路由跳转出错处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//注册路由
Vue.use(VueRouter)

//配置实例化
let router=new VueRouter({
routes:[
    {
        path:"/login",
        component:login
    },
    //路由重定向
    {
        path:'*',
        redirect:"/login"
    }
]
})

// 输出 router实例对象
export default router