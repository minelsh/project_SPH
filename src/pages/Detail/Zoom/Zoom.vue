<template>
  <div class="spec-preview">
    <!-- 小图 -->
    <img :src="bigObj.imgUrl" />
    <!-- 移动事件 -->
    <div class="event" @mousemove="handler"></div>
    <!-- 大图 -->
    <div class="big">
      <img :src="bigObj.imgUrl" ref="big" />
    </div>
    <!-- 绿色的遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    bigObj() {
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  mounted() {
    //全局事件总线：获取兄弟组件（ImageList）传递过来的索引值，展示轮播图对应的放大镜图片
    this.$bus.$on("getIndex", (index) => {
      // console.log(index);
      //修改响应式数据，修改放大镜两张图片的索引值
      this.currentIndex = index;
    });
  },
  methods: {
    handler(event) {
      //让遮罩层跟着鼠标动
      let mask = this.$refs.mask;

      //让大图片也跟随移动
      let big = this.$refs.big;

      //计算遮罩层左侧距离盒子左侧的距离(top同理)
      //event.offsetX是鼠标距离盒子左侧的距离 - mask自身宽度的一半
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;

      //约束遮罩层的移动范围
      if (left <= 0) left = 0; //靠近盒子左边时，遮罩层不会继续向左移动(刚好和盒子左侧紧贴)
      if (left >= mask.offsetWidth) left = mask.offsetWidth; //靠近盒子右边时，遮罩层不会继续向右移动
      if (top <= 0) top = 0; //靠近盒子上边时，遮罩层不会继续向上移动(刚好和盒子上侧紧贴)
      if (top >= mask.offsetHeight) top = mask.offsetHeight; //靠近盒子下边时，遮罩层不会继续向下移动

      //修改元素的 left|top 属性值（让遮罩层,大图片移动）
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      //为负数原因：因为是图片自己在动（而且与鼠标移动方向相反），下面写了overflow:hidden。所以当鼠标右移的时候，实际大图片左移
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>