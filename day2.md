1.编程式路由跳转到当前路由(参数不变)，多次执行会抛出 NavigationDuplicated 的警告错误？
--路由跳转有两种形式：编程式和声明式导航
--声明式导航没有这类错误，因为 vue-router 底层已经处理好了
1.1 为什么编程式导航进行路由导航的时候有这个错误？
最新的 vue-router 引入了 promise。push 方法会调用 promise 操作。promise 需要成功的回调和失败的回调。
1.2(治标) 通过给 push 方法传递相应的成功、失败的回调可以解决。但是治标不治本，因为在其他组件中，不应该会在每个 push 下面都写回调吧。
1.3
this:当前组件实例(search)
this.$router 属性:当前的这个属性，属性值是 VueRouter 类的一个实例，当在入口文件注册路由的时候，给组件实例添加$router|$route 属性
push:VueRouter 类的一个实例，是原型对象的方法，VueRouter.prototype.push = ()=>{ }

1.4(治本) 在 router 的 index.js 中重写 push||replace 方法

2.Home 模块组件拆分
--先把静态页面完成
--拆分出静态组件
--获取服务器的数据展示
--动态业务

3.三级联动组件完成
---由于 3 级联动，在 Home、Search、Detail，把三级联动注册为全局组件
好处：只需要注册一次，就可以在项目任意地方使用

4.完成其余静态组件
HTML+CSS+图片资源

5.axios 二次封装
XMLHttpRequest、fetch、JQ、axios
5.1 为什么需要进行二次封装 axios？
主要是为了请求拦截器，响应拦截器：当发请求之前可以处理一些业务和当服务器数据返回以后，可以处理一些事情

5.2 在项目中经常有 API 文件夹【axios】
接口当中：路径都带有/api
baseURL 作用自动带上 api:'/api'

6.接口统一管理

项目很小：完全可以在组件的生命周期函数中发请求

项目大:axios.get('xxx')，需要统一管理

6.1.跨域问题
JSONP CROS 代理服务器
在 vue.config.js 里面写我们的代理服务器

7.nprogress 进度条的使用
只要发请求，就有进度条出现。请求完成就消失。
在响应拦截器里去做

start:进度条开始
done:进度条结束
进度条颜色可以修改，在 node_modules 里面去找 nprogress.css

8.vuex 状态管理库

8.1 vuex 是什么

vuex 是官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据
切记，如果项目很小，就不需要 Vuex。如果项目很大，数据很多，维护很费劲那就需要 Vuex。
state
mutations
actions
getters
modules

8.2vuex 基本使用
store 仓库

8.3 Vuex 实现模块式开发
如果项目过大，组件过多，接口也很多，数据也很多。可以让 Vuex 实现模块化开发(每个小仓库取自己的名字分别存储每个模块的数据)

模拟 state 存储数据,如果项目太大，里面存放的东西太多了
{
count:1,
search:{a:1},
pay:{},
.....
}

9.完成 TypeNav 三级联动展示数据业务 1.先 axios 二次封装 2.因为这个三级表单展示在 home 中，所以在 home 的 store 仓库里写好向服务器请求数据（actions），actions 请求好之后用 commit 向 mutations 发起修改请求。 3.在 TypeNav 的 index.vue 里面去使用，先引入 mapState。用它来获取返回数据。再在模板中用插值语法去显示

数据设计:一级分类中有 child 二级分类，二级又有三级
[{id:1,name:'电子书',child:[{id:2,nmae:'喜羊羊',child:[{id:3,name:'哈哈'}]}]}]
