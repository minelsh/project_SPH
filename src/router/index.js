//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";

//引入路由信息
import routes from "./routes";

//使用插件
Vue.use(VueRouter)

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
    routes,
    //滚动行为：路由跳转之后，让新页面滚动到最顶部开始显示
    scrollBehavior(to,from,savedPosition){
        return{x:0,y:0}//x=0代表水平中间显示，y=0代表垂直方向最顶部
    }
});