//当前这个模块：API接口进行统一的管理
import request from "./request";
import mockRequest from './mock'
//三级联动接口
//api/product/getBaseCategoryList get 无参数

export const reqCategoryList=()=>{
    //发请求:axios发请求返回结果是promise对象
    return request({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

//mock
//获取banner(Home首页轮播图接口)
export const reqGetBannerList=()=>mockRequest.get('/banner')
//获取floor数据
export const reqFloorList=()=>mockRequest.get('/floor')



//获取搜索接口 地址：/api/list  请求方式：post   需要带参数
//当前这个接口：给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo=(params)=>{
    return request({
        method:'post',
        url:'/list',
        data:params
    })
}

//获取产品详情页面的接口  URL：/api/item/{skuId}  请求方式:GET
export const reqGoodsInfo=(skuId)=>{
    return request({
        url:`/item/${skuId}`,
        method:'get'
    })
}