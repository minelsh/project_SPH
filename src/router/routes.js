//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

//路由配置信息
export default [
    {
        path:'/shopcart',
        name:'ShopCart',
        component:ShopCart,
        meta:{
            showFoot:true
        }
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{
            showFoot:true
        }
    },
    {
        path:'/home',
        name:'home',
        component:Home,
        meta:{
            showFoot:true
        }
    },
    {
        path:'/login',
        name:'login',
        component:Login,
        meta:{
            showFoot:false
        }
    },
    {
        path:'/register',
        name:'register',
        component:Register,
        meta:{
            showFoot:false
        }
    },
    {
        path:'/search/:keyword?',
        name:'search',
        component:Search,
        meta:{
            showFoot:true
        },

        //路由组件能不能传递props数据
        //第一种，布尔值写法
        // props:true
        //第二种，对象写法:额外给路由组件传递一些props
        // props:{a:1,b:2}
        //第三章：函数写法：可以params参数、query参数，通过props传递给路由组件
        props:($route)=>{
            return {keyword:$route.params.keyword,
            k:$route.query.k}
        }
    },
    {
        path:'/detail/:skuid',
        name:'detail',
        component:Detail,
        meta:{
            showFoot:true
        }
    },
]