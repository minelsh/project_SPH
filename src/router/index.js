//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";

//使用插件
Vue.use(VueRouter)
//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

//先把VueRouter原型对象的push，先保存一份(备份)
let originPush=VueRouter.prototype.push;

//重写push|replace方法(push有历史记录，replace没有)
//第一个参数：告诉原来的push方法，你往哪里跳转（以及传哪些参数）
//第二三个参数：成功和失败的回调
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve && reject){
        //call || apple区别：
        //相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve && reject){
        //call || apple区别：
        //相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

//配置路由
export default new VueRouter({
    //配置路由
    routes:[
        {
            path:'/home',
            name:'home',
            component:Home,
            meta:{
                showFoot:true
            }
        },
        {
            path:'/login',
            name:'login',
            component:Login,
            meta:{
                showFoot:false
            }
        },
        {
            path:'/register',
            name:'register',
            component:Register,
            meta:{
                showFoot:false
            }
        },
        {
            path:'/search/:keyword?',
            name:'search',
            component:Search,
            meta:{
                showFoot:true
            },

            //路由组件能不能传递props数据
            //第一种，布尔值写法
            // props:true
            //第二种，对象写法:额外给路由组件传递一些props
            // props:{a:1,b:2}
            //第三章：函数写法：可以params参数、query参数，通过props传递给路由组件
            props:($route)=>{
                return {keyword:$route.params.keyword,
                k:$route.query.k}
            }
        },
    ]
})