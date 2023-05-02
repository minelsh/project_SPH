复习:
1）商品分类的三级列表由静态变为动态形式【获取服务器数据：解决跨域问题】
2）函数防抖与节流【高频面试】
3）路由跳转：声明式导航 router-link，编程式导航：push|replace
编程导航的问题：不知道具体点的是哪个子属性，使用自定义属性用 dataset 获取

一、开发 Search 模块中的 TypeNav 商品分类模块(三级联动)

    1.search组件中三级联动菜单默认隐藏，在typenav中使用v-show判断。用一个属性show默认为true显示。因为从typenav跳转到search，show也会跟随过来。又会经历一次ty的生命周期函数，所以在ty的生命周期函数中将show改变，这样跳转到search的时候默认隐藏
    2.关于search页面中鼠标移入三级菜单显示，移出隐藏：在typeNav中因为是要以最外部盒子作为进入离开判定标准，所以在外部盒子加入鼠标移入移出事件，再在事件中改变show的true或者是false

    3.开发search模块中的TypeNav商品分类菜单（过渡动画效果）
    过渡动画：前提组件|元素务必要有 v-if | v-show 才可以进行过渡动画


    4.我们把向vuex库中发起数据action请求放在App.vue中。这样只会发起一次请求

    5.合并路由传递参数（我们用的编程式导航传参 $router.push() 方法。
    因为我们设定的，搜索栏传递的是params参数，三级菜单传递的是query参数。参数是分开的。
    但是如果我们在搜索栏搜索出来的页面中点击三级菜单，参数就只会有一个query或者params。这样不行，所以我们在TypeNav和Header里都做了合并参数处理

二、Mock：开发 home 首页轮播图精灵图(ListContainer 组件) 和 家用电器列表(Floor 组件)

注意：mock 不会真的发请求，它只会在浏览器中自己使用，不会发请求给数据库。它的请求操作流程和 ajax 几乎一样

    1.服务器返回的数据（接口）只有商品分类菜单的数据。对于这两个组件是没有的。
    所以我们需要用mock数据

    2.mock使用步骤：
    1）在src文件夹中创建mock文件夹
    2）准备JSON数据(在mock文件夹中创建json文件)
    注意：把图片放进public里面，因为打包的时候public生成dist文件会原封不动
    3）开始mock虚拟，通过mock实现（创建mockServe.js，通过mockjs插件模拟数据
    4）把mockServer.js文件在入口文件中引入（至少要执行一次，才能模拟数据）
    5）day1笔记中的ajax请求流程

三、swiper 使用：轮播图

    第一步：引如swiper样式（JS|CSS）：因为很多地方都可以用到这个轮播图，所以在main.js中引入，而且引入的样式直接写import 'swiper/css/swiper.css'。样式是这样的
    第二步：需要的页面引入swiper包
    第三步：页面中的结构一定要有
    第四步：new Swiper实例【轮播图添加动态效果】
