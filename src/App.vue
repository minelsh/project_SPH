<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口的位置:不设置路由组件不知道在哪里显示 -->
    <router-view></router-view>
    <!-- 在Home、Search是显示的，其他是隐藏的 -->
    <Footer v-show="$route.meta.showFoot"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知Vuex发请求，派发一个action||获取商品分类的三级列表数据
    this.$store.dispatch("categoryList");
    //原本在TypeNav中请求，因为每次刷新页面mounted都走一次都会请求一次，为了优化只请求一次，就放在了这里
  },
};
</script>

<style>
</style>
