<template>
  <div>
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <!-- 未登录，显示 -->
            <p v-if="!userName">
              <span>请</span>
              <!-- 声明式导航,与to属性连接 -->
              <router-link to="/login">登录</router-link>
              <router-link class="register" to="/register"
                >免费注册</router-link
              >
            </p>
            <!-- 登录 -->
            <p v-else>
              <a href="#">{{ userName }}</a>
              <a href="#" class="register" @click="logout">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <a href="###">我的订单</a>
            <router-link to="/shopcart">我的购物车</router-link>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" to="/home">
            <img src="./image/logo.png" alt="" />
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
              @keyup.enter="goSeach"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSeach"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    goSeach() {
      //路由传递参数:编程式路由导航
      //第一种：字符串
      // this.$router.push(
      //   "/search/" + this.keyword + "?k=" + this.keyword.toUpperCase()
      // );

      //第二种：模板字符串
      // this.$router.push(
      //   `/search/${this.keyword}?k=${this.keyword.toUpperCase()}`
      // );

      //第三种：对象写法。参数合并：如果有query参数也带上
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
      /*
        1.路由传递参数(对象写法)path是否可以结合params参数一起使用？
	        答：不可以。对象传参是可以用name和path形式，但是params需要和name一起使用
	      2.如何指定params参数可传可不传？：比如配置路由的时候，已经占位了(params参数)，但是路由跳转的时候就不传递，路径会出现问题
	        答：在配置路由的时候，在占位的后面加上一个问号【params可以传递可以不传递】
	      3.params参数可以传递也可以不传递，但是如果传递的是空串，如何解决？：params传递空串，当前组件的路径缺少
	        答：使用undefined解决，eg：keyword:' ' || undefined
	      4.路由组件能不能传递props数据?
	        答：可以，三种写法。见router和Search
      */
    },
    //退出登录
    async logout() {
      //退出需要做的事情：
      //1.发请求，通知服务器退出登录【清除一些数据：token】
      //2.清除项目中的数据【userInfo，token】
      try {
        //如果退出成功
        this.$store.dispatch("userLogout");
        //退出到登录页
        this.$router.push("/login");
      } catch (error) {}
    },
  },
  mounted() {
    //通过全局事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  computed: {
    //用户名信息
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>