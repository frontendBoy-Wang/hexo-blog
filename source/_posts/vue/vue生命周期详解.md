---
title: VUE生命周期详解
categories:
- vue
cover: ../img/35.png
feature: false
date: 2023-3-15 10:46:35
tags: vue
---

# VUE生命周期
 >大家好我是迁客，一个初入行的小白！痴迷技术，对programming有着极大的兴趣和爱好。每周写一篇自己个人成长的技术博客！既是对自己的一个学习技术的一个记录，也是督促自己，坚持下去！加油Fighting！
 >==从明天起，做一个新思维的人
 >继承，多态，层层封装
 >从明天起,不再关心内存管理
 >让每一条数据，自动放到合适的位子上
 >从明天起，我将为每一个对象
 >取一个温暖的名字
 >它们用驼峰命名，优雅，大方
 >陌生人，我也祝福你哈
 >愿你不再为系统级bug烦恼
 >愿你在平台之间肆意游荡
 >愿你不再关心溢出与异常==
* VUE的生命周期大致分为8个阶段：

1.beforeCreate(创建前):在数据观测和初始化事件还未开始
    
```javascript
beforeCreate: function () {
            console.group('------beforeCreate创建前状态------');
            console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
            console.log("%c%s", "color:red", "data   : " + this.$data); //undefined
            console.log("%c%s", "color:red", "message: " + this.message)
        }
```


2.created(创建后):完成数据观测，属性和方法的运算，初始化事件，$el属性还没有显示出来
```javascript
created: function () {
            console.group('------created创建完毕状态------');
            console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
            console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
            console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
        }
```
3.beforeMount(载入前):
        在挂载开始之前被调用，相关的render函数首次被调用。
        实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。注意此时还没有挂载html到页面上。
```javascript
beforeMount: function () {
            console.group('------beforeMount挂载前状态------');
            console.log("%c%s", "color:red", "el     : " + (this.$el)); //已被初始化
            console.log(this.$el);
            console.log("%c%s", "color:red", "data   : ", this.$data); //已被初始化
            console.log("%c%s", "color:red", "message: ", this.message); //已被初始化
        },
```


​        
4.mounted（载入后）:
​        在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。
​        实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互。
```javascript
 mounted: function () {
            console.group('------mounted 挂载结束状态------');
            console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
            console.log(this.$el);
            console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
            console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
        },
```
 5.beforeUpdate（更新前）:
     在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
```javascript
beforeUpdate: function () {
    
            console.group('beforeUpdate 更新前状态===============》');
            console.log("%c%s", "color:red", "el     : " + this.$el);
            console.log(this.$el);
            console.log("%c%s", "color:red", "data   : " + this.$data);
            console.log("%c%s", "color:red", "message: " + this.message);
        },
```
 6.updated（更新后）:
     在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。
     调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。
     该钩子在服务器端渲染期间不被调用。
```javascript
updated: function () {
            console.group('updated 更新完成状态===============》');
            console.log("%c%s", "color:red", "el     : " + this.$el);
            console.log(this.$el);
            console.log("%c%s", "color:red", "data   : " + this.$data);
            console.log("%c%s", "color:red", "message: " + this.message);
        },
```

 7.beforeDestroy（销毁前）:在实例销毁之前调用。实例仍然完全可用。
 ```javascript
 beforeDestroy: function () {
            console.group('beforeDestroy 销毁前状态===============》');
            console.log("%c%s", "color:red", "el     : " + this.$el);
            console.log(this.$el);
            console.log("%c%s", "color:red", "data   : " + this.$data);
            console.log("%c%s", "color:red", "message: " + this.message);
        },
 ```
 8.destroyed（销毁后）:
        在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。
```javascript
destroyed: function () {
            console.group('destroyed 销毁完成状态===============>>');
            console.log("%c%s", "color:red", "el     : " + this.$el);
            console.log(this.$el);
            console.log("%c%s", "color:red", "data   : " + this.$data);
            console.log("%c%s", "color:red", "message: " + this.message)
        }
```

==好了，最后有什么不足和错误的地方欢迎大家在评论区指出，希望大家对大家有所帮助，谢谢==