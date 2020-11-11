---
title: "webpack打包优化"
summary: 
  first: "记录一下webpack的一些打包优化方式和常用插件"
  second: ""
illustration: 
  position: "top"
  link: "webpack.png"
tag: 
  - "webpack"
  - "js"
---

# webpack打包优化

## 特殊文件的提取

### CommonsChunkPlugin插件

CommonsChunkPlugin插件的作用是针对webpack多入口文件存在公共引用文件时，可以使用这个插件将公共文件提取出来打包到一起，
可以动态设置被几个入口chunk引用才进行打包，

针对常见的单页面应用，由于只有一个入口文件，所以此插件用处不大
