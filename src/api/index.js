//当前这个模块：API接口进行统一的管理
import request from "./request";
import mockRequest from './mock'
import { method } from "lodash";
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

//将产品添加到购物车中（或者在购物车中更新某一个产品的个数）
//  /api/cart/addToCart/{ skuId }/{ skuNum }   POST
export const reqAddOrUpdateCart = (skuId,skuNum)=>{
    return request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
}

//获取购物车列表
//  /api/cart/cartList
export const reqShopCart=()=>{
    return request({url:`/cart/cartList`,method:'get'})
}

//删除购物车产品的接口
// URL:/api/cart/deleteCart/{skuId}  method:DELETE
export const reqDeleteCartById=(skuId)=>{
    return request({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}

//修改商品选中的状态
// URL:/api/cart/checkCart/{skuId}/{isChecked}  method:get
export const reqUpdateCheckedByid=(skuId,isChecked)=>request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
// URL:/api/user/passport/sendCode/{phone}   method:get
export const reqGetCode=(phone)=>request({url:`/user/passport/sendCode/${phone}`,method:'get'})

//完成注册上传信息的接口
// URL:/api/user/passport/register   method:post   phone  code   password
export const reqRegister = (data)=>request({url:`/user/passport/register`,method:'post',data});

//登陆的接口
// URL:/api/user/passport/login  method:post   phone password
export const reqUserLogin=(data)=>request({url:`/user/passport/login`,method:'post',data})


//获取用户的登录信息（需要带token向服务器要用户信息,因为接口里面没带，所以又只能用请求头带token）
//URL:/api/user/passport/auth/getUserinfo  method:get
export const reqUserInfo=()=>{
    return request({url:`/user/passport/auth/getUserInfo`,method:'get'})
}

//退出登录
//URL: /api/user/passport/logout  method:'get'
export const reqLogout=()=>request({url:'/user/passport/logout',method:'get'})