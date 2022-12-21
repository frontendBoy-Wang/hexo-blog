---
title: 前端常用utils工具方法小总结
categories:
  - 技术
cover: ../img/1.png
feature: false
date: 2022-12-21 22:46:32
tags:
---

> 前端常用utils工具方法小总结

```javascript

// 数组去重
const uniqueArray = arr => [...new Set(arr)];

// 从url获取参数，并且转换成对象
const getParameters = URL => JSON.parse(`{"${decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`)

//检查对象是否为空
const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object
//检查是否为对象
const isObject = obj => !(Object.keys(obj).length === 0)

//字符串反转
const reverseString = str => str.split('').reverse().join('')

//随机生成十六进制颜色值
const randomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`

//检查当前选项卡是否在后台
const isTabActive = () => !document.hidden;

//检查元素是否处于焦点
const eleIsInFocus = el => (el.document.activeElement)

//检查设备类型
const judgeDeviceType = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'PC';

//文字复制到剪切板
const copyText = async text => await navigator.clipboard.writeText(text)

// 返回选中的内容
const getSelectedText = () => window.getSelection().toString();

//查询某天是否为工作日
const isWeekday = (date) => date.getDay() % 6 !== 0;

//两日期之间相差的天数
const dayDiff = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

//检查日期是否有效
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

// 计算两个日期之间的间隔
const dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)

//查找日期位于一年中的第几天
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//时间格式化
const timeFromDate = date => date.toTimeString().slice(0, 8);

//字符串首字母大小
const firstUpper = str => str.charAt(0).toUpperCase() + str.slice(1);

//随机字符串
const randomString = () => Math.random().toString(36).slice(2)

//去除字符串中的html
const striphtml = html => html(new DOMParser().parseFromString(html, 'text/html').body.textContent || '')

//判断数组是否为空
const isNotEmpty = array => Array.isArray(array) && array.length > 0

//合并两个数组
const merge = (a, b) => a.concat(b)
const mergeArr = (a, b) => [...a, ...b]

//获取一组数据的平均值
const average = (...args) => args.reduce((a, b) => a + b) / args.length

//取两个整数之间的随机值
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

//指定位数的四舍五入
const roundNumber = (n, d) => Number(Math.round(n + "e" + d) + 'e-' + d)

//将RGB转化为十六机制
const rgbaToHex = (r, g, b, a) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

//清除所以cookie
const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`));

//检测是否是黑暗模式
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

//滚动到顶部
const goToTop = () => window.screenTop(0, 0)

//判断是否滚动到底部
const scrolledToBottom = () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight;

//重定向到一个url
const redirectToUrl = (url) => window.location.href = url

//打开浏览器的打印页面
const showPrintDialog = () => window.print()

//随机布尔值
const randomBoolean = () => Math.random() >= 0.5

//变量交换
let a = 1, b = 2;
[a, b] = [b, a]

//获取变量的类型
const trueTypeOf = (obj) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();


```


# 防抖
定义：n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
```javascript
//处理任务，和等待时间
function debounce(fn, delay){
     let timerId = null
     return function(){
         const context = this
         //如果接到订单就再等3分钟
         if(timerId){window.clearTimeout(timerId)}
         //3分钟没有接到订单就直接配送
         timerId = setTimeout(()=>{
             fn.apply(context, arguments)
             timerId = null
         },delay)
     }
 }

```


# 节流
定义：n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
> 节流就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率

```javascript
export const debouncer = (fn, time, interval = 200) => {
	if (time - (window.debounceTimestamp || 0) > interval) {
		fn && fn();
		window.debounceTimestamp = time;
	}
}
```
```javascript
function throttle(fn, delay){
     // 设置一个触发开关
     let canUse = true
     return function(){
     //如果为true，就触发技能，否则就不能触发
         if(canUse){
             fn.apply(this, arguments)
             //触发技能后，关闭开关
             canUse = false
             //在3秒后打开开关
             setTimeout(()=>canUse = true, delay)
         }
     }
 }

```

# cookie工具方法
设置cookie
```javascript
function setCookieItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
    }
    var sExpires = "";
    if (vEnd) {
        switch (vEnd.constructor) {
            case Number:
                sExpires = vEnd === Infinity 
                    ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" 
                	: "; max-age=" + vEnd;
                break;
            case String:
                sExpires = "; expires=" + vEnd;
                break;
            case Date:
                sExpires = "; expires=" + vEnd.toUTCString();
                break;
        }
    }
    document.cookie = encodeURIComponent(sKey) 
        + "=" + encodeURIComponent(sValue) 
        + sExpires 
        + (sDomain ? "; domain=" + sDomain : "") 
        + (sPath ? "; path=" + sPath : "") 
        + (bSecure ? "; secure" : "");
    return true;
}
```

判断cookie是否存在
```javascript
function isCookieItemExisted(sKey) {
    return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
}
```

删除cookie
```javascript
function removeCookieItem(sKey, sPath, sDomain) {
    if (!sKey || !isCookieItemExisted(sKey)) {
        return false;
    }
    document.cookie = encodeURIComponent(sKey) 
        + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" 
        + (sDomain ? "; domain=" + sDomain : "") 
        + (sPath ? "; path=" + sPath : "");
    return true;
}
```

查找cookie
```javascript
function getCookieByKey(sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  }
```



# localhostStorage工具方法
设置localStorage
```javascript
export const setStore = (params = {}) => {
    let {
        name,
        content,
        type,
    } = params;
    name = keyName + name
    let obj = {
        dataType: typeof (content),
        content: content,
        type: type,
        datetime: new Date().getTime()
    }
    if (type) window.sessionStorage.setItem(name, JSON.stringify(obj));
    else window.localStorage.setItem(name, JSON.stringify(obj));
}
```

获取localStorage
```javascript
export const getStore = (params = {}) => {
    let {
        name,
        debug
    } = params;
    name = keyName + name
    let obj = {},
        content;
    obj = window.sessionStorage.getItem(name);
    if (validatenull(obj)) obj = window.localStorage.getItem(name);
    if (validatenull(obj)) return;
    try {
        obj = JSON.parse(obj);
    } catch {
        return obj;
    }
    if (debug) {
        return obj;
    }
    if (obj.dataType == 'string') {
        content = obj.content;
    } else if (obj.dataType == 'number') {
        content = Number(obj.content);
    } else if (obj.dataType == 'boolean') {
        content = eval(obj.content);
    } else if (obj.dataType == 'object') {
        content = obj.content;
    }
    return content;
}

```

删除localStorage
```javascript
export const removeStore = (params = {}) => {
    let {
        name,
        type
    } = params;
    name = keyName + name
    if (type) {
        window.sessionStorage.removeItem(name);
    } else {
        window.localStorage.removeItem(name);
    }
}

```

获取全部local Storage
```javascript
export const getAllStore = (params = {}) => {
    let list = [];
    let {
        type
    } = params;
    if (type) {
        for (let i = 0; i <= window.sessionStorage.length; i++) {
            list.push({
                name: window.sessionStorage.key(i),
                content: getStore({
                    name: window.sessionStorage.key(i),
                    type: 'session'
                })
            })
        }
    } else {
        for (let i = 0; i <= window.localStorage.length; i++) {
            list.push({
                name: window.localStorage.key(i),
                content: getStore({
                    name: window.localStorage.key(i),
                })
            })
        }
    }
    return list;
}
```

清空全部local Storage
```javascript
export const clearStore = (params = {}) => {
    let {
        type
    } = params;
    if (type) {
        window.sessionStorage.clear();
    } else {
        window.localStorage.clear()
    }
}
```

# 时间转换
```javascript
    function getdate(date) {
        var now = new Date(date),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
        return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + now.toTimeString().substr(0, 8);
    }
```

