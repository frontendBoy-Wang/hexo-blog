---
title: 再遇vue之vue3新特性
categories:
  - 前端
cover: ../img/75.jpeg
feature: true
date: 2023-10-08 23:14:01
tags: vue JS 
---



![image.png](../img/75.peg)

>想起来上次好好认真学vue，还是刚实习那会儿，如今回头看，已是三年有余了。vue从当初的vue2也大升级到vue3了。新的 API，新的语法糖，新的响应式...   
如今，我已不是以前那个小白了，对vue和js的使用也越来越熟练了，打算在好好系统的复习一下vue3的新特性。


# vue2和vue3有哪些区别？
首先说明一下，vue2和vue3是Vue.js的两个主要版本。目前vue3已经更新到3.3.4的版本了

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1da8a6c3d2104d6c94ffeb65d6d34024~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3094&h=1868&s=879638&e=png&a=1&b=0f1318)

vue3是vue2的一个重大升级，当然vue2的版本也在更新，目前已经更新到2.7.14的版本



还有一个消息就是：
-   Vue 2 将于 2023 年 12 月 31 日停止维护。详见 [Vue 2 延长 LTS](https://v2.vuejs.org/lts/)。
-   Vue 2 中文文档已迁移至 [v2.cn.vuejs.org](https://v2.cn.vuejs.org/)。
-   想从 Vue 2 升级？请参考[迁移指南](https://v3-migration.vuejs.org/)。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6693f76bd2604cb59fc128d49996b66a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3092&h=1868&s=702142&e=png&a=1&b=1c1c1c)

我个人觉得vue2和vue3的区别主要有以下几个方面：
1.  性能优化：Vue 3 在底层进行了重写，采用了更先进的编译器和运行时优化，提供了更好的性能表现。Vue 3 的虚拟 DOM 重构、组件渲染优化以及更新机制的改进等方面都使得应用程序的性能更高效。
2.  组合式 API：Vue 3 引入了组合式 API，这是一种新的组件组织方式，可以更灵活地复用和组合逻辑。与 Vue 2 中的 Options API 不同，组合式 API 基于函数，可以更清晰地分离关注点，并提供了更好的 TypeScript 支持。
3.  Composition API：Vue 3 中的 Composition API 可以让开发者根据功能组织代码，而不是按照选项对象的方式。它可以更好地处理组件中的逻辑复用、代码组织和代码重用。
4.  更小的包体积：由于底层的重构和模块的重组，Vue 3 的包体积更小，以及更好的树摇（Tree Shaking）支持，可以减少最终打包文件的大小。
5.  TypeScript 内建支持：Vue 3 对于 TypeScript 的支持更加友好，包括改进的类型推断、更好的声明文件支持和针对 Composition API 的类型推导。
6.  更好的响应式系统：Vue 2 的响应式系统通过 Object.defineProperty() 实现了数据的劫持，而Vue 3 中的响应式系统使用Proxy对象进行了重写，提供了更好的性能和更全面的响应式处理方式。Vue 3 使用了 Proxy 代理对象来实现响应式数据的追踪和触发，相比 Vue 2 的 Object.defineProperty，提供了更多的功能和更好的性能。
7.  Vu3支持自定义hooks。Vue 3 中引入的 Composition API 与 React 中的 Hooks 概念类似，提供了一组新的函数式 API，用于更灵活、清晰地组织和复用组件逻辑。
>其中常用的 hooks 基本等同于 React 中的对应 hook：
> -   `setup`：在组件创建之前执行，并返回一个响应式对象和一些函数，是使用 Composition API 的入口。
> -   `ref`：用于创建一个响应式数据，可以通过 `.value` 属性进行读写。类似于 Vue 2.x 中的 `data`。
> -   `reactive`：创建一个响应式对象，可以通过属性访问器（getter 和 setter）实现数据绑定。类似于 Vue 2.x 中的 `data`。
> -   `computed`：创建一个计算属性，它的值会根据其依赖的 `ref` 或 `reactive` 对象自动更新。
> -   `watch`：监听一个响应式数据或计算属性，当它的值发生变化时触发回调函数。
> -   `onMounted`：当前组件挂载到 DOM 上后执行的回调函数。
> -   `onUnmounted`：当前组件从 DOM 上卸载后执行的回调函数。
> -   `onUpdated`：当前组件更新后执行的回调函数。
> -   `watchEffect`：监听响应式数据的变化，在回调函数中处理相关逻辑。
>
>这些 hooks 使得我们可以更方便地组织组件逻辑，将关注点分离，提高代码的可复用性和可维护性。比如，我们可以将某个组件逻辑抽离成一个自定义 hook，然后在多个组件中进行复用。
>总之，Vue 3 中的 hooks 实现了类似 React 中的 hook 模式，使得组件逻辑更加清晰，能够更加灵活地共享和组合逻辑，并且提供了更好的 TypeScript 支持。



# vue3有哪些新的API
vue3新的API还是比较多的，主要包括组合式API，选项式API，全局API，内置指令，组件，属性，进阶API，SFC单文件组件等等...

## 组合式API
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bb410bb85ef4c5f9da7f1af219ae197~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2188&h=1614&s=332656&e=png&a=1&b=212121)
组合式API是vue3区别于vue2最明显的不一样的地方。其中有几个比较常用的API，比如
-  setup()
-  ref()
-  reactive()
-  watchEffect()
-  computed()

还有生命周期钩子，和vue2也是稍有区别。没有了 BeforeCreate和created，在方法名前面都加了个on.
猜的不错的话，相信大家用的最多的肯定是onMounted()这个钩子吧，一般网络请求都放在这个里面去执行。
>## 生命周期钩子
> -   [onMounted()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onmounted)
> -   [onUpdated()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onupdated)
> -   [onUnmounted()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onunmounted)
> -   [onBeforeMount()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onbeforemount)
> -   [onBeforeUpdate()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onbeforeupdate)
> -   [onBeforeUnmount()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onbeforeunmount)
> -   [onErrorCaptured()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured)
> -   [onRenderTracked()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onrendertracked)
> -   [onRenderTriggered()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onrendertriggered)
> -   [onActivated()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onactivated)
> -   [onDeactivated()](https://cn.vuejs.org/api/composition-api-lifecycle.html#ondeactivated)
> -   [onServerPrefetch()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onserverprefetch)


## 全局API
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fc0280c7a434f05a6e7f4f988d147a2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1546&h=1496&s=209534&e=png&a=1&b=1f1f1f)
全局API里面也有几个是需要注意的，也是经常用到的。

- createApp()
- app.mount()
- app.use()
- app.provide()
- app.config
- nextTick()
- app.config.globalProperties

这几个API是Vue.js 3.x中一些常用的核心方法和属性，它们的作用如下：

1. createApp():

createApp()是一个工厂函数，用于创建一个Vue应用程序实例。在Vue.js 3.x中，使用createApp()来代替之前版本中的Vue构造函数，可以用更简单的方式创建Vue实例。createApp()需要传入一个根组件对象和一个配置选项对象，可以配置应用程序的各种属性和行为。

例如，可以通过createApp()创建一个Vue实例，并指定根组件为App，如下所示：

```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.mount('#app')
```

2. app.mount():

app.mount()方法用于将Vue实例挂载到一个DOM元素上，使得Vue可以控制这个DOM元素内的所有内容。

例如，在上面的示例代码中，我们调用了app.mount()方法，将Vue实例挂载到了id为"app"的DOM元素上，如下所示：

```js
app.mount('#app')
```

3. app.use():

app.use()方法用于注册Vue插件，可以在Vue应用程序中添加一些全局功能和附加的特性。插件通常以函数或对象的形式提供，用于扩展或修改Vue的核心功能。

例如，可以使用app.use()方法注册Vue-Router插件，如下所示：

```js
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
```

通过调用app.use()方法，将Vue-Router插件注册到Vue应用程序中，从而实现路由功能。

4. app.provide():

app.provide()方法用于定义一个全局的依赖注入，提供了一种在组件层次结构中共享数据和函数的方式。provide()方法需要传入一个键值对对象，用于指定要注入的变量和其对应的值。

例如，可以使用app.provide()方法将一个名为"theme"的字符串注入到Vue应用程序中，如下所示：

```js
const app = createApp(App)

app.provide('theme', 'dark')

app.mount('#app')
```

在上面的示例代码中，我们使用app.provide()方法将"theme"字符串注入到Vue应用程序中，并设置为"dark"。接着，我们就可以在任何子组件中通过inject()方法来访问这个变量。

5. app.config:

app.config是一个全局的配置对象，可以用于配置Vue应用程序中的各种选项和行为。该对象包含很多属性，例如productionTip、globalProperties、isNativeTag等，可以根据应用程序的需求进行相应的配置。

例如，在Vue.js 3.x中，我们可以使用app.config.productionTip来设置控制台日志输出的环境，如下所示：

```js
const app = createApp(App)

app.config.productionTip = false

app.mount('#app')
```

在上面的示例代码中，我们禁用了控制台日志输出，以提高Vue应用程序的性能和安全性。

6. nextTick():
   nextTick()是Vue.js提供的一个异步方法。它允许你在下次 DOM 更新循环结束之后执行一段代码，以确保操作发生在更新完成后。在许多情况下，当你修改了数据之后，想要立即去访问更新后的 DOM 结构，可能会出现问题，因为 Vue 异步执行 DOM 更新。使用nextTick()可以将回调函数推迟到下一个 DOM 更新周期中执行，这样可以确保在操作数据后，DOM已经更新完毕。

例如，当我们需要在更新后获取某个元素的宽度时，需要使用nextTick()来确保在DOM更新完成后再进行获取操作。示例代码如下：

```js
app.config.globalProperties.$nextTick(() => {
  const width = document.querySelector('.element').offsetWidth;
  console.log(width);
});
```

7. app.config.globalProperties:
   app.config.globalProperties是Vue应用程序的全局属性配置对象。通过设置该对象的属性，可以将这些属性添加到每个组件实例中，从而在所有组件中共享和访问这些属性。

例如，我们可以将一个自定义的全局方法添加到Vue应用程序中的所有组件中。示例代码如下：

```js
app.config.globalProperties.$customMethod = (arg) => {
  // 这里是自定义的方法逻辑
}
```

通过在app.config.globalProperties上定义$customMethod，我们可以在任何组件内部直接调用$customMethod()方法，而无需进行额外的导入和注册。

```js
export default {
  methods: {
    handleClick() {
      this.$customMethod('Hello World');
    }
  }
}
```

在上述示例中，我们可以在组件的方法中直接调用$customMethod()方法并传入参数。这样就实现了将自定义方法添加到全局的目的，以便在任何组件中共享和使用。

# vue3的响应式系统

`Vue3`响应式实现是通过`ES6`中的`proxy`代理对象，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。这样在改写对象时就能触发响应式。同样通过递归解决对象嵌套问题。

Vue 3 的响应式系统相比于 Vue 2 发生了一些变化，介绍一下 Vue 3 的响应式系统。有几个主要的API和工具函数。
>### 响应式: 核心
>
> -   [ref()](https://cn.vuejs.org/api/reactivity-core.html#ref)
> -   [computed()](https://cn.vuejs.org/api/reactivity-core.html#computed)
> -   [reactive()](https://cn.vuejs.org/api/reactivity-core.html#reactive)
> -   [readonly()](https://cn.vuejs.org/api/reactivity-core.html#readonly)
> -   [watchEffect()](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)
> -   [watchPostEffect()](https://cn.vuejs.org/api/reactivity-core.html#watchposteffect)
> -   [watchSyncEffect()](https://cn.vuejs.org/api/reactivity-core.html#watchsynceffect)
> -   [watch()](https://cn.vuejs.org/api/reactivity-core.html#watch)

1. reactive / readonly 函数

Vue 3 中的响应式系统使用 `reactive` 和 `readonly` 函数来创建响应式对象。相较于 Vue 2 中使用的 `Vue.observable`，新的 API 更加清晰、易懂。

`reactive` 函数接受一个普通的 JavaScript 对象作为参数，返回一个响应式代理对象。这个代理对象可以监控被代理对象所有的属性的变化，包括嵌套对象和数组。

```js
import { reactive } from 'vue'

const obj = reactive({
  count: 0,
  message: 'Hello World',
  nested: {
    foo: 'bar'
  },
  arr: [1, 2, 3]
})

// 访问代理对象的属性
console.log(obj.count) // 0

// 修改代理对象的属性
obj.count++

// 修改代理对象的嵌套属性和数组
obj.nested.foo = 'baz'
obj.arr.push(4)
```

`readonly` 与 `reactive` 的用法类似，不同之处在于它返回的是一个只读的响应式代理对象，无法修改代理对象的属性。

2. ref 函数

Vue 3 中的 `ref` 函数用来包装基本类型的值，使其变成响应式的。`ref` 返回一个包含该值的引用对象，该引用对象有一个 value 属性，访问或修改该属性会触发依赖更新。

```js
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
```

3. computed 函数

Vue 3 中的 `computed` 函数用来创建计算属性。与 Vue 2 中的 `computed` 类似，但是在使用时需要在 computed 函数内部返回计算结果。

```js
import { computed, reactive } from 'vue'

const state = reactive({
  message: 'Hello',
  name: 'World'
})

const fullName = computed(() => {
  return `${state.message} ${state.name}`
})

console.log(fullName.value) // 'Hello World'

// 修改响应式对象中的属性
state.name = 'Vue 3'
console.log(fullName.value) // 'Hello Vue 3'
```

4. watch / watchEffect 函数

Vue 3 中的 `watch` 和 `watchEffect` 函数用来监视响应式对象的变化，当被监视的对象发生变化时，会触发回调函数执行。

`watch` 函数用来监视特定的响应式属性，当该属性的值发生变化时才会触发回调函数执行。

```js
import { watch, reactive } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello World'
})

watch(
  () => state.count,
  (newValue, oldValue) => {
    console.log(`count changed from ${oldValue} to ${newValue}`)
  }
)

state.count++ // count changed from 0 to 1
```

`watchEffect` 函数用来监视响应式对象中的任何属性，当该对象的任何属性发生变化时都会触发回调函数执行。

```js
import { watchEffect, reactive } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello World'
})

watchEffect(() => {
  console.log(`state changed: ${state.count}, ${state.message}`)
})

state.count++ // state changed: 1, Hello World
state.message = 'Vue 3' // state changed: 1, Vue 3
```

以上是 Vue 3 中响应式系统的一些基础使用方法。与 Vue 2 相比，Vue 3 的响应式系统更加简洁、易懂，同时在性能和体积方面也得到了优化。




# setup语法糖到底是什么
起初 Vue3.0 暴露变量必须 return 出来，template中才能使用；
这样会导致在页面上变量会出现很多次。
很不友好，vue3.2只需在script标签中添加setup。
可以帮助我们解决这个问题。
>
> 1.组件只需引入不用注册，属性和方法也不用返回   
> 2.也不用写setup函数，也不用写export default    
> 3.自定义指令也可以在我们的template中自动获得。    
> 4.子组件使用defineProps接受父组件参数   
> 5.子组件defineEmits自定义事件，父组件调用
> 6.将子组件中的属性defineExpose(）暴露出去，这样父组件可以获取


# 新项目应该用vue2还是vue3

这个问题，应该是毋庸置疑的，`Vue 2 将于 2023 年 12 月 31 日停止维护。`所以我们在做新的项目肯定是优先考虑vue3的。老项目用的是vue2的话，需不需要重构，这要看实际的场景了。
vue3搭配vite，开发体验简直提升了一个档次。速度更快，体验更好，性能更好，为何不用新的呢？而且vue3的学习成本也不高，有vue2的基础，上手vue3那简直是分分钟的事情，如果有问题就直接查文档就好了。vue的官方文档还是比较详细的。

### 总结一下：
对于新项目，建议优先考虑使用 Vue 3。

以下是一些选择 Vue 3 的理由：

1. 更好的性能：Vue 3 在性能方面进行了许多优化，包括更快的渲染速度和更小的包体积。它引入了基于 Proxy 的响应式系统，使得响应式数据的追踪和更新更高效，同时也提高了虚拟 DOM 渲染的性能。

2. 更好的开发体验：Vue 3 提供了一些新的特性和语法糖，例如 `Composition API`、`setup` 函数等，可以帮助开发者组织和重用组件逻辑，提高代码的可读性和可维护性。另外，它还提供了更多的 TypeScript 支持，包括类型推断和类型声明。

3. 更好的生态系统：随着时间的推移，Vue 3 生态系统会不断壮大，支持的库和插件会越来越多。而 Vue 2 的生态系统虽然依然庞大，但未来的新特性和更新可能会更多地集中在 Vue 3 上。

当然，对于一些特定情况，如已经有一个 Vue 2 的项目或依赖某个 Vue 2 的第三方库，可能需要权衡利弊再做选择。但从长远来看，Vue 3 将是更好的选择，它提供了更多的新特性、更好的性能和开发体验，以及更好的生态支持。


# vue3可以搭配哪些库使用


首先是vue全家桶了：
- vueRouter
- vuex/pinia
- element plus
- axios
- vite
- typescript
- vue cli


以上技术栈☝️应该是当下绝大多数企业家项目的选择了。还有搭配第三方UI组件库的一些UI框架,比如以下这些。孰优孰劣，大家可以自己去分辨，根据自己的项目需要来选择就可以了

- [Ant Design of Vue](https://antdv.com/docs/vue/introduce-cn)
- [naive UI](https://www.naiveui.com/zh-CN/dark)
-   [primevue]( )
-   [headlessui]( )
-   [vuetify]( )
-   [quasar]( )
-   [radix-vue]( )
-   [nuxtui]( )
-   [anu-vue]( )
-   [vuestic]( )
-   [daisyui]( )


    


