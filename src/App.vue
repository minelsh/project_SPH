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
};
</script>

<style>
</style>
