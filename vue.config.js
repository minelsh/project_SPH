const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭exlint
  lintOnSave:false,

  //代理跨域
  devServer:{
    proxy:{
      '/api':{//路径当中带有api这个地址的代理服务器开始工作
        target:'http://gmall-h5-api.atguigu.cn',
        //target:数据需要代理的路径
        // pathRewrite:{'^/api':''},
        // 路径重写，这里不需要了，因为我们真实路径中所有的都含有/api
      }
    }
  }
})
