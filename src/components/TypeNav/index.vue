<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="leaveShow" @mouseenter="enterShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 三级联动 -->
      <!-- 过渡动画 -->
      <transition name="sort">
        <div class="sort" v-show="show">
          <!-- 利用事件委派+编程式导航实现路由的跳转 -->
          <div class="all-sort-list2" @click="goSearch">
            <!-- 一级分类菜单 -->
            <div
              class="item bo"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!-- 二级分类菜单 -->
              <div
                class="item-list clearfix"
                :style="{
                  display: currentIndex == index ? 'block' : 'none',
                }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <!-- 三级分类菜单 -->
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from "lodash";
//引入全部功能,按需引入为
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移到哪一个一级分类,用index修改
      currentIndex: -1, //默认值-1,谁都没有移动上,最好不要设置为空会报错
      show: true,
    };
  },
  //组件挂载完毕，可以向服务器发请求
  mounted() {
    //this.$store.dispatch("categoryList"); //放到App里面了，为了防止每次刷新都请求

    //当组件挂载完毕，让show属性变为false
    //判断是否进入到search组件中
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //对象写法：右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state，其实是大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    //节流版本:一级分类鼠标进入修改响应式数据
    changeIndex: throttle(function (index) {
      //index：鼠标移动上某一个一级分类的索引值
      this.currentIndex = index;
    }, 50),

    //三级联动点击进入search路由组件的方法：该方法在三级联动的父盒子中，用事件委派去完成
    goSearch(event) {
      //利用事件委派，我们需要去判断是否选中的是那个 a 标签
      //我们用跳转的时候用参数去实现
      //问题2：即使我们确定了是a标签，但是怎么区分一级还是二级三级

      //第一个问题：把子节点中的a标签，我加上自定义属性data-categoryName去获取
      //第二个问题：把三个联动的a标签都加上自己有独有的data-categoryId去获取
      //节点有一个属性dataset属性(h5新增)，可以获取到节点的自定义属性和属性值

      //下面注意大小写问题,大写的是我们自定义的属性名用驼峰写法，小写的是我们获取到的属性值名(浏览器自动帮我们修改成小写的)
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //获取区分一级分类，二级分类，三级分类的a标签名字
      if (categoryname) {
        //如果是a标签的话，去判断是哪一级
        //因为跳转路由需要传递参数,所以整理一下
        let location = { name: "search" }; //跳转的路径
        let query = { categorName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        //参数合并
        //判断:如果路由跳转的时候，带有params参数，捎带着传递过去。
        if (this.$route.params) {
          location.params = this.$route.params;
          //动态给location配置对象添加query属性
          location.query = query;
          //路由跳转:编程式路由导航
          this.$router.push(location);
        }
      }
    },

    //鼠标离开三级联动
    leaveShow() {
      //currentIndex为哪个index，哪个就是cur的class样式高亮，-1的话就不显示高亮
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    //鼠标进入三级联动
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: pink;
        }
      }
    }
    //过渡动画的样式
    //过渡动画进入的开始状态
    .sort-enter {
      height: 0px;
    }
    //过渡动画进入的结束状态
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>