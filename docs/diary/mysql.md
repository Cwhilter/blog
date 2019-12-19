---
title: "Mysql技巧记录"
summary: 
  first: "记录一些工作中用到的一些MySQL操作技巧"
  second: ""
illustration: 
  position: "right"
  link: "work.png"
tag: 
  - "MySQL"
---
# Mysql技巧记录

## Mysql 大小写敏感问题

### 区分场景

MySQL在Linux下数据库名、表名、列名、别名大小写规则

::: warning 列表
1. 数据库名与表名是严格区分大小写的
2. 表的别名是严格区分大小写的
3. 列名与列的别名在所有的情况下均是忽略大小写的
4. 字段内容默认情况下是大小写不敏感的
:::

### 字段内容区分大小写的解决方案

* 在查询的sql中加入**BINARY**关键字，例如
``` sql
  select * from tb_user where BINARY username = 'user'

  select BINARY username from tb_user where id = '2'

  select username from tb_user group by BINARY sex
```

* 创建表时指定字段**BINARY**

``` sql
  CREATE TABLE `tb_user` (
    `id` BIGINT (20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户id',
    `username` VARCHAR (50) BINARY NOT NULL COMMENT '用户名',
    PRIMARY KEY (`id`)
  ) ENGINE = INNODB DEFAULT CHARSET = utf8 COMMENT = '用户表';
  -- 查看表结构
  show create table tb_user

  -- 或者设置COLLATE
  CREATE TABLE `tb_user2` (
    `id` BIGINT (20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户id',
    `username` VARCHAR (50) NOT NULL COMMENT '用户名',
    `info` VARCHAR (100) NOT NULL COMMENT '详情描述',
    PRIMARY KEY (`id`)
  ) ENGINE = INNODB DEFAULT CHARSET = utf8 COLLATE=utf8_bin COMMENT = '用户表';

  -- 这样会将字段中varchar类型的全部设置区分大小写
```
### 原理简单解释

字段值的大小写由mysql的校对规则来控制

字符集是一套符号和编码，校对规则是在字符集内用于比较字符的一套规则。 一般而言，校对规则以其相关的字符集名开始，通常包括一个语言名，并且以**ci**（大小写不敏感）、**cs**（大小写敏感）或**_bin**（二元）结束，例如

::: warning utf8字符集

:::

## 根据排序取最新一条数据

