一、相关文件说明

1.node+webpack+淘宝镜像

2.node_modules 文件夹:项目依赖

3.public 文件夹:一般放一些静态资源(图片),需要注意，放在 public 文件夹种的静态资源，webpack 进行打包的时候，会原封不动的打包到 dist 文件夹中

4.src 文件夹(程序员源代码文件夹):

    assets 文件夹：一般是静态资源(多个组件共用的静态资源),放在 assets 文件夹里的静态资源，在 webpack 打包的时候，webpack 会把静态资源当作一个模块，打包 JS 文件里面

    components文件夹：一般放置的是非路由组件(全局组件)

    App.vue：唯一的根组件

    main.js：程序的入口文件，也是最开始执行的文件

    gitignore：github用的

    babel.config.js：配置文件(babel相关，相当于翻译官:把es6语法翻译成es5，兼容更好)

    package.json：相当于项目的身份证。记录项目叫做什么，项目怎么运行，项目有哪些依赖

    package-lock.json：缓存性的文件

    README.md：笔记

二、项目的其他配置

1.项目运行起来的时候，让浏览器自动打开。
--找到 package.json 文件中

2.eslint 校验工具的取消
---vue.config.js 文件中

3.jsconfig.json 默认配置别名@提示:[@ 代表的是 src 文件夹]

三、项目路由的分析
1、vue-router
前端所谓路由:KV 键值对。
key:URL（地址栏中的路径）
value:响应的路由组件

2、路由分析
是分为上中下三个部分的

    路由组件：Home 首页的路由组件，Search 路由组件，login登录路由，Refister注册路由

    非路由组件：Header[每个页面都有]
    Footer[在首页，搜索页]，但是在登录，注册页面是没有的

3、开发项目：
=>书写静态页面
=>拆分组件
=>获取服务器的数据动态展示
=>完成相应的动态业务逻辑

4.使用组件 -创建 -引入 -注册 -模块使用

四、路由组件的搭建
1、vue-router 安装配置
-components 文件夹：非路由组件
-pages 文件夹：经常放路由组件

2、配置路由
项目的中路由一般放置在 router 文件夹中

3.$route和$router，注册完路由，不管路由组件还是非路由都有这两个属性

$route:一般获取路由信息【路径、query、params等】
$router:一般进行编程式导航进行路由跳转【push|replace】

五、路由的跳转
路由的跳转有两种形式：
声明式导航 router-link，进行路由的跳转
编程式导航 push|replace，可以进行路由跳转

    编程式导航：声明式导航能做的，编程式都可以做。而且还可以做一些其他的业务逻辑，

六、Footer 组件的显示与隐藏：v-show|v-if

    1、Footer 组件：在 Home、Search 显示 Footer 组件
    在登录、注册的时候隐藏

    2、外面可以根据组件身上的$route的path属性去v-show展示与隐藏

    3、可以利用路由元信息【meta】，路由需要配置对象，它的key不能瞎写

七、路由传参，参数有几种写法
params 参数：属于路径当作的一部分，需要注意的是，在配置路由的时候，需要占位。用字符串，模板字符串和
对象（常用）三种写法。当用对象写法的时候需要给 routes 命名

query 参数：不属于路径当中的一部分，类似于 ajax 中的 queryString /home?k=v&v=k,不需要占位

八、向数据库发起 ajax 请求。

    1）在api中写好axios封装

    2）在api中的index.js中引入axios的封装和使用函数(函数中要写请求的地址)：这里是真正的请求url

    3）vuex的action请求方法书写在store里面，action里的每一个请求数据方法需要调用到api的index里面的使用函数获取请求的url（store中的三连环书写，state和mutations和actions按照我里面写的来就行）

    4）在需要请求的组件中派发action，向vuex发起ajax请求，将数据存储到仓库中：this.$store.dispatch('action中的请求(第三步中的action方法)')

    5）至此vuex仓库中已经有数据了，现在需要在组件上展示。

    6）在组件中的计算属性里使用...mapState才行（见TypeNav流程即可）
