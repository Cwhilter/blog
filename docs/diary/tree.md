---
title: "树的设计与实现"
summary: 
  first: "树是中后台管理系统中常用的一种结构，常应用于文件管理和需要层次节点、上下级需要关联的场景，比较类似数据结构中森林的概念"
  second: "这种结构因为每个节点都存在上下节点关联，以及可无限扩展的特性，使得在数据表设计以及前端代码编写方面存在一定复杂性，正好在项目中需要用到这种结构，因此分享一下项目中我的设计和实现方式，用于参考借鉴"
illustration: 
  position: "left"
  link: "vuepress.png"
tag: 
  - "JS"
  - "MySQL"
  - "树形结构"
---

# 树的设计与实现

## 前述

树是中后台管理系统中常用的一种结构，常应用于诸如文件管理、商品分类，企业层级等需要层次节点、上下级需要关联的场景，比较类似数据结构中森林的概念。

![树](/images/tree.png)

目前大部分关系型数据库都是以二维表的形式记录存储，无法将这种树形结构直接存储其中，常见的树形结构数据都是以一种邻接表的形式存储各个节点信息，在需要遍历
时，通过频繁访问数据库递归查询来获取节点列表，这种方式下针对节点的所有CRUD操作都是非常耗费资源的，频繁访问数据库的IO操作加大了时间开销，导致响应缓慢，邻接表如下：

**邻接表node_info**
| node_id       | node_name          | parent_id
|--------------:|--------------------:|--------------------:|
| 1             | A                  | 0
| 2             | B                  | 1
| 3             | C                  | 2
| 4             | D                  | 2
| 5             | E                  | 4
| 6             | F                  | 1
| 7             | G                  | 6

这种结构也有优点，在层级较少（比如两到三层）情况下，这种结构非常直观，节点操作起来也很简单，尤其是增加和删除节点

网上还存在一些其他方案，比如[基于左右值编码的设计](https://blog.csdn.net/ghostrabbit/article/details/80050777)和利用存储过程实现递归查询的方式（MySQL），个人感觉这两种方案都不太合适我们项目

我们项目需求有以下几个特点
::: tip 需求总结
1. 节点层次不会太深，大部分场景为2到6层，最深不会超过10层
2. 不需要节点移动功能（将某个节点或者节点子树平移到其他节点下）
3. 有比较高频次的查询和增删改操作
4. 前端需要根据某一节点懒加载其所有子节点树（每次加载不超过一定层级）
:::

于是我们考虑在邻接表的基础上加入另一张节点关系表，用来记录每个节点在整个树里面的位置信息，利用这张表将查询操作外移至内存层面进行递归（nodeJs）

本章只探讨实现树的数据结构以及数据表设计问题，服务端采用nodeJs，具体的前端组件采用的是[iview的树形组件](https://www.iviewui.com/components/tree)

## 数据表的设计

我们采用两张表来记录节点信息以及相关节点在树中的位置信息，第一张采用和邻接表一样的格式，记录每个节点信息及其父节点ID，同上

关键在于第二张表，在第二张关系表中，我们记录了每个**节点自身ID（leaf_id）**、**根节点ID（root_id）**和距离根节点的**层级（depth）**，也就是自顶向下，每个节点都将作为根节点，把它的子节点距离根节点的层级记录下来
::: warning 注意
1. 树中的每个节点都将作为根节点，将其子节点与自身关系存储进去
2. 每个节点也将作为自身的子节点存储进去，层级为0
:::

比如将图中的节点A作为根节点，A本身就是它的第0层，插入一条**root_id为1(A)，leaf_id为1(A)，depth为0**的数据，然后B节点就是A的第1层，插入一条**root_id为1(A)，leaf_id为2(B)，depth为1**的数据，依次类推，记录完A节点关系信息后，再将B节点作为根节点，将其子节点关系信息记录起来...

关系表(node_relation)结构如下（邻接表如上表）
| root_id       | leaf_id            | depth               
|--------------:|--------------------:|--------------------:|
| 1（A）         | 1 （A）            | 0
| 1（A）         | 2 （B）            | 1
| 1（A）         | 3 （C）            | 2
| 1（A）         | 4 （D）            | 2
| 1（A）         | 5 （E）            | 3
| 1（A）         | 6 （F）            | 1
| 1（A）         | 7 （G）            | 2
| 2（B）         | 2 （B）            | 0
| 2（B）         | 3 （C）            | 1
| 2（B）         | 4 （D）            | 1
| 2（B）         | 5 （E）            | 2
|...

## 思路解析

### 查询

这样若想要构建某个节点的树形数据结构，就把这个节点当做根节点，根据节点ID（关系表中的root_id），每个节点都可以获取自己所有的子节点，而每个子节点都携带有在这颗子树中的层级，这样通过简单的sql语句，就可以初步勾画出一个子树

同时因为depth的存在，我们可以根据depth动态获取一定层级节点，后续节点只需要再将末尾节点作为根节点，获取它的子树，就可以实现懒加载效果

以根节点A为例，取出前三层节点

``` sql
select * from node_relation where root_id = 1 and depth <= 2
```

这样就得到了A节点下所有子节点，以及他们在树中的层级，按照层级depth分组，如下所示

![层级节点](/images/tree_2.png)

我们已经得到了整个树的大致结构，现在只需要知道每个节点的父节点是谁，就可以把整个树构建完整，而每个节点的父节点信息正是存在于第一张邻接表中。
因此我们把两张表关联起来进行联表查询就可以得到组建树的完整信息

``` sql
select a.depth, a.root_id, b.*
from node_relation as a
left join node_info as b on a.leaf_id = b.id
where a.root_id = 1 and a.depth <= 2
```

结果中的每条信息都携带了节点名称，ID，相对根节点的层级，以及自己的父节点ID，这样我们对结果进行递归遍历，就可以构建出完整的树，结果结构如下
| root_id       | node_id            | depth                | node_name        | parent_id
|--------------:|--------------------:|--------------------:|-----------------:|------------------:|
| 1（A）         | 1 （A）            | 0                    | A                | 0
| 1（A）         | 2 （B）            | 1                    | B                | 1
| 1（A）         | 3 （C）            | 2                    | C                | 2
| 1（A）         | 4 （D）            | 2                    | D                | 2
| 1（A）         | 6 （F）            | 1                    | F                | 1
| 1（A）         | 7 （G）            | 2                    | G                | 6

### 插入

前面说过了，第二张关系表中存的是每个子节点在其根节点中的位置信息，因此我们只需要把新增节点的所有父节点位置信息+1，再加上自己的位置信息，就插入完成了

拿上图E节点举例，在E下增加一个节点H，则H节点相对它的父节点ABDE位置信息，就是E节点相对其所有父节点的层次depth+1，因此，我们先获取E节点相对其所有父节点
的depth信息，再加上H节点本身的depth为0的信息，就完成了插入（当然别忘了插入邻接表）

### 删除

删除就比较简单，把节点信息和所有leaf_id为该节点的信息删除就完成了删除

## 示例代码

示例代码如下

``` js
/**
 * 获取节点的所有子节点(包括该节点)
 * @param rootId 节点ID
 * @param ctx
 */
const getNodeChildrenList = async (rootId: number): Promise<any[]> => {
  return mysql.query(`
    select a.leaf_id, b.* from (
      select leaf_id from node_relation
      where root_id = ${rootId}
      group by leaf_id
    ) as a
    left join node_info as b on a.leaf_id = b.id
    order by b.id asc
  `)
}
/**
 * 获取节点的所有父节点（包括该节点）请勿修改结果的节点层级顺序！
 * @param childId 节点ID
 * @param ctx
 */
const getNodeParentList = async (childId: number): Promise<any[]> => {
  return mysql.query(`
    select a.*, b.* from (
      select root_id, depth from node_relation
      where leaf_id = ${childId}
      group by root_id
    ) as a
    left join node_info as b on a.root_id = b.id
    order by b.id asc
  `)
}
/**
 * 递归获取节点数据，并组成树形结构
 * @param nodeList 节点relation列表
 * @param rootId 根节点
 * @param depth 递归遍历的深度
 * @param maxDepth 递归遍历的最大深度
 */
const getNodeListByDepth = (nodeList: any[], rootId: number, fatherId: number, depth: number, maxDepth: number): any[] => {
  // 获取fatherId下直接子节点列表
  const list: any = nodeList.filter((i: any) => i.root_id === rootId && i.depth === depth && i.father_id === fatherId)
  if (!list.length) return []
  let array = []
  for (let r of list) {
    let node = {
      title: r.category_name,
      value: r.id,
      label: r.category_name,
      depth: depth + 1,
      expand: true,
      children: depth < maxDepth ? getNodeListByDepth(nodeList, rootId, r.id, depth + 1, maxDepth) : []
    }
    // 到达最大遍历深度时，如果还有子节点，则设置loading动态加载
    if ((depth === maxDepth)) {
      const childrenList = nodeList.filter((i: any) => i.root_id === rootId && i.depth === depth + 1 && i.father_id === r.id)
      if (childrenList.length) {
        node = Object.assign(node, {loading: false, expand: false})
      }
    }
    array.push(node)
  }
  return array
}
/**
 * 从根节点开始获取树形结构
 * @param ctx
 * @param maxDepth 节点遍历深度
 */
export async function getCategoryList(ctx: ServiceContext) {
  // 获取第一层节点（father_id为0的节点）
  const rootNodeList = await mysql.query(`select * from node_info where parent_id = 0`)
  // 获取递归深度内根节点所有节点层级关系
  const nodeList: any[] = await mysql.query(`
    select a.depth, a.root_id, b.*
    from node_relation as a
    left join node_info as b on a.leaf_id = b.id
    where a.root_id in (${rootNodeList.map(i => i.id).join(',')}) and a.depth <= ${maxDepth + 1}
  `)

  let tree = rootNodeList.map(node => {
    return {
      value: node.id,
      label: node.category_name,
      depth: 1,
      expand: true,
      children: nodeList.length ? getNodeListByDepth(nodeList, node.id, node.id, 1, maxDepth - 1) : []
    }
  })
  return tree
}

```

