(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{142:function(e,t,s){"use strict";s.r(t);var n=s(7),r=Object(n.a)({},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content"},[e._m(0),s("hr"),s("date"),e._m(1),e._m(2),e._m(3),e._m(4),e._m(5),s("p",[e._v("1、此项目是参考了官方样本"),s("a",{attrs:{href:"https://github.com/vuejs-templates/webpack-simple",target:"_blank",rel:"noopener noreferrer"}},[e._v("webpack-simple"),s("OutboundLink")],1),e._v("，加入了一些实际项目中需要用到的功能（稍后会介绍）")]),e._m(6),s("p",[e._v("3、提供的功能有vue单文件组件、路由、热更新、css文件单独提出、html动态添加、文件打包压缩等功能")]),s("p",[e._v("4、此项目的webpack配置主要针对于单页面应用开发")]),s("p",[e._v("5、项目新添加了本地server定制功能，利用express框架搭建了本地服务器，用于开发环境下的调试以及API代理、mock数据等等功能")]),e._m(7),s("p",[e._v("项目整体分为以下几个目录")]),e._m(8),e._m(9),e._m(10),e._m(11),e._m(12),e._m(13),e._m(14),e._m(15),e._m(16),s("p",[e._v("1、在webpack入口处，我使用CommonsChunkPlugin插件对单页面中共同依赖的js文件，如jQuery、vue文件进行单独提取，以方便后期利用cdn进行静态资源缓存，同时减小单次请求下js文件大小，避免all in one情况的出现，减少页面初始加载时间，优化用户体验。")]),s("p",[e._v("注意:对于不是所有页面均依赖的js文件最好根据实际情况考虑是否利用CommonsChunkPlugin进行提取，比如存在只有两个页面依赖一个js文件，但是剩下的40个页面均不依赖该文件的情况，则应该考虑异步加载的方式，没有必要在页面中全局加载该文件。")]),s("p",[e._v('2、开发模式的切换，此配置文件有两种开发环境，一种是利用webpack的webpack-dev-server，开箱即用，在package.json文件中修改script中的dev为"cross-env NODE_ENV=development webpack-dev-server --open --hot"，同时配置webpack.config.js中的devServer参数，即可使用。')]),e._m(17),e._m(18),s("p",[e._v("Apache:")]),e._m(19),s("p",[e._v("在根目录创建.htaccess文件后粘贴上面的代码")]),s("p",[e._v("Nginx")]),e._m(20),s("p",[e._v("4、增加webpack.dll配置文件，可将第三方库单独打包，作为dll文件引入，这样在打包时可以避免多次打包，加快打包速率，同时也便于将dll文件进行cdn部署或本地永久缓存，优化加载速度")]),s("p",[e._v("5、语言包采用vue-i18n，实现多语言切换（详情查看langs文件夹）")]),s("p",[e._v("6、ajax库采用axios，独立封装了一下")])],1)},[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"readme"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#readme","aria-hidden":"true"}},[this._v("#")]),this._v(" README")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{attrs:{id:"使用方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用方法","aria-hidden":"true"}},[this._v("#")]),this._v(" 使用方法")])},function(){var e=this.$createElement,t=this._self._c||e;return t("blockquote",[t("p",[this._v("npm install         \t  --安装项目依赖包")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("blockquote",[t("p",[this._v("npm run dev         --本地开发环境 localhost：8000")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("blockquote",[t("p",[this._v("npm run build       --项目构建")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{attrs:{id:"项目说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#项目说明","aria-hidden":"true"}},[this._v("#")]),this._v(" 项目说明")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[e._v("2、完整的技术栈是"),s("code",[e._v("webpack2.x")]),e._v(" + "),s("code",[e._v("vue2.x")]),e._v(" + "),s("code",[e._v("vue-router")]),e._v(" + "),s("code",[e._v("ES6")]),e._v("模块，未来也可根据需要添加，比如less、vuex、服务端渲染以及gulp任务管理、本地server定制等等功能")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{attrs:{id:"项目结构说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#项目结构说明","aria-hidden":"true"}},[this._v("#")]),this._v(" 项目结构说明")])},function(){var e=this.$createElement,t=this._self._c||e;return t("blockquote",[t("p",[this._v("src--存放业务开发过程中的各类资源")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("blockquote",[t("p",[this._v("dist--是整个项目的产出，由webpack自动打包生成")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("blockquote",[t("p",[this._v("node_modules--存放项目依赖包")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("blockquote",[t("p",[this._v("server.js--本地服务器")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("blockquote",[t("p",[this._v("build--webpack配置文件")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h4",{attrs:{id:"目录结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#目录结构","aria-hidden":"true"}},[this._v("#")]),this._v(" 目录结构")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("vue-simple-template\n|---build             webpack相关配置文件\n|---dist\n  |---css             编译输出的css\n  |---js              编辑输出的js\n  |---images          编译输出的图片\n  |---fonts           编译输出的字体图标\n  index.html          编译后的入口文件\n|---src\n  |---api              全局API配置\n  |---assets          第三方资源及图片等\n    |---images\t      图片\n    |---lib           第三方资源\n  |---components      组件\n   \t|---button.vue    button组件\n  |---langs           语言包\n  |---layouts         布局文件\n\t  |---main.vue   \n  |---pages           页面文件\n\t  |---404.vue\n\t  |---about.vue  \n\t  |---home.vue\n  |---store           全局状态管理\n  |---index.html      打包入口文件\n  |---index.js        js入口文件\n  |---routes.js       本地路由文件\n|---server.js         本地服务端入口文件\n     \n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h4",{attrs:{id:"目录说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#目录说明","aria-hidden":"true"}},[this._v("#")]),this._v(" 目录说明")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{attrs:{id:"webpack配置说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#webpack配置说明","aria-hidden":"true"}},[this._v("#")]),this._v(" webpack配置说明")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("另一种方式是自定义本地开发环境，我采用"),t("strong",[this._v("express")]),this._v("进行搭建，利用"),t("strong",[this._v("webpack-dev-middleware")]),this._v("中间件进行编译，同时加入opn模块(用于自动打开浏览器)和"),t("strong",[this._v("webpack-hot-middleware")]),this._v("中间件实现热更新(HRM)，本地开发环境好处在于后期可根据项目需求进行个性化定制，比如API代理，处理动态请求，处理静态资源等等。")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("3、因为项目是单页面应用，前端路由并不是真正意义上的路由，在除首页外的其他路由页面，浏览器刷新之后会因为后台无法找到对应路径而显示404的情况，因此需要配置服务器，将所有路由跳转回单页面的入口文件，不同服务器有不同配置方式，我搭建的本地node服务器，采用的是"),t("strong",[this._v("connect-history-api-fallback")]),this._v("模块，其他服务器的配置方式:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v(" <IfModule mod_rewrite.c>\n   RewriteEngine On\n   RewriteBase /\n   RewriteRule ^index\\.html$ - [L]\n   RewriteCond %{REQUEST_FILENAME} !-f\n   RewriteCond %{REQUEST_FILENAME} !-d\n   RewriteRule . /index.html [L]\n </IfModule>\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v(" location / {\n   try_files $uri $uri/ /index.html;\n }\n")])])])}],!1,null,null,null);t.default=r.exports}}]);