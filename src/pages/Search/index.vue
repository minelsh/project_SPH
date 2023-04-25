<template>
  <div>
    <!-- 这是Search组件模块 -->
    <TypeNav></TypeNav>
  </div>
</template>
  
  <script>
export default {
  name: "Search",
  //路由组件可以传递props
  props: ["keyword", "k"],
};
</script>
  
  <style>
</style>