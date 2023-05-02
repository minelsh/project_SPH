import Vue from 'vue'
import App from './App.vue'

//定义全局组件：在入口文件注册一次之后，在任何组件都可以使用
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//注册全局组件。第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//引入mockServe
import '@/mock/mockServer'

//引入swiper样式：因为其他地方也要用
import "swiper/css/swiper.css";


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  
  //全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this
  },
  //注册路由:当书写router的时候，组件身上都拥有$route,$router
  router,
  //注册仓库,组件实例的身上会多一个书写叫$store属性
  store
}).$mount('#app')
