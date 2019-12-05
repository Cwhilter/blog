---
title: "前端模块化"
summary: 
  first: "前端相较于传统的Java，PHP等后端开发领域，算是一个新兴领域。最近十年的前端经过了前期的三剑客（HTML+CSS+JavaScript）粗放式开发，到后来的jQuery、Zepto等库，再到现在的前端工程化开发，前端变化非常快，相关概念和解决方案也年年推陈出新。"
  second: "前端模块化也经历了很多的变动，衍生出很多相关模块化解决方案，本文试着梳理一下前端模块化的各个解决方案"
illustration: 
  position: "right"
  link: "js.png"
tag: 
  - "前端"
  - "工程化"
  - "模块化"
---
# 前端模块化

## JS模块化的源起

### 刀耕火种的原始年代

在早期，前端还处于页面仔的时代，JavaScript只是作为一个简单的脚本语言来使用，做一些表单验证，简单的动画实现，以及部分信息提示等操作，代码也相对简单，直接写在script标签内，复杂一点的单独写在js文件里，由script引入，整个网站js代码量也不过千行，开发维护都很简单。

这个时候的js定位是一门辅助性的嵌入式脚本语言，不需要大型代码组织，甚至没有类的概念，更不用说模块化解决方案。早期的代码组织，都是通过简单的函数封装声明，或者定义对象的方式来实现

``` html
<script>
  function printError(e) {
    console.error('error', e)
  }
  var modelA = {
    a: 1,
    b: 2,
    add: function () {
      return this.a + this.b
    }
  }
  document.getElementById('submit').onClick = function () {
    var form = document.getElementById('form')
    if (!form) return printError('未找到表单，请刷新重试')
    ...
  }
</script>
```

### 初步模块化

后来随着ajax的出现，页面拥有了与服务器异步交互数据的能力，js语言能做的事情开始变多，出现了以jQuery为代表的一系列框架和类库，以及相关生态工具，前端开发开始变得较为复杂，代码量也大幅增加，但是与此同时也暴露出了很多问题。

::: warning 常见问题
1. 不同js文件之间依赖问题（如bootstrap依赖jQuery），大量文件之间互相依赖，其加载顺序需要人为控制，增加了维护成本和出错概率
2. 全局变量污染，多人协同开发时，为了避免变量污染，需要增加大量沟通成本，后期也难以维护
3. 单个js文件代码量过于庞大，拆分困难
4. 公用代码提取与引入带来的命名复杂，引入第三方库时变量冲突等
:::

为了解决以上的问题，开始陆续出现很多解决方案，有利用闭包原理封装隐藏变量，暴露出部分api供外部调用，如

``` js
moduleA = function（） {
   var a, b
   return {
      add: function (c){
         return a + b + c
      }
   }
}()
```
这种方法将变量和实现细节封装在function作用域里，对外隐藏，达到了封装目的，但对于实际开发还是不够方便，而且模块名也容易引起全局变量污染。

还有借鉴其他语言，如Java，使用命名空间

``` js
app.tools.moduleA.add = function(c) {
   return app.tools.moduleA.a + c
}
```

很显然，这种方法过于冗余，维护也很不方便

### nodeJS带来的模块化解决方案--CommonJS

随着nodeJS的横空出世，js语言突破了浏览器的限制，拥有了如其他后端语言--PHP和Java一样的读写文件、和操作系统底层交互的能力，使得js这门语言进一步拥有了无限的可能。

同时由于服务端编程的复杂性，模块化成为必不可少的功能，由此带来了第一个流行的js模块化解决方案，CommonJS规范

**CommonJS概述**

::: tip 关键字
  ***module***     （一个对象，代表当前模块）

  ***module.exports***     （module对象的一个属性，代表对外接口，加载某个模块，其实是加载该模块的module.exports属性）

  ***exports***      （Node为每个模块提供的一个变量，指向module.exports，**不要直接对其赋值**，会改变指向引起错误，推荐使用module.exports）

  ***require***    （Node内置的命令，用于加载模块）
:::

CommonJS规定一个文件就是一个模块，模块拥有各自的作用域，其内定义的变量、函数、类都是私有的，对其他文件不可见（除非定义为global对象的属性，不推荐这么干），向外暴露属性和方法时，使用module.exports或者exports属性（推荐使用module.exports命令），加载时使用require命令，加载时默认是js文件，可省略.js后缀


``` js
// a.js
const a = 1
const b = 2
module.exports.add = () => {
  return a + b
}

// c.js
const a = 3
const b = 4
module.exports = () => {
  return a + b
}
// 错误写法，不能直接赋值给exports对象，会改变其指向，导致报错
/** exports = () => {
  return a + b
}
*/

// b.js
const add = require('a.js').add // 加载add函数
console.log(add())              // 3

// b.js
const {add} = require('a.js')   // ES6写法
console.log(add())

// b.js
const moduleA = require('a')    // 加载exports，exports为一个对象 {add: () => {}}
const moduleC = require('c')    // 加载exports，此时exports为一个函数
console.log(moduleA.add())      // 3
console.log(moduleC())          // 7
console.log(moduleA.a)          // undefined， 内部非对外暴露变量，对外不可见

```

**require命令**

require命令的基本功能是，读取并执行一个js文件，然后返回该模块指定的exports对象，若没有找到该模块，则报错。

require参数可以是绝对路径，也可以是相对路径，若直接填文件名，则表示加载的是一个默认提供的核心模块（位于Node的系统安装目录中），或者一个位于各级node_modules目录的已安装模块（全局安装或局部安装）。若指定的文件未找到，Node会尝试为文件名添加.js、.json、.node后缀，再去搜索。

::: warning 说明
1. CommonJS加载是同步加载机制，所有模块在加载完成后才能继续执行后续代码
2. 加载模块时，输入的是被输出值的拷贝，也就是说一旦输出一个值，其模块内部的变化就不再影响这个值
3. Node加载模块后会有缓存机制，以后再加载该模块，直接从缓存取出该模块的module.exports属性
:::

详细的加载机制以及编译过程请参考阮一峰老师编写的[CommonJS规范](http://javascript.ruanyifeng.com/nodejs/module.html#)

### 为浏览器适配的模块异步加载方案

由上文知道，CommonJS规范是同步加载机制，模块加载完成才能继续执行代码。而受限于浏览器下的网络请求环境，若等待所有依赖模块加载完成，则需要等待很长时间，即使这个模块暂时未被使用，也需要预先下载完成，造成不必要的等待时间，同时会阻塞页面渲染，出现页面假死状态。用户体验不友好。因此出现了一些异步模块加载的解决方案

#### AMD & RequireJS

AMD（Asynchronous Module Definition）异步加载模块。AMD标准规定，用define来定义模块，用require来加载模块。RequireJS就是其规范的一种实现。项目中我未使用过，可参考阮一峰的[RequireJS的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)

#### CMD & sea.js

CMD（Common Module Definition）通用模块定义。这是SeaJS 在推广过程中对模块定义的规范化产出，具体参考[CMD模块定义规范](https://github.com/seajs/seajs/issues/242)

关于这两个的区别，可参考玉伯在知乎的一个回答[AMD和CMD的区别](https://www.zhihu.com/question/20351507)

### ES6标准的模块化解决方案

ECMAScript 6.0是JavaScript语言的下一代标准，已经在2015年6月正式发布了。它的目标，是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言。ES6提供了一个标准的模块化解决方案。

ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。