---
title: python多线程爬虫-下载wallhaven超清壁纸
categories:
- python
cover: ../img/42.png
feature: false
date: 2023-4-12 10:46:35
tags: 爬虫
---

![9-wallhaven-exwgw8.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/762e1bfaf9d04c7e8a468a2ed7f5275e~tplv-k3u1fbpfcp-zoom-1.image)

> 大家好我是前端少年汪！痴迷技术，对programming有着极大的兴趣和爱好。
> 从明天起，做一个新思维的人 继承，多态，层层封装 从明天起,不再关心内存管理 让每一条数据，自动放到合适的位子上 从明天起，我将为每一个对象 取一个温暖的名字 它们用驼峰命名，优雅，大方 陌生人，我也祝福你哈 愿你不再为系统级bug烦恼 愿你在平台之间肆意游荡 愿你不再关心溢出与异常

爬取的目标网站：<https://wallhaven.cc/>

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08efb230169c4fbfb7f218b58c099b49~tplv-k3u1fbpfcp-watermark.image?)

使用到的库：
*   requests
*   Xpath

## 分析目标网站的DOM结构

我们可以看到这个网站总共分为六个大的模块：**Latest，Hot，Toplist，Random，Upload，Forums**
我爬取的主要是latest，hot，toplist，random这四个模块的图片.
这四个模块对应的url网址分别为：

*   [https://wallhaven.cc/](https://wallhaven.cc/latest)latest
*   [https://wallhaven.cc/](https://wallhaven.cc/latest)hot
*   [https://wallhaven.cc/](https://wallhaven.cc/latest)toplist
*   [https://wallhaven.cc/](https://wallhaven.cc/latest)random

图片的预览页面

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8503b5d9f1a46bc9119d10d68359484~tplv-k3u1fbpfcp-zoom-1.image)

这里可以看到page=2的页面总共🈶️24张图片，这个只是缩略图，点击单个item项就可以进入到图片的详情页，可以看到对应的图片的详情页面的url在section>ul>li>figure>a标签的href属性中。

图片的详情页

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/194cf7b7fea446dea0cfe161b4126d64~tplv-k3u1fbpfcp-zoom-1.image)

可以看到真正的图片的url是存在于img标签的src属性，只要我们拿到这个图片的地址就可以下载图片到本地了。

## 梳理一下逻辑：

1.  请求latest，hot，toplist，random四个模块中的任意一个页面获取到缩略图的a标签里面的url，保存到一个列表里面
2.  遍历缩略图列表，获取详情页img标签的src图片地址
3.  请求图片地址，下载保存到本地

大概的逻辑就是这么简单

### 代码实现

#### 导入相关包，定义全局变量

```python
import os
import threading

import requests
from lxml import etree

"""
爬取网站：https://wallhaven.cc/
"""
# 伪装浏览器请求
headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
}
# 存放下载图片的文件夹名称
new_folder = 'img'
# 5个模块对应的字符串列表
type_list = ['hot', 'toplist', 'latest', 'random']
# 线程池
threads = []
```

#### 获取缩略图页面

```python
# 单页下载，只下载一页24张图片
def get_wall_one_page(type_index: int, page_num) -> None:
    # page_num爬取的页码
    url = 'https://wallhaven.cc/{}?page={}'.format(type_list[type_index], page_num)
    print(url)
    # 获取当前目录
    current_dir = os.getcwd()

    # 新文件夹的名称
    # new_folder = 'img_{}'.format(type_list[type_index])  # 创建新文件夹
    if not os.path.exists(new_folder):
        os.mkdir(os.path.join(current_dir, new_folder))

    res = requests.get(url, headers=headers).text
    selector = etree.HTML(res)
    img_urls = selector.xpath('//a[@class=\'preview\']/@href')
    # 调用获取详情页方法
    detail_img(img_urls)
```

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93134b340e41465198ec38726153e6ca~tplv-k3u1fbpfcp-watermark.image?#id=iImhK\&originalType=binary\&ratio=1\&rotation=0\&showTitle=false\&status=done\&style=none\&title=)

#### 获取图片详情页面

```python
def detail_img(img_urls):
    """
    图片详情
    :param img_urls:获取到单个图片item的详情url
    :return:
    """
    i = 0

    for item in img_urls:
        son_res = requests.get(item, headers=headers).text
        selector = etree.HTML(son_res)
        src_arr = selector.xpath('//img[@id=\'wallpaper\']/@src')
        # 使用多线程下载图片，调用下载方法
        t = threading.Thread(target=download_img, args=(src_arr[0], i))
        t.start()
        threads.append(t)
        # download_img(src_arr[0], i)

        i += 1
        # 等待所有线程完成
    for t in threads:
        t.join()
    print("当前页所有图片下载完成")
```

#### 下载图片

```python
def download_img(img_src, i):
    """
    图片下载
    :param img_src: 图片的src
    :param i: 序号
    :return: void
    """
    with open('./{}/{}-{}'.format(new_folder, i, img_src.split('/')[-1]), 'wb') as f:
        f.write(requests.get(img_src).content)
    print(i, img_src)
```

以上就是爬取单页（一页24张图片的方法），观察url可以得知，通过改变page这个参数就可以不断爬取不同页码的图片了。可以有2种不同的思路：

1.  爬取所有页，从1到total。有多少就爬多少
2.  输入指定页码范围，爬取指定多少页

如果是第一种的话，我们还需要获取到total总页码数。因为页码是懒加载的，鼠标滑动到底部才会请求加载下一页，这个时候才能看到总页码。
我想到了两种思路：

1.  直接请求第二页。如果存在的话，就获取到总页码，如果不存在第二页说明这个只有一页，返回1。
2.  使用selenium库，控制鼠标滑动页码到底部，加载下一页，然后获取总页码。

我感觉两种方法都差不多，就用简单一点的第一种方法

#### 获取总页码

```python

def get_num(type_index):
    """ 获取总页码
    :param type_index:爬取的类型索引
    :return:当前的页码数量
    """
    url = 'https://wallhaven.cc/{}?page=2'.format(type_list[type_index])
    selector = etree.HTML(requests.get(url, headers=headers).text)
    page_num = selector.xpath('//header[@class=\'thumb-listing-page-header\']/h2//text()')
    return ''.join(page_num).split(' ')[-1]
```

#### 爬取指定类型，页码范围or爬取全部页

循环起始页到最后页，无非就是在爬取单页的基础上再多一层循环。
如果不传入开始页码和最后页码的话，那开始页码就是第一页，总页码就是当前页面最后页码

```python

def get_total(type_index, start, end):
    """
    爬取指定类型，页码范围
    :param type_index:
    :param start:
    :param end:
    :return:
    """
    # total = int(get_num(type_index))
    if end is None:
    	end = total
    if start is None:
        start = 1
    try:
        for i in range(start, end):
            url = 'https://wallhaven.cc/{}?page={}'.format(type_list[type_index], i)
            print(url, '开始下载第{}/{}页'.format(i, end - 1))
            res = requests.get(url, headers=headers).text
            selector = etree.HTML(res)
            img_urls = selector.xpath('//a[@class=\'preview\']/@href')
            detail_img(img_urls)
            # threading.Thread(target=detail_img, args=(img_urls)).start()
    except Exception as e:
        print(e)


```

这是获取到的图片结果



![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60be1f474036411a9946a99c4acd854f~tplv-k3u1fbpfcp-zoom-1.image)



#### 最后是所有代码

```python
import os
import threading

import requests
from lxml import etree

"""
爬取网站：https://wallhaven.cc/
"""
# 伪装浏览器请求
headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
}
# 存放下载图片的文件夹名称
new_folder = 'img'
# 5个模块对应的字符串列表
type_list = ['hot', 'toplist', 'latest', 'random']
# 线程池
threads = []


# 单页下载，只下载一页24张图片
def get_wall_one_page(type_index: int, page_num) -> None:
    # page_num爬取的页码
    url = 'https://wallhaven.cc/{}?page={}'.format(type_list[type_index], page_num)
    print(url)
    # 获取当前目录
    current_dir = os.getcwd()

    # 新文件夹的名称
    # new_folder = 'img_{}'.format(type_list[type_index])  # 创建新文件夹
    if not os.path.exists(new_folder):
        os.mkdir(os.path.join(current_dir, new_folder))

    res = requests.get(url, headers=headers).text
    selector = etree.HTML(res)
    img_urls = selector.xpath('//a[@class=\'preview\']/@href')
    detail_img(img_urls)


def detail_img(img_urls):
    """
    图片详情
    :param img_urls:获取到单个图片item的详情url
    :return:
    """
    i = 0

    for item in img_urls:
        son_res = requests.get(item, headers=headers).text
        selector = etree.HTML(son_res)
        src_arr = selector.xpath('//img[@id=\'wallpaper\']/@src')
        # 使用多线程下载图片
        t = threading.Thread(target=download_img, args=(src_arr[0], i))
        t.start()
        threads.append(t)
        # download_img(src_arr[0], i)

        i += 1
        # 等待所有线程完成
    for t in threads:
        t.join()
    print("当前页所有图片下载完成")


def download_img(img_src, i):
    """
    图片下载
    :param img_src: 图片的src
    :param i: 序号
    :return: void
    """
    with open('./{}/{}-{}'.format(new_folder, i, img_src.split('/')[-1]), 'wb') as f:
        f.write(requests.get(img_src).content)
    print(i, img_src)


def get_num(type_index):
    """ 获取总页码
    :param type_index:爬取的类型索引
    :return:当前的页码数量
    """
    url = 'https://wallhaven.cc/{}?page=2'.format(type_list[type_index])
    selector = etree.HTML(requests.get(url, headers=headers).text)
    page_num = selector.xpath('//header[@class=\'thumb-listing-page-header\']/h2//text()')
    return ''.join(page_num).split(' ')[-1]


def get_total(type_index, start, end):
    """
    爬取指定类型，页码范围
    :param type_index:
    :param start:
    :param end:
    :return:
    """
    # total = int(get_num(type_index))
    if end is None:
    	end = total
    if start is None:
        start = 1
    try:
        for i in range(start, end):
            url = 'https://wallhaven.cc/{}?page={}'.format(type_list[type_index], i)
            print(url, '开始下载第{}/{}页'.format(i, end - 1))
            res = requests.get(url, headers=headers).text
            selector = etree.HTML(res)
            img_urls = selector.xpath('//a[@class=\'preview\']/@href')
            detail_img(img_urls)
            # threading.Thread(target=detail_img, args=(img_urls)).start()
    except Exception as e:
        print(e)


# https://wallhaven.cc/search?q=code&page=1
# todo 根据输入关键词，查找下载

if __name__ == '__main__':
    """
    0:'hot', 热榜
    1:'toplist', top排名
    2:'latest', 最新
    3:'random' 随机
    4:'search' 关键字查找
    """
    get_wall_one_page(1,1)  # 爬取单页
    # get_total(2, 1, 11)  # 爬取多个指定页码

```

上面代码还有优化的空间，还可以加入关键词查询爬取，还有标签爬取，条件爬取等等，欢迎评论不同意见

想要壁纸的也可以私信我发你！



![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1cbeef7d5f534edfaa27f6d7da9df22e~tplv-k3u1fbpfcp-zoom-1.image)



![0-wallhaven-d6w2dj.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a296d571f77a40d0af9c0ed5a708e6ec~tplv-k3u1fbpfcp-zoom-1.image)

![6-wallhaven-7prmdv.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1405797418dc481892bfee79a2c1ac11~tplv-k3u1fbpfcp-zoom-1.image)

喜欢我的小伙伴可以点一波关注。点个赞, 欢迎评论区留言讨论,看到会回复.