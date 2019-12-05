---
title: "CentOS7安装nodejs"
summary: 
  first: "记录一下在阿里云安装nodejs的过程"
  second: ""
illustration: 
  position: "top"
  link: "centos.png"
tag: 
  - "Linux"
  - "node"
---
# CentOS7环境下安装nodejs

## 1. 远程连接到阿里云（本地自己的Linux环境跳过）

在阿里云购买服务器后，修改密码并重启实例，可选择在控制台远程连接也可本地ssh远程连接（阿里云默认用户root）

我选择从Mac远程ssh连接，使用命令ssh root@[IP], 输入密码后即可远程登陆阿里云

![登陆成功界面](/images/WechatIMG91.png)

## 2. 安装[wget](https://www.linuxcool.com/wget)

``` sh
 yum install wget -y
```

## 3. 选择并下载node安装包

我是直接从[node官方](http://nodejs.cn/download/)推荐的[阿里云镜像下载](https://npm.taobao.org/mirrors/node/v12.13.1/)下载的最新版本(最新版本请查看官网)

``` sh
 wget https://npm.taobao.org/mirrors/node/v12.13.1/node-v12.13.1-linux-x64.tar.gz      // 下载node包

 tar -zxvf node-v12.13.1-linux-x64.tar.gz -C /usr/local/node-v12.13.1-linux-x64      // 解压到指定目录
```

::: tip 参考
[tar命令](https://man.linuxde.net/tar)
:::

## 4. 将node和npm命令添加到全局

``` sh
ln -s /usr/local/node-v12.13.1-linux-x64/bin/node /usr/local/bin/node
ln -s /usr/local/node-v12.13.1-linux-x64/bin/npm /usr/local/bin/npm
```

::: tip 标注
ln 命令用于为某一文件在另一位置建立一个同步连接，具体可参考[ln命令](https://man.linuxde.net/ln)

**/usr/bin** 与 **/usr/local/bin** 区别：

/usr/bin下面的都是系统预装的可执行程序，会随着系统升级而改变。

/usr/local/bin目录是给用户放置自己的可执行程序的地方，推荐放在这里，不会被系统升级而覆盖同名文件。

如果两个目录下有相同的可执行程序，谁优先执行受到PATH环境变量的影响，可使用**echo $PATH**查看优先级

:::

## 5. 测试安装是否成功

``` sh
node -v
npm -v
```
![测试安装成功](/images/WechatIMG92.png)