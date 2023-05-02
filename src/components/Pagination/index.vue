<template>
  <div class="pagination">
    <button>上一页</button>
    <button>···</button>

    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>

    <button>···</button>
    <button>{{ totalPage }}</button>
    <button>下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <h1>{{ starNumAndEndNum }}</h1>
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
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>