---
title: 一文带你了解call、apply、bind的区别及源码实现
categories:
    - 前端
    - js
cover: ../img/0.png
feature: false
date: 2023-10-04 02:46:35
tags: js
---

# 前言
call、apply和bind都是JavaScript中Function对象的原型方法，它们的作用主要是改变函数的执行上下文（即this的值）以及传递参数。


# 什么是js上下文
在讲解这三个方法之前，我先需要了解一下什么是js的上下文。

执行上下文是JavaScript中的一个重要概念，它是一段代码被执行时的环境。它包含了当前执行环境中的所有信息，如变量、函数声明、参数（arguments）、作用域链，以及this等信息。

在JavaScript中，执行上下文主要有两种类型：全局执行上下文和函数执行上下文。
还有一个## `eval`函数执行上下文

## 全局执行上下文
全局执行上下文是为运行存在于函数之外的任何代码而创建的，即整个JavaScript程序的执行环境就是一个全局执行上下文。每当一个函数被调用时，就会创建一个新的函数执行上下文，这个函数执行上下文包含了这个函数自身的局部变量、参数等执行环境信息。此外，使用 eval() 函数也会创建一个新的执行上下文。



## 函数执行上下文。


函数执行上下文是指在调用一个函数时，函数内部的变量和参数的取值范围。当一个函数被调用时，就会为该函数创建一个新的执行上下文，函数的上下文可以有任意多个。

在JavaScript中，函数执行上下文通常包括以下内容：

1. 函数内部声明的变量（局部变量）：这些变量只在函数内部有效，函数外部无法访问。
2. 函数参数：当调用函数时传递的实参，它们会被赋值给形参。
3. 全局变量：在函数外部声明的变量，可以在函数内部直接访问。
4. 内置对象：如Math、Array等，它们提供了一些内置的方法和属性。
5. 其他执行上下文相关的信息，如调用栈、作用域链等。

以下是一个示例代码，展示了函数执行上下文的相关内容：

```javascript
// 定义全局变量
var globalVar = "I am a global variable";

function exampleFunction(param1, param2) {
  // 定义局部变量
  var localVar = "I am a local variable";

  console.log(globalVar); // 输出全局变量的值
  console.log(localVar); // 输出局部变量的值
  console.log(param1); // 输出第一个参数的值
  console.log(param2); // 输出第二个参数的值
}

exampleFunction("Hello", "World");
```

在上面的示例中，`exampleFunction`是一个函数，它接受两个参数`param1`和`param2`。在函数内部，我们声明了一个局部变量`localVar`，并使用`console.log()`打印了全局变量`globalVar`、局部变量`localVar`以及传入的参数值。当我们调用`exampleFunction("Hello", "World")`时，函数执行上下文中的变量和参数值将被正确地传递给函数内部的代码块。



## `eval`函数执行上下文

执行在eval函数中的代码会有属于他自己的执行上下文，不过eval函数不常使用，

在JavaScript中，`eval()`函数用于执行一个字符串表达式，并返回表达式的值。它的执行上下文通常是当前的全局和局部变量。

以下是一个示例代码，展示了如何使用`eval()`函数：

```javascript
// 定义全局变量
var globalVar = 10;

// 定义局部变量
var localVar = 5;

// 使用eval()函数执行字符串表达式
var result = eval("globalVar + localVar");

console.log(result); // 输出结果为15
```

在上面的示例中，我们首先定义了两个变量`globalVar`和`localVar`，分别表示全局变量和局部变量。然后，我们使用`eval()`函数执行了一个字符串表达式`"globalVar + localVar"`，该表达式将返回全局变量和局部变量的和。最后，我们将结果打印出来，输出为15。





##### 2. 执行上下文栈

-   JavaScript引擎使用执行上下文栈来管理执行上下文
-   当JavaScript执行代码时，首先遇到全局代码，会创建一个全局执行上下文并且压入执行栈中，每当遇到一个函数调用，就会为该函数创建一个新的执行上下文并压入栈顶，引擎会执行位于执行上下文栈顶的函数，当函数执行完成之后，执行上下文从栈中弹出，继续执行下一个上下文。当所有的代码都执行完毕之后，从栈中弹出全局执行上下文。

```js
let a = 'Hello World!';
function first() {
  console.log('Inside first function');
  second();
  console.log('Again inside first function');
}
function second() {
  console.log('Inside second function');
}
first();
//执行顺序
//先执行second(),在执行first()
```

##### 3. 创建执行上下文

创建执行上下文有两个阶段：**创建阶段**和**执行阶段**

**1）创建阶段**

（1）this绑定

-   在全局执行上下文中，this指向全局对象（window对象）
-   在函数执行上下文中，this指向取决于函数如何调用。如果它被一个引用对象调用，那么 this 会被设置成那个对象，否则 this 的值被设置为全局对象或者 undefined

（2）创建词法环境组件

-   词法环境是一种有**标识符——变量映射**的数据结构，标识符是指变量/函数名，变量是对实际对象或原始数据的引用。
-   词法环境的内部有两个组件：**加粗样式**：环境记录器:用来储存变量个函数声明的实际位置**外部环境的引用**：可以访问父级作用域

（3）创建变量环境组件

-   变量环境也是一个词法环境，其环境记录器持有变量声明语句在执行上下文中创建的绑定关系。

**2）执行阶段**

此阶段会完成对变量的分配，最后执行完代码。

**简单来说执行上下文就是指：**

在执行一点JS代码之前，需要先解析代码。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为undefined，函数先声明好可使用。这一步执行完了，才开始正式的执行程序。

在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出this、arguments和函数的参数。

-   全局上下文：变量定义，函数声明
-   函数上下文：变量定义，函数声明，`this`，`arguments`



# this/call/apply/bind



this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。在实际开发中，this 的指向可以通过四种调用模式来判断。

-   第一种是**函数调用模式**，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。
-   第二种是**方法调用模式**，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
-   第三种是**构造器调用模式**，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。
-   第四种是 **apply 、 call 和 bind 调用模式**，这三个方法都可以显示的指定调用函数的 this 指向。其中 apply 方法接收两个参数：一个是 this 绑定的对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。

这四种方式，使用构造器调用模式的优先级最高，然后是 apply、call 和 bind 调用模式，然后是方法调用模式，然后是函数调用模式。


# call、apply、bind的区别
在JavaScript中，`call()`、`apply()`和`bind()`都是用于改变函数执行上下文的方法。它们的主要区别在于传递参数的方式和返回值。

1. `call()`方法：
   - 语法：`function.call(thisArg, arg1, arg2, ...)`
   - 作用：调用一个函数，并设置函数内部的`this`值为指定的值，同时传递一系列参数给函数。
   - 返回值：返回被调用函数的返回值。
   - 示例代码：
     ```javascript
     function greet() {
       console.log(`Hello, ${this.name}!`);
     }
     
     var person = { name: 'Alice' };
     greet.call(person); // 输出 "Hello, Alice!"
     ```

2. `apply()`方法：
   - 语法：`function.apply(thisArg, [argsArray])`
   - 作用：调用一个函数，并设置函数内部的`this`值为指定的值，同时传递一个数组作为参数列表给函数。
   - 返回值：返回被调用函数的返回值。
   - 示例代码：
     ```javascript
     function greet() {
       console.log(`Hello, ${this.name}!`);
     }
     
     var person = { name: 'Alice' };
     greet.apply(person); // 输出 "Hello, Alice!"
     ```

3. `bind()`方法：
   - 语法：`function.bind(thisArg, arg1, arg2, ...)`
   - 作用：创建一个新的函数，并将原函数内部的`this`值设置为指定的值，同时将一系列参数绑定到新函数上。新函数可以单独调用，但不会改变原函数的执行上下文。
   - 返回值：返回一个新函数。
   - 示例代码：
     ```javascript
     function greet() {
       console.log(`Hello, ${this.name}!`);
     }
     
     var person = { name: 'Alice' };
     var greetPerson = greet.bind(person); // 创建新函数 greetPerson
     greetPerson(); // 输出 "Hello, Alice!"
     ```

总结来说，`call()`和`apply()`方法都可以用来改变函数执行上下文，并且可以传递多个参数给函数。而`bind()`方法则创建了一个新的函数，并将原函数的执行上下文绑定到新函数上，但只接受第一个参数作为上下文对象，后续的参数会作为新函数的参数。


# call、apply、bind的源码实现

## **（1）call 函数的实现步骤：**
-   判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
-   判断传入上下文对象是否存在，如果不存在，则设置为 window 。
-   处理传入的参数，截取第一个参数后的所有参数。
-   将函数作为上下文对象的一个属性。
-   使用上下文对象来调用这个方法，并保存返回结果。
-   删除刚才新增的属性。
-   返回结果。

```js
Function.prototype.myCall = function(context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
    result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
};
```

## **（2）apply 函数的实现步骤：**

-   判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
-   判断传入上下文对象是否存在，如果不存在，则设置为 window 。
-   将函数作为上下文对象的一个属性。
-   判断参数值是否传入
-   使用上下文对象来调用这个方法，并保存返回结果。
-   删除刚才新增的属性
-   返回结果

```js
Function.prototype.myApply = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let result = null;
  // 判断 context 是否存在，如果未传入则为 window
  context = context || window;
  // 将函数设为对象的方法
  context.fn = this;
  // 调用方法
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 将属性删除
  delete context.fn;
  return result;
};
```

## **（3）bind 函数的实现步骤：**

-   判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
-   保存当前函数的引用，获取其余传入参数值。
-   创建一个函数返回
-   函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。

```js
Function.prototype.myBind = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 获取参数
  var args = [...arguments].slice(1),
    fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};
```