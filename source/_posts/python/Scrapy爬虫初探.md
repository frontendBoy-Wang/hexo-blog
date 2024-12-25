---
title: Scrapy爬虫初探
categories:
    - 技术
    - 爬虫
    - Scrapy
cover: ../img/2.jpeg
feature: false
date: 2023-12-04 22:46:35
tags: python 爬虫
---

### 认识Scrapy
Scrapy 是一个开源的、高级的、快速的 Python 网络爬虫框架，用于从网站上提取数据。它提供了一种简单而强大的方式来定义爬取规则和处理爬取的数据。
其最初是为了页面抓取 (更确切来说, 网络抓取 )所设计的， 也可以应用在获取API所返回的数据(例如 Amazon Associates Web Services ) 或者通用的网络爬虫。

 

下面的架构图明确说明了 Scrapy 主要有 5 个部分。

* 引擎(Scrapy Engine)：引擎负责控制数据流在系统中所有组件中流动，并在相应动作发生时触发事件。

* 管道(Pipline)：主要提供存储服务，把需要存储的数据存储到相关数据库之中。

* 调度器(Scheduler)：主要提供两个功能，分别是去重和队列。

* 下载器(Downloader)：下载器负责获取页面数据并提供给引擎，而后提供给spider。

* 爬虫(Spiders)：Spider是Scrapy用户编写用于分析response并提取item(即获取到的item)或额外跟进的URL的类。每个spider负责处理一个特定(或一些)网站。

其实除了上述的内容外，Scrapy 还提供一些中间件，例如：下载器中间件(Downloader Middlewares)和爬虫中间件(Spider Middlewares)。

所以，把上面完整的图可以画成如下：

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86415d4bfca942cfafeac516c00a7ac3~tplv-k3u1fbpfcp-image.image#?w=1115&h=401&s=12639&e=svg&b=f2f0fe)

以下是 Scrapy 的一些主要特点和优势：

1. 快速高效：Scrapy 使用异步网络库并支持并发请求处理，使得爬取速度非常快。
2. 可扩展性：Scrapy 的架构设计非常灵活和可扩展，你可以根据需要编写自定义的中间件、管道和扩展。
3. 方便的选择器：Scrapy 内置了强大的选择器（XPath 和 CSS）来提取所需的数据，使得数据提取变得非常简便。
4. 自动的请求管理：Scrapy 能够自动管理请求的发送和处理，包括请求的调度、跟踪和优先级处理，以及失败重试等。
5. 数据流处理：Scrapy 提供了一个灵活的管道系统，可以对爬取到的数据进行处理和存储，例如存储在数据库中或输出为不同格式的文件。
6. 内置的调试工具：Scrapy 提供了有用的调试工具，如 Shell 和 Spider View，帮助开发者调试和测试爬虫程序。
7. 支持分布式爬取：Scrapy 可以与分布式消息队列（如 Redis）集成，实现分布式爬取，提高爬取效率和可扩展性。

使用 Scrapy 可以轻松地创建一个完整的爬虫程序。你可以定义一个或多个爬虫文件，每个文件负责从特定的网站爬取数据，并定义数据提取规则。然后，通过运行 Scrapy 命令来启动爬虫并开始爬取。Scrapy 会自动处理请求、跟踪链接、提取数据并将其传递给管道进行处理。

总之，Scrapy 是一个功能强大且灵活的网络爬虫框架，适用于各种规模的爬取任务。它提供了许多有用的功能和工具，帮助开发者以高效的方式从网站上抓取数据。无论是简单的数据采集还是复杂的网站抓取，Scrapy 都是一个值得考虑的选择。




### 创建虚拟环境

1. 打开命令行或终端。
2. 使用以下命令在当前目录创建一个名为 "myenv" 的虚拟环境（你也可以将 "myenv" 替换为你喜欢的名称）：
   ```bash
   python -m venv myenv
   ```

3. 激活虚拟环境：
   - 在 Windows 上，执行以下命令：
     ```bash
     myenv\Scripts\activate
     ```
   - 在 macOS 和 Linux 上，执行以下命令：
     ```bash
     source myenv/bin/activate
     ```

### 安装 Scrapy

4. 激活虚拟环境后，你会发现命令行提示符发生了变化，表明虚拟环境已经激活。
5. 在激活的虚拟环境中，使用以下命令安装 Scrapy：
   ```bash
   pip install scrapy
   ```

这样就完成了在 Python 中创建虚拟环境并安装 Scrapy 的过程。现在你可以在虚拟环境中使用 Scrapy 来进行网络爬虫的开发和相关工作了。

要创建一个 Scrapy 项目，请按照以下步骤进行操作：

1. 打开命令行或终端。
2. 进入你想要创建项目的目录。例如，如果你想在桌面上创建项目，可以执行以下命令（根据你自己的文件路径进行修改）：
   ```bash
   cd Desktop
   ```

3. 在目标目录中，使用以下命令创建 Scrapy 项目。将 "project_name" 替换为你想要的项目名称：
   ```bash
   scrapy startproject project_name
   ```

4. 创建项目后，进入项目目录：
   ```bash
   cd project_name
   ```
   该命令将会创建包含下列内容的 `project_name` 目录:

```
project_name/
    scrapy.cfg
    tutorial/
        __init__.py
        items.py
        pipelines.py
        settings.py
        spiders/
            __init__.py
            ...
```

这些文件分别是:

-   `scrapy.cfg`: 项目的配置文件
-   `project_name/`: 该项目的python模块。之后您将在此加入代码。
-   `project_name/items.py`: 项目中的item文件.
-   `project_name/pipelines.py`: 项目中的pipelines文件.
-   `project_name/settings.py`: 项目的设置文件.
-   `project_name/spiders/`: 放置spider代码的目录.

5. 现在，你可以开始编写和配置你的 Scrapy 爬虫了。Scrapy 项目的主要部分是爬虫，可以在项目的 `spiders` 目录中创建爬虫文件。例如，可以执行以下命令创建一个名为 "example_spider" 的爬虫：
   ```bash
   scrapy genspider example_spider example.com
   ```

   这将在 `spiders` 目录中创建一个名为 "example_spider.py" 的文件，并使用 "example.com" 作为起始网址。
   





### 定义item类
```py
import scrapy


class TutorialItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title = scrapy.Field()
    link = scrapy.Field()
    desc = scrapy.Field()


```
这段代码是一个使用 Scrapy 框架编写的爬虫项目中的 Item 类定义。

- 首先，导入了 `scrapy` 模块，这是 Scrapy 框架的核心模块。

- 接下来，定义了一个名为 `TutorialItem` 的类，该类继承自 Scrapy 框架提供的 `Item` 类。

- 在 `TutorialItem` 类中，定义了三个字段（Field）：
  - `title`：用于存储抓取到的网页标题信息。
  - `link`：用于存储抓取到的网页链接地址。
  - `desc`：用于存储抓取到的网页描述信息。

这段代码的作用是定义了一个 Item 类，用于存储爬取到的数据。在 Scrapy 中，Item 类似于数据模型，用于定义要抓取的数据结构。当爬虫解析网页并提取出需要的数据时，可以实例化该 Item 类并将数据存储到对应的字段中，以便后续处理和持久化。

在实际编写爬虫时，你通常需要根据具体的需求自定义 Item 类，并根据需要添加更多的字段来存储抓取到的

### 创建爬虫
```py
import scrapy


class ExampleSpiderSpider(scrapy.Spider):
    name = "example_spider"
    allowed_domains = ["example.com"]
    start_urls = ["https://example.com"]

    def parse(self, response):
        print(response,'wmq')
```


这段代码是一个使用 Scrapy 框架编写的简单的爬虫（Spider）。

-   首先，导入了 `scrapy` 模块，这是 Scrapy 框架的核心模块。

-   接下来，定义了一个名为 `ExampleSpiderSpider` 的 Spider 类，该类继承自 Scrapy 框架提供的 `Spider` 类。

-   在 `ExampleSpiderSpider` 类中，定义了以下几个属性：

    -   `name`：指定爬虫的名称为 "example_spider"。
    -   `allowed_domains`：指定允许爬取的域名为 "[example.com](http://example.com/)"。这意味着爬虫只会爬取该域名下的网页。
    -   `start_urls`：指定起始的 URL 列表为 ["[https://example.com](https://example.com/)"]。这是爬虫开始爬取的起点。

-   最后，定义了一个名为 `parse` 的方法，这是 Scrapy 框架中用于解析网页响应的默认方法。在这个方法中，通过打印输出了响应对象 `response` 和字符串 "wmq"。

这段代码的作用是创建一个爬虫，从 "[https://example.com](https://example.com/)" 这个网页开始抓取数据，并在解析网页响应时打印输出相应的信息。

```py
import scrapy

class QuotesSpider(scrapy.Spider):
    name = "wall"  # 定义爬虫的名称

    def start_requests(self):
        # 定义起始的 URL 列表
        urls = [
            'https://quotes.toscrape.com/page/1/',
            'https://quotes.toscrape.com/page/2/',
            'https://wallhaven.cc/',
        ]
        for url in urls:
            # 对于每个 URL，创建一个 Scrapy 请求，并指定回调函数为 self.parse
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        # 解析页面内容的回调函数
        page = response.url.split("/")[-2]  # 从 URL 中提取页面编号
        filename = f'quotes-{page}.html'  # 根据页面编号构造文件名
        with open(filename, 'wb') as f:  # 以二进制写入模式打开文件
            f.write(response.body)  # 将页面内容写入文件
        self.log(f'Saved file {filename}')  # 记录日志，表示文件保存成功

```

运行爬虫：
```bash
scrapy  crawl wall
```
`wall` 为爬虫中定义的name `name = "wall"  # 定义爬虫的名称`


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a07a43bf8cd640cea68e24637f8eaa4b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3008&h=1960&s=678167&e=png&a=1&b=2e313d)


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8702a0e718b84500a830c8231469e3e7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3008&h=1960&s=688405&e=png&a=1&b=2e313d)

以上就是运行爬虫之后输出的内容了
我这里保存为两个html文件了


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8516ca93c827402ab4a1c8856c2be294~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3094&h=1896&s=807786&e=png&a=1&b=fefefe)

拿到了html网页下面就可以根据自己的需要去解析和清洗数据或者保存到数据库了。
本篇就到此为止，下一篇介绍如何使用xpath和bs4来获取自己想要的数据