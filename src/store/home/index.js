import { reqCategoryList, reqGetBannerList,reqFloorList } from "@/api"

//home模块的小仓库
//state:仓库存储数据的地方
const state={
    //state中的数据默认初始值不能瞎写，服务器返回的是对象，起始值就是对象。服务器返回的是数组，起始值就是数组
    //起始值为一个空数组。服务器的数据回来之后进行替换

    //三级菜单store存储数据
    categoryList:[],
    //轮播图store存储数据
    bannerList:[],
    //家用电器store存储数据
    floorList:[],
}
//mutations:修改state的唯一手段
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    }
}
//action:处理action，可以书写自己的业务逻辑，也可以处理异步(有接口需要传输给mutations的时候)
const actions={
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let result=await reqCategoryList()
        // console.log('三级菜单数据库请求result是',result)//拿到三级联动的数据
        if(result.code==200){
            commit("CATEGORYLIST",result.data)//发给mutations中的CATEGORYLIST接收服务器数据改为自己的数据
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result=await reqGetBannerList();
        // console.log('轮播图的mock数据请求result是',result)
        if(result.code==200){
            commit('GETBANNERLIST',result.data)
        }
    },
    //获取floor数据
    async getFloorList({commit}){
        let result=await reqFloorList()
        // console.log('家用电器的result是',result)
        if(result.code==200){
            commit('GETFLOORLIST',result.data)
        }
    }
}
//getters:理解为全局计算属性
const getters={}

export default{
    state,
    mutations,
    actions,
    getters
}