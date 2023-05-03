<template>
  <div>
    <!-- 商品三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread面包屑：三级列表下面很小的一行全部结果-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categorName">
              {{ searchParams.categorName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 搜索栏关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTradeMark">×</i>
            </li>
            <!-- 平台的售卖的属性值展示 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont icon-direction-down"
                      :class="{
                        'icon-direction-down': isDesc,
                        'icon-direction-up': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont icon"
                      :class="{
                        'icon-direction-down': isDesc,
                        'icon-direction-up': isAsc,
                      }"
                    >
                    </span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售的产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转的时候别忘记带ID -->
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getpageNo="getpageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入子组件：商品上面的品牌大小那些选择框
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      //带给服务器参数
      searchParams: {
        category1Id: "", //一级分类的id
        category2Id: "", //二级分类的id
        category3Id: "", //三级分类的id
        categorName: "", //商品的名字
        keyword: "", //用户搜索的关键字
        props: [], //商品属性的搜索条件
        trademark: "", //品牌的搜索条件
        order: "1:desc", //排序的参数 【默认初始值:1:desc】
        pageNo: 1, //当前分页器的页码  【默认初始值:1】
        pageSize: 3, //代表当前一页显示几条数据 【默认初始值:10】
      },
    };
  },
  beforeMount() {
    //在派发请求之前 让带给服务器参数【searchParams参数发生变化有数值带给服务器
    //Object.assign   ES6新增的语法，可以合并对象。因为三级菜单时query，搜索栏是params
    // console.log(this.$route.query);
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  //组件挂在完毕执行一次【仅仅执行一次】，问题是：我们会根据不同的搜索条件去重复的发请求
  mounted() {
    //初始发请求，如果后续修改搜索条件。在watch中监听修改再发请求
    //派发action：把请求封装成函数，根据不同的搜索关键字显示不同的数据(methods中)
    this.getData();

    //子组件传递信息给父组件
    //子组件品牌传递信息过来
    this.$bus.$on("tradeMark", (trademark) => {
      //整理参数
      // console.log("我是父组件search,我收到了", trademark);
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //再次发请求获取search模块列表数据展示
      this.getData();
    });
    //子组件售卖属性值信息传递过来
    this.$bus.$on("attrInfo", (attr, attrValue) => {
      console.log("获取到的售卖信息为", attr, attrValue);
      //整理参数
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重：防止重复点4G，面包屑一直反复出现4G
      if (this.searchParams.props.indexOf(props == -1)) {
        this.searchParams.props.push(props);
      }
      this.getData();
    });
  },
  methods: {
    //向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //清除id,还可以设置为undefined（因为‘’为空还是会带给服务器占网速），这样就不会占网络
    clearId() {
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
    //删除面包屑分类的名字
    removeCategoryName() {
      this.searchParams.categorName = undefined;
      this.clearId();
      //再次发请求,重新渲染页面,展示默认值
      this.getData();
      //修改路由地址: 面包屑展示的三级菜单是query参数，搜索栏是params参数。两种参数和展示不一样，不能一起删除
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      } else {
        this.$router.push({ name: "search" });
      }
    },
    //删除面包屑搜索栏关键字
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getData();

      //通知兄弟组件Header清除搜索栏的关键字
      this.$bus.$emit("clear");

      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      } else {
        this.$router.push({ name: "search" });
      }
    },
    //删除品牌的信息
    removeTradeMark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //删除售卖信息属性:需要传参，因为删除的是props数组，需要知道索引值具体删除哪一个
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    changeOrder(flag) {
      //flag形参：是一个标记，代表用户点击的是综合(1)还是价格(2)
      let originFlag = this.searchParams.order.split(":")[0]; //区分起始的综合和价格的
      let originSort = this.searchParams.order.split(":")[1]; //区分起始的排序的
      //准备一个新的order值
      let newOrder = "";
      //originFlag是起始的综合，flag是用户点击的综合或者价格
      if (flag == originFlag) {
        //如果点击的是高亮的这个
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
        console.log(newOrder);
      } else {
        //点击的是没有亮的另一个
        newOrder = `${flag}:${"desc"}`;
        console.log(newOrder);
      }
      //将新的order赋予给searchParams，起始值会发生改变
      this.searchParams.order = newOrder;
      //再次发请求
      this.getData();
    },
    //自定义事件：子传父------获取当前点击的页数（也可以用$bus）
    getpageNo(pageNo) {
      // console.log(pageNo);
      //整理参数带给服务器
      this.searchParams.pageNo = pageNo;
      //再次发请求
      this.getData();
    },
  },
  computed: {
    //Getters是不分模块的，可以直接捞。而State是分模块home或者search的
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      //升序。向上
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      //降序，向下
      return this.searchParams.order.indexOf("desc") != -1;
    },
    //获取search模块提供展示产品一共有多少数据total(不知道为什么用matState要报错)
    ...mapGetters(["total"]),
  },
  //为了可以多次发请求，需要监听数据里的路由。因为每次修改搜索关键词，路由带参都会发生变化
  //数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    //监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route(newValue, oldValue) {
      //再次整理更新带给服务器的参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //再次发请求
      this.getData();
      //每一次请求完毕，先把1，2，3级分类的id清除
      //因为其他的属性每次都会发生变化覆盖前一个，不需要清除
      this.clearId();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>