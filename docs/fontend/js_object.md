---
title: "JavaScript中的对象创建"
summary: 
  first: "传统面向对象的语言都有类的概念，通过类可以创建任意多个具有相同属性和方法的对象，而ECMAScript中没有类的概念，它的对象更像一种散列表，是名值对的组合，其中值可以是数据或函数。"
  second: "js中对象创建也有别于传统语言，创建方式多种多样，优缺点也各不相同，因此将js中创建对象方式进行了一番整理，并将优缺点罗列出来。"
illustration: 
  position: "top"
  link: "object.png"
tag: 
  - "js"
  - "object"
---
## JavaScript中的对象创建
---
### 介绍Object类型

ECMAScript中的对象其实就是一组数据与功能的集合，Object是所有对象的基础，由于原型链的原因，所有继承于Object的对象都具有Object的基本属性和方法：
::: tip 如下
1. **constructor**：保存着用于创建当前对象的函数

2. **hasOwnProperty**：用于检查给定的属性在当前对象实例中（而不是在实例的原型中）是否存在。其参数必须是字符串

3. **isPrototypeOf(object)**：用于检查传入的对象是否是当前对象的原型

4. **toLocaleString()**：返回对象的字符串表示，该字符串与执行环境的地区对应

5. **toString()**：返回对象的字符串表示

6. **valueOf()**：返回对象的字符串、数值、或布尔值表示。通常与toString()方法的返回值相同
:::
### 创建对象的方法

#### Object和对象字面量
 
创建对象最简单的方法就是使用对象字面量或者Object构造函数，例如：
``` js
  //对象字面量方式
  let obj = {};
  obj.name = 'whilter';
  obj.sayName = function(){
      console.log(this.name);
  }
  //Object构造函数
  let obj = new Object();
  obj.name = 'whilter';
  obj.sayName = function(){
      console.log(this.name);
  }
```
::: warning 优点
创建方式简单，代码量少且易理解，创建单个对象时使用方便快捷。
:::

::: danger 缺点：
创建相同的多个对象时，会产生大量重复代码
:::

#### 工厂模式
工厂模式是用函数将创建对象的细节进行封装，函数内部返回封装完成的对象，示例代码：
``` js
function createPerson(name,age,sex){
    let person = new Object();
    person.name = name;
    person.age = age;
    person.sex =sex;
    person.sayName = function(){
        console.log(this.name);
    }
    return person;
}
```
::: warning 优点
可以批量创建对象，不会产生重复代码
:::

::: danger 缺点
无法对对象进行识别，即无法知道对象的类型
:::

#### 构造函数模式
js中存在一些原生构造函数，比如Array、Object等，可以使用这些创建相关对象，此外，也可以创建自定义的构造函数，从而定义自定义对象的属性和方法。示例如下：
``` js
function Person(name, age, sex){
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.sayName = function(){
    console.log(this.name);
  }
}
let person = new Person('whilter',23, 'men');
person.sayName();
```
构造函数一般以大写字母开头，这个做法借鉴于其他OO语言，主要是为了区别于普通函数，要创建Person的实例，必须使用new操作符，以这种方式调用构造函数，实际上会经历以下4个步骤
> 1、创建一个新的对象

> 2、将构造函数的作用域赋给新对象（将this指向新对象）

> 3、执行构造函数中的代码（为新对象添加属性）

> 4、返回新对象

上面已经说过，每个对象都有一个基本属性constructor，这里通过Person创建的实例，其constructor属性就指向Person，如下所示：
``` js
console.log(person.constructor == Person);  //true
```
::: warning 优点
批量创建对象，同时不会显式创建、返回对象，减少代码量，此外通过这种方式可以将其实例标识为一种特定的类型
:::

::: danger 缺点
对象中的每个方法都要在实例中创建一遍，函数（Function）也是对象，因此在每个实例中的方法是不相等的，然而创建两个完成同样任务的Function实例完全没有必要
:::

#### 原型模式
我们创建的每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享方法的属性和方法。使用原型的好处是可以让所有对象实例共享它所包含的属性和方法。因此我们可以通过将这些信息直接添加到原型对象中，以此来创建对象，如下所示：

```js
function Person(){
}
Person.prototype.name = 'whilter';
Person.prototype.age = 23;
Person.prototype.sex = 'men';
Person.prototype.sayName = function(){
  console.log(this.name)
};
let person = new Person();
person.sayName();
```
注：_虽然可以通过访问对象实例来访问保存在原型中的值，但是不能通过对象实例重写原型中的值，若在实例对象中添加一个原型已存在的属性，则将在实例中创建该属性，访问时，按原型链查找，会优先访问实例中的该属性，若不存在，才会向上查找原型中的属性_

::: warning 优点
所有实例对象都将共享同一属性和方法，避免了同一属性和方法的多次定义，且由于原型的动态性，在修改原型属性和方法时，所有实例都将同步修改，不论实例创建在修改前还是修改后。
:::

::: danger 缺点
由于原型的属性和方法被所有实例所共享以及原型的动态性，对于包含引用类型值的属性来说，实例将无法拥有私有值，单个实例修改该属性，将导致所有实例值一起发生改变，因此单独使用原型模式时非常不合适的选择
:::

#### 组合使用构造函数模式与原型模式
这种方式是最常见的创建自定义对象的方式，通过以上总结的优缺点，可以发现，构造函数模式适合于定义实例私有属性，而原型模式则适用于定义方法和共享属性。这样，每个实例都将拥有自己的一份实例属性副本，同时又共享着对方法的引用，最大限度的节省了内存，例子如下：
```js
function Person(name, age, sex){
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.friends = ['Mary','Bob'];
}
Person.prototype.sayName = function(){
  console.log(this.name);
}
let person1 = new Person('whilter',23,'men');
let person2 = new Person('Mary',23,'women');
console.log(person1.friends == person2.friends);  // false
console.log(person1.sayName == person2.sayName);  // true
```
#### 动态原型模式、寄生构造函数模式、稳妥构造函数模式
 略~

### 继承
许多OO语言都支持两种继承方式：接口继承和实现继承。但是由于ECMAScript函数没有签名，所有无法实现接口继承，只能实现实现继承，而其实现方式是依靠原型链来完成的。

#### 原型链
原型链的基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。
构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。
```js
function Person(name,age){
  this.name = name;
  this.age = age;
}
Person.prototype.sayName = function(){
  console.log(this.name);
}
let person = new Person('whilter',23);

Person.prototype -> Person Prototype
person[[Prototype]] -> Person Prototype
Person Prototype.constructor -> Person
person.constructor -> Person
```
此时若将原型对象等于另一个类型的实例，则此原型对象将拥有了一个指向另一类型原型对象的私有指针（[[Prototype]]，部分浏览器中也叫__proto__），依次类推，就形成了实例与原型的链条，这就是原型链的基本概念,如图所示：

![原型链示意图](/images/prototype.png)

##### 确定原型和实例的关系
有两种方式来确定原型和实例之间的关系。
* 使用instanceof操作符
```js
console.log(person instanceof Object);       //true
console.log(person instanceof Person);       //true
```

* 使用isPrototypeOf()方法
```js
console.log(Object.prototype.isPrototypeOf(person));       //true
console.log(Person.prototype.isPrototypeOf(person));       //true
```
__原型链的缺点__
和通过原型模式创建对象一样，原型链也存在引用类型被所有实例共享的问题，同时，没有办法在不影响所有对象实例的情况下，向超类型的构造函数中传递参数。因此在实践中很少会单独使用原型链。


#### 借用构造函数
这种技术的实现思路是在子类型构造函数的内部调用超类型构造函数。如下所示：
```js
function SuperType(){
  this.colors = ['red', 'blue', 'green'];
}
function SubType(){
  SuperType.call(this);
}
let instance1 = new SuperType();
instance1.colors.push('black');
console.log(instance1.colors);         // 'red, blue, green, black'

let instance2 = new SubType();
console.log(instance2.colors);         // 'red, blue, green'
```
::: warning 优点
可以在子类型构造函数中向超类型构造函数传递参数
:::

::: danger 缺点
方法都在构造函数中定义，出现重复定义，而且超类型的原型中定义的方法，对子类型来说是不可见的，因此借用构造函数也是很少单独使用的
:::

#### 组合继承
这种方式是将原型链和借用构造函数的技术组合到一起，各发挥其所长的一种继承模式





