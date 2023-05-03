<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getpageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="starNumAndEndNum.start > 1"
      @click="$emit('getpageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="starNumAndEndNum.start > 2">···</button>

    <!-- 中间连续部分：1.遍历完展示完1-end页的所有。2.隐藏小于start页之前的（成功展示start-end） -->
    <button
      v-for="(page, index) in starNumAndEndNum.end"
      :key="index"
      v-show="page >= starNumAndEndNum.start"
      @click="$emit('getpageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="starNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="starNumAndEndNum.end < totalPage"
      @click="$emit('getpageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getpageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续页码的起始数字和结束数字(5,7个为连续，总页数要大于最小5)
    starNumAndEndNum() {
      const { continues, pageNo, totalPage } = this; //解构：新玩法！！！！不用写this了
      let start = 0;
      let end = 0;
      //总页数小于连续页数最少的5页
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        //正常的时候,连续页面可能为5或者7
        start = pageNo - parseInt(continues / 2); //parseInt转变为10进制(默认，可以有其他进制，写第二个参数)
        //比如当前连续页是7，parseInt出来就是3(向下取整)
        end = pageNo + parseInt(continues / 2);
        //把不正常的现象：【start数字为0|负数】纠正。
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //【end数字>最大页数】纠正
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

  
<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: pink;
      color: #fff;
    }
  }
}
</style>