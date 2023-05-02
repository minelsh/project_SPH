//先引入mockjs模块
import Mock from 'mockjs'
//把JSON数据格式引入进来(JSON格式默认就会对外暴露)
//webpack默认对外暴露的：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'


//mock数据:这个方法有两个参数： 第一个参数:请求地址  第二个参数:请求的数据
Mock.mock('/mock/banner',{code:200,data:banner})//模拟首页的轮播图数据
Mock.mock('/mock/floor',{code:200,data:floor})//模拟首页的轮播图数据

//对外暴露
