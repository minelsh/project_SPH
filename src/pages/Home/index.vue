<template>
  <div>
    <!-- 三级联动全局组件:三级联动已经注册为全局组件，因此不需要再引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Fllor></Fllor>
    <Fllor></Fllor>
    <Brand></Brand>
  </div>
</template>

<script>
//引入其余的组件
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Fllor from "@/pages/Home/Fllor";
import Brand from "@/pages/Home/Brand";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Fllor,
    Brand,
  },
};
</script>

<style>
</style>