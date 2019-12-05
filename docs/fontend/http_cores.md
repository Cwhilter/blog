---
title: "前端常见跨域解决方案"
summary: 
  first: "受限于浏览器的同源策略，在使用XMLHttpRequest访问不同源的资源时便会遇到跨域问题。"
  second: "实现跨域的方式很多，不一而同，实际使用时也会根据不同场景选择不同的跨域方式，因此在此总结一下不同的跨域方式，以及不同的跨域方式应该适用怎样的场景。"
tag: 
  - "http"
  - "cors"
  - "跨域"
---
# 前端常见跨域解决方案

## 同源策略
同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制

## 同源的定义

> 如果两个页面的协议，端口（如果有指定）和域名都相同，则两个页面具有相同的源，即便两个不同的域名指向同一个ip地址，也非同源

## 同源的限制
> 在浏览器中，script，img、iframe、link等标签都可以加载跨域资源，而不受同源限制，但浏览器限制了JavaScript的权限使其不能读、写加载的内容。

::: tip 例如
1. Cookie、LocalStorage 和 IndexDB 无法读取
2. DOM 无法获得
3. AJAX 请求不能发送
:::

本文只讨论服务端数据请求的跨域解决方案，其他的解决方案参考文章[浏览器同源策略及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)

## 常见的跨域解决方案
### 概览
::: tip 概览
1. JSONP
2. 跨域资源共享（CORS）
3. 服务器代理
4. WebSocket
:::

### JSONP
JSONP是利用script标签不受同源策略限制的特点，向服务器请求数据，服务器将数据作为函数参数返回，由于script标签加载的脚本直接执行，所以只要js环境内有定义该函数，该函数将直接执行。

::: warning 优点
JSOP方式的最大特点就是简单，兼容性好，服务端改造也最小。
:::

::: danger 缺点
只能执行get请求
:::

**前端代码**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <script>
    function test(argument) {
      alert(argument)
    }
  </script>
  <script src="http://localhost:3000?callback=test"></script>
</body>
</html>
```
**服务端代码**
``` js
  const Koa = require('koa')
  const app = new Koa()
  app.use(async ctx => {
    const params = 'hello world'
    const {callback} = ctx.query
    ctx.set('Content-Type', 'application/javascript')
    ctx.body = `${callback}(${JSON.stringify(params)})`  // test('hello world')
  })
  app.listen(3000)
  console.log('koa is running at port 3000')
```

### 跨域资源共享（CORS）

CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。
它使用额外的 HTTP 头来告诉浏览器  让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。

浏览器对跨域请求有两种处理

#### 简单请求

满足以下条件，即可视为简单请求

* 使用下列方法之一
   * GET
   * HEAD
   * POST
* Fetch 规范定义了对 [CORS 安全的首部字段集合](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)，**不得人为设置**该集合之外的其他header字段。该集合为：
   * Accept
   * Acceptp-Language
   * Content-Language
   * Content-Type (也有限制)
   * DPR
   * Downlink
   * Save-Data
   * Viewport-Width
   * Width
* Content-Type的值也仅限于以下三种
   * text/plain
   * multipart/form-data
   * application/x-www-form-urlencoded

对于简单请求，浏览器会在请求头上添加一个origin字段，用以向服务器表明自己的来源（协议+域名+端口），服务器根据这个值决定是否接受请求

若服务器拒绝，则返回一个正常的HTTP回应，相关错误可以在onerror（ajax）回调里面捕获

::: tip 提示 
对于前端（浏览器）代码来说，实现cors不需要太多额外代码，所有的操作比如向header添加origin字段，非简单请求的预校验请求都由浏览器自动完成。

目前绝大部分浏览器（IE10以上）都实现了对cors的支持
:::

#### 非简单请求（需要预校验的请求）

所有不满足以上条件的即为非简单请求（包括常见的获取json数据的请求，即Content-Type为application/json的请求）

对于非简单请求，浏览器会先发送一个预校验请求，请求方法是OPTIONS，得到服务器肯定回应后才发送真正的请求

**请求**

```
  OPTIONS /resources/post-here/ HTTP/1.1
  Host: bar.other
  User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081130 Minefield/3.1b3pre
  Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
  Accept-Language: en-us,en;q=0.5
  Accept-Encoding: gzip,deflate
  Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
  Connection: keep-alive
  Origin: http://foo.example
  Access-Control-Request-Method: POST
  Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

预检验请求有三个重要的请求头

* **origin** -- 表示请求来源
* **Access-Control-Request-Method** -- 该字段是必需的，用于列出CORS请求会用到哪些方法，上面例子方法是POST请求
* **Access-Control-Request-Headers** -- 该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的header字段

**回应**

```
  HTTP/1.1 200 OK
  Date: Mon, 01 Dec 2008 01:15:39 GMT
  Server: Apache/2.0.61 (Unix)
  Access-Control-Allow-Origin: http://foo.example
  Access-Control-Allow-Methods: POST, GET, OPTIONS
  Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
  Access-Control-Max-Age: 86400
  Vary: Accept-Encoding, Origin
  Content-Encoding: gzip
  Content-Length: 0
  Keep-Alive: timeout=2, max=100
  Connection: Keep-Alive
  Content-Type: text/plain
```

回应有以下几个重要字段

* **Access-Control-Allow-Origin** -- 表明服务器允许跨域的来源，可以使用通配符*表示任意请求，但若携带cookie时，只能指定特定的来源
* **Access-Control-Allow-Methods** -- 与请求头Access-Control-Request-Method对应，表明服务器允许客户端使用的方法
* **Access-Control-Allow-Headers** -- 与请求头Access-Control-Request-Headers对应，表明服务器允许客户端额外发送的header字段
* **Access-Control-Max-Age** -- 表明该响应的有效时间为 86400 秒，也就是 24 小时。在有效时间内，浏览器无须为同一请求再次发起预检请求。请注意，浏览器自身维护了一个最大有效时间，如果该首部字段的值超过了最大有效时间，将不会生效。

::: tip 提示
  与浏览器端自动携带header字段不同，以上所有字段需要在服务器手动进行配置，以精准控制跨域请求，尤其是Access-Control-Allow-Origin
:::

#### 附带身份凭证的请求

CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发送到服务器，一方面要服务器同意，指定**Access-Control-Allow-Credentials**字段

::: 
  Access-Control-Allow-Credentials: true
:::

同时开发者必须在ajax请求中打开withCredentials属性

示例代码如下
``` js
  var xhr = new XMLHttpRequest()
  shr.open('GET', url, true)
  shr.withCredentials = true
  shr.onreadystatechange = handler
  shr.send()
```
