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
