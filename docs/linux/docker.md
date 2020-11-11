---
title: "docker总结"
summary: 
  first: "记录一下docker使用经验和踩过的坑"
  second: ""
illustration: 
  position: "top"
  link: "docker.png"
tag: 
  - "Linux"
  - "node"
---

# docker操作总结

## docker介绍

Docker 是一种运行于 Linux 和 Windows 上的软件，用于创建、管理和编排容器。容器不是模拟一个完整的操作系统，而是对进程进行隔离.

Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化，而且一个docker容器开销极低。

## docker优点

::: warning 优点
1. 保证应用在不同机器上的统一环境配置以及快速、持续交付，减少开发运维人员的环境配置工作
2. 高度可复制，移植，Docker 容器可以在开发人员的本机上，数据中心的物理或虚拟机上，云服务上或混合环境中运行
3. 体积小，启动快，在同一物理机上即可启用多个docker容器，充分利用资源
:::

## 常见应用场景

::: tip 场景
1. Web 应用的自动化打包和发布
2. 自动化测试和持续集成、发布
3. 在服务型环境中部署和调整数据库或其他的后台应用
4. 从头编译或者扩展现有的 OpenShift 或 Cloud Foundry 平台来搭建自己的 PaaS 环境
:::

## 安装

### Linux环境下的安装

安装难点主要在于 Linux 不同发行版之间的轻微区别，可以直接从官网下载安装脚本并运行，脚本中已经帮读者定义好了安装相关的指令，包括设置 Docker 为系统开启自启动

``` sh
wget -qO- https://get.docker.com/ | sh
```

如果使用其他用户组来使用docker，则需要添加非 root 用户到本地 Docker Unix 组当中

``` sh
sudo usermod -aG docker [user]     // 添加用户组

cat /etc/group | grep docker       // 查看用户组
```

设置完成后需要退出，重新登陆方可生效

如果没安装成功，请到[官网](https://docs.docker.com)选择自己对应的版本，并查看相关文档自行安装

安装完成后查看是否安装成功

``` sh
docker --version

docker system info
```

### window环境下的安装

请参考[Windows安装Docker（图解教程）](http://c.biancheng.net/view/3121.html)

