//对于axios进行二次封装
import axios  from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条的样式
import 'nprogress/nprogress.css'
//nprogress中 start：进度条开始   done：进度条结束


//1.利用axios对象的方法create，去创建一个axios实例
//2.request其实就是axios，只不过稍微配置一下
const request=axios.create({
    //配置对象
    //基础路径，发请求的时候，路径中会出现api，不用自己写了
    baseURL:'/mock',
    //请求超时的时间为5s
    timeout:5000,
})
//请求拦截器：再发请求之前，请求拦截器可以检测到,可以在请求发出去之前做一些事情
request.interceptors.request.use((config)=>{
    //进度条开始动
    nprogress.start()

    //config:配置对象，里面有一个属性很重要，headers请求头
    return config
})

//响应拦截器
request.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done()

    //成功的回调，服务器响应数据回来以后，拦截器可以检测到，可以做一些事情
    return res.data
},(error)=>{
    console.log(error)
    // 终止promise
    return Promise.reject(new Error('faile'))
})

//对外暴露
export default request