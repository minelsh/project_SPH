1）给三级联动表单添加背景颜色

    第一种解决方案：采用 css 样式 hover 完成（可以的）
    在css中找到item:hover{background:skyblue}

    第二种解决方案：通过JS完成

2）通过 JS 控制二三级商品分类的显示与隐藏

    之前使用的css样式的display去显示隐藏的

3）三级联动卡顿现象：本项目使用节流(因为如果用防抖可能就不显示高亮了，更拉跨)

    如果一瞬间不停的快速的划过一级菜单分类，会造成卡顿和高亮显示不及时。

    节流：技能cd，到了间隔时间才会触发一次。(使用的lodash中的_.throttle函数方法)
    button.onclick=_.throttle(()=>{
        count++;
        span.innerHTML=count;
    },1000)   //点击+1事件，规定在1s之内只能加1

    防抖：回城，如果时间没到就触发就会重新进入计时。(使用lodash插件,或者自己用闭包+延迟器)   在lodash插件中，使用函数_.debounced(防抖动)函数即可
    input.oninput=_.debounce(()=>{//oninput可以获取到input框内的内容变化
        console.log('ajax发请求')
    },1000)

5）完成三级联动节流的操作

     changeIndex: throttle(function (index) {
      //index：鼠标移动上某一个一级分类的索引值
      this.currentIndex = index;
    }, 50),

6）三级联动组件的路由跳转和传递参数

    三级联动用户可以点击的：一级分类、二级分类、三级分类，当你点击的时候
    Home模块跳转到Search模块，一级会把用户选中的产品(产品的名字、产品的ID)在路由跳转的时候，进行传递。

    路由跳转：
    声明式导航：router-link
    编程式导航：push|replace

    使用声明式导航的话，刚刚那种快速滑动高亮卡顿现象特别严重。因为我们跳转的是一个组件，服务器的数据返回之后会出现很多的组件和他们的组件实例对象，会很占内存，很卡的

7）完成三级联动路由跳转与参数传递
