<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(slide, index) in skuImageList"
        :key="slide.id"
      >
        <img
          :src="slide.imgUrl"
          :class="{ active: currentIndex == index }"
          @click="changeCurrentIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0, //高亮属性，默认第一个为高亮
    };
  },
  props: ["skuImageList"],
  watch: {
    //监听数据：保证数据一定是好的，但是不能保证v-for遍历结构是否成功
    skuImageList(newValue, oldValue) {
      this.$nextTick(() => {
        new Swiper(this.$refs.cur, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          //设置一行显示几个图片
          slidesPerView: 3,
          //设置滑动一次滑走几个图片
          slidesPerGroup: 1,
        });
      });
    },
  },
  methods: {
    changeCurrentIndex(index) {
      //修改响应式数据
      this.currentIndex = index;
      //通知兄弟组件：当前的索引值为几（点击下面的轮播图，展示对应放大镜里的图片）
      this.$bus.$emit("getIndex", this.currentIndex);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>