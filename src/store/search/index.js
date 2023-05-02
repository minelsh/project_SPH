import {reqGetSearchInfo} from '@/api'
//search模块的小仓库
const state={
    searchList:{},
}
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
const actions={
    async getSearchList({commit},params={}){
        //reqGetSearchInfo 这个函数被调用获取服务器数据的时候，至少传递一个参数(空对象)
        //params：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        // console.log('search页面的result是',result)
        if(result.code==200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
//全局计算属性：为了简化数据而生
const getters={
    // 当前形参state，当前仓库中的state，并非大仓库中的state
    goodsList(state){
        return state.searchList.goodsList || []
        //服务器返回的数据是一个数组，但是如果没网给一个空数组防止报错
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}