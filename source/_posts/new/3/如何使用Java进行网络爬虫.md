---
title: 如何使用Java进行网络爬虫
categories:
    - java
cover: ../img/38.png
feature: false
date: 2021-7-18 10:46:35
tags: java 爬虫
---

# 如何使用Java进行网络爬虫

>大家好我是迁客，一个初学Java的小白！痴迷技术，对programming有着极大的兴趣和爱好。从今天起，开始写自己个人成长的第一篇博客！既是对自己的一个学习技术的一个记录，也是督促自己，坚持下去！加油Fighting！
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

@[toc]
好了废话不多说，我们先来看看用Java爬虫需要先准备什么？

 1. JKD13
 2. idea开发工具
 3. maven
 4. httpclient

以上就是我主要用到的东西了！
		
## 1.环境准备


- 创建Maven工程并给pom.xml加入依赖
```java
<dependencies>
        <!-- https://mvnrepository.com/artifact/org.apache.httpcomponents/httpclient -->
        <dependency>
            <groupId>org.apache.httpcomponents</groupId>
            <artifactId>httpclient</artifactId>
            <version>4.5.2</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-log4j12 -->
        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-log4j12 -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.7.25</version>
            <!--<scope>test</scope>-->
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.jsoup/jsoup -->
        <dependency>
            <groupId>org.jsoup</groupId>
            <artifactId>jsoup</artifactId>
            <version>1.10.2</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/junit/junit -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
        <!-- https://mvnrepository.com/artifact/commons-io/commons-io -->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.6</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.apache.commons/commons-lang3 -->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-lang3</artifactId>
            <version>3.7</version>
        </dependency>
    </dependencies>
```
## 2.加入log4j.properties

```java
log4j.rootLogger=DEBUG,A1
log4j.logger.spider = DEBUG

log4j.appender.A1=org.apache.log4j.ConsoleAppender
log4j.appender.A1.layout=org.apache.log4j.PatternLayout
log4j.appender.A1.layout.ConversionPattern=%-d{yyyy-MM-dd HH:mm:ss,SSS} [%t] [%c]-[%p] %m%n
```
## 3.编写最简单的爬虫，抓取CSDN首页：https://blog.csdn.net/

```java
/***
     * @Title: getHttp()
     * @Author: 汪满青
     * @Description: get请求,抓取CSDN首页
     * @Date: 2020/10/25-21:55
     * @Param: []
     * @return: void
     **/
    public static void getHttp() throws IOException {
        //创建HttpClient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();
        //创建HttpGet请求
        HttpGet httpGet = new HttpGet("http://www.itcast.cn/");
        CloseableHttpResponse response = null;
        try {
            //使用HttpClient发起请求
            response = httpClient.execute(httpGet);
            //判断响应状态码是否为200
            if (response.getStatusLine().getStatusCode() == 200) {
                //如果为200表示请求成功，获取返回数据
                String content = EntityUtils.toString(response.getEntity(), "UTF-8");
                //打印数据长度
                System.out.println(content);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //释放连接
            if (response == null) {
                try {
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                httpClient.close();
            }
        }
    }
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16301672de5249619109d3b7ee9cc732~tplv-k3u1fbpfcp-zoom-1.image)
## 4.连接池
- 如果每次请求都要创建HttpClient，会有频繁创建和销毁的问题，可以使用连接池来解决这个问题。
测试以下代码，并断点查看每次获取的HttpClient都是不一样的。

```java
package com.test;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;
import java.io.IOException;
/**
 * @ClassName:httpPool
 * @Description:httpPool连接池
 * @Author: 汪满青
 * @Date: 2020-10-25 22:28
 */
public class httpPool {
    public static void main(String[] args) throws IOException {
        PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
        //    设置最大连接数
        cm.setMaxTotal(200);
        //    设置每个主机的并发数
        cm.setDefaultMaxPerRoute(20);
        doGet(cm);
    }
    private static void doGet(PoolingHttpClientConnectionManager cm) throws IOException {
        CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(cm).build();
        HttpGet httpGet = new HttpGet("https://blog.csdn.net/");
        CloseableHttpResponse response = null;
        try {
            response = httpClient.execute(httpGet);
            // 判断状态码是否是200
            if (response.getStatusLine().getStatusCode() == 200) {
                // 解析数据
                String content = EntityUtils.toString(response.getEntity(), "UTF-8");
                System.out.println(content.length());
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //释放连接
            if (response == null) {
                try {
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                //不能关闭HttpClient
                //httpClient.close();
            }
        }
    }
}

```
## 5.jsoup介绍
jsoup 是一款Java 的HTML解析器，可直接解析某个URL地址、HTML文本内容。它提供了一套非常省力的API，可通过DOM，CSS以及类似于jQuery的操作方法来取出和操作数据。

jsoup的主要功能如下：
1.从一个URL，文件或字符串中解析HTML；
2.使用DOM或CSS选择器来查找、取出数据；
3.可操作HTML元素、属性、文本；

```java
<!--Jsoup-->
<dependency>
    <groupId>org.jsoup</groupId>
    <artifactId>jsoup</artifactId>
    <version>1.10.3</version>
</dependency>
<!--测试-->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>
<!--工具-->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.7</version>
</dependency>
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.6</version>
</dependency>
```
### 5.1.soup解析
```java
Jsoup可以直接输入url，它会发起请求并获取数据，封装为Document对象
@Test
public void testJsoupUrl() throws Exception {
    //    解析url地址
    Document document = Jsoup.parse(new URL("http://www.itcast.cn/"), 1000);

    //获取title的内容
    Element title = document.getElementsByTag("title").first();
    System.out.println(title.text());
}
```
PS：虽然使用Jsoup可以替代HttpClient直接发起请求解析数据，但是往往不会这样用，因为实际的开发过程中，需要使用到多线程，连接池，代理等等方式，而jsoup对这些的支持并不是很好，所以我们一般把jsoup仅仅作为Html解析工具使用
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71e89dcbde034011b125f8bb62800ba0~tplv-k3u1fbpfcp-zoom-1.image)

>==写到最后了，希望大家对大家有所帮助，谢谢
>感悟：开始写博客，希望自己可以坚持下去， 至少每周一篇，积少成多，并且保证质量，希望大家多多支持，同时也是自己的一个积累的过程==