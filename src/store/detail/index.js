import { reqGoodsInfo,reqAddOrUpdateCart } from "@/api"
// 封装游客临时身份模块uuid ----->生成一个随机字符串（只生成这一个uuid，用本地存储，下次登录可以用）
import { getUUID } from "@/utils/uuid_token"
const state={
    gooInfo:{},
    //游客的临时身份
    uuid_token:getUUID()
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
    },
    //将产品添加到购物车的action || 在购物车组件中修改某一个产品的个数
    async addOrUpdateCart({commit},{skuId,skuNum}){
        //加入购物车后（发请求）。前台将参数带给服务器
        //服务器写入数据成功后，根本也就没有返回数据给我们，我们也不需要三连环给vuex存数据
        //注意：async函数返回的一定是一个promise对象
        let result= await reqAddOrUpdateCart(skuId,skuNum)
        // console.log('购物车的vuex请求',result)
        if(result.code==200){
            //加入购物车成功
            return "Promise成功"
        }else{
            //加入购物车失败
            return Promise.reject(new Error('加入购物车失败'))
        }
        //当前这个函数返回的就是Promise对象，成功(非空的字符串)或者失败(promis.reject)
    }
}
const getters={
    //路径导航面包屑简化的数据
    categoryView(state) {
        //因为 gooInfo 是一个空对象，所以如果不加||{}，空对象的categoryView属性值是undefined
        //所以categoryView至少是一个 {} 空对象，后面才不会报错
        return state.gooInfo.categoryView || {}
    },
    //商品信息的数据
    skuInfo(state){
        return state.gooInfo.skuInfo || {}
    },
    //商品销售属性列表的数据
    spuSaleAttrList() {
        return state.gooInfo.spuSaleAttrList || []
    }
}
export default{
    state,
    actions,
    mutations,
    getters 
}