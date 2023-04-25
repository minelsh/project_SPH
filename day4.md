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