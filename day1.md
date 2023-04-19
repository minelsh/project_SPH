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
项目的中路由一般放置在router文件夹中
