swiper:
当页面的结构已经有了的情况下，才可以初始化 swiper 实例（所以 js 写在最后面）
完美解决：watch+nextTick

1）轮播图最完美的解决方案：watch 数据监听
监听已有数据变化
watch 可以观测到数据的变化并且赋值。但是无法观测到 v-for 对于结构的执行是否已经完成。需要 v-for 完成之后才会有结构。所以光用 watch 不行
2）结合 nextTick 一起使用：将回调延迟到下次 DOM 更新循环之后执行。
再修改数据之后使用它，然后等待 DOM 更新。
Vue.nextTick([callback,context])用法：在下次 DOM 更新(服务器数据已经回来，结构已经形成) 循环结束之后(v-for 结束之后，结构已经有了) 执行延迟回调。在修改数据之后(也就是我们修改的 bannerList) 立即使用这个方法，获取更新后的 DOM。

    一、开发 floor 组件

    1）数据库请求及其显示到 view 上面的步骤：
    =>axios 里面获取一下数据
    =>store 里面进行三连环(action,mutation,state)

    =>触发 action 请求 store 数据：因为 json 里面有两个对象数据，然后需要 v-for 遍历两个组件出来。所以我们需要在 Home 的 index 里面去请求。（这和轮播图就不一样了，不能在组件内部去 for 了。因为需要 vfor 两个组件出来）

    =>v-for 显示数据(也可以在自定义标签中使用)
    =>floor 数据在父组件中，需要传递给子组件 floor 中。props
    =>动态展示数据,修改组件里的 view，用{{}}去动态展示

    重点解释一下派发 action 请求，先在需要派发的组件下。

    1.用 mounted(){this.$store.dispatch('getFloorList')}。（拿到服务器里的数据存在 store 中.vuex 里面有数据）

    2.引入 mapState。利用 computed:{...mapState({floorList:state=>state.home.floorList})}。（让 组件 拿到数据，该处因为写在 home 组件中，是 home 身上有了 floorList 的数据）



    二、组件通信的方式有哪些？面试频率高
    props:用于父子组件通信
    自定义事件：@on @emit 可以实现子给父传
    全局事件总线：$bus 全能
    pubsub-js:vue 中很少用 全能
    插槽
    vuex



    三、把首页当中的轮播图拆分成一个共用全局组件


    四、search模块开发
    1：静态页面+静态组件拆分出来
    2：发请求（API）
    3：vuex（三连环）
    4：组件获取仓库数据，动态展示数据


    五、面包屑的开发
    1）动态开发面包屑中的分类名
    编程式导航路由跳转【自己跳自己】

    2）动态开发面包屑中的搜索栏关键字
    2.1当面包屑中的关键字清除以后，需要让兄弟组件Header组件中的关键字清除
    设计组件通信：$bus
