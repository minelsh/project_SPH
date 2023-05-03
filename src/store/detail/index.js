import { reqGoodsInfo } from "@/api"
const state={
    gooInfo:{}
}
const mutations={
    GETGOODINFO(state,gooInfo){
        state.gooInfo=gooInfo
    }
}
const actions={
    //获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result=await reqGoodsInfo(skuId)
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    }
}
const getters={}

export default{
    state,
    actions,
    mutations,
    getters 
}