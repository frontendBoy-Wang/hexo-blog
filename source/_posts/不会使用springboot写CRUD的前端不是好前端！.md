---
title: 不会使用springboot写CRUD的前端不是好前端！
categories:
    - springBoot
cover: ../img/53.png
feature: false
date: 2023-5-10 22:46:35
tags: java
---

# 前言
> 在开发Web应用程序时，CRUD（Create、Read、Update、Delete）是最基本的操作。为了简化开发过程并提高效率，我们可以使用一些成熟的框架和工具来实现CRUD操作。Spring Boot作为一个快速开发框架，而MyBatis-Plus则是一个高效的持久层框架，两者的结合可以帮助我们快速实现数据库操作。本文将详细介绍如何在Spring Boot项目中整合MyBatis-Plus，以便快速实现CRUD操作。
>

Spring boot项目整合MyBatis-Plus快速CRUD

 1. 概述
 2. 环境准备
 3. 创建Spring Boot项目
 4. 引入MyBatis-Plus依赖
 5. 配置数据库连接
 6. 创建包目录和添加注解
 7. 创建实体类和Mapper接口
 8. 实现CRUD操作   
 9. 最后再创建路由控制器controller
 10. 总结


# 1. 概述 
MyBatis-Plus是一个基于MyBatis的增强工具，提供了许多便捷的功能和方法，使得CRUD操作更加简单和高效。它能够自动生成基本的SQL语句，减少了手动编写SQL的工作量。结合Spring Boot，我们可以更方便地进行开发和管理。  
# 2. 环境准备 
在开始之前，确保你已经安装了以下环境：

-   JDK 1.8或以上版本
-   Maven（用于构建项目）
-   MySQL数据库

# 3. 创建Spring Boot项目
 使用Spring Initializr创建一个新的Spring Boot项目。选择所需的项目元数据和依赖项，例如Web和MySQL驱动程序。点击生成项目，下载并导入到你的IDE中。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fc1180d9aca4d1fa4d9719ced1dc111~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1676&h=1338&s=205782&e=png&a=1&b=40434f)
记得修改成自己需要的包路径，点击下一步


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1640bba544284572a25d5cd751897285~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1676&h=1338&s=192221&e=png&a=1&b=414450)

**选择和自己jdk匹配的spring boot版本** 不然项目会报错
选择常用的一些插件，然后点击完成，等待maven下载依赖即可


# 4.  引入MyBatis-Plus依赖 
在项目的pom.xml文件中添加MyBatis-Plus的依赖项：

```xml
xmlCopy Code
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>最新版本</version>
</dependency>
```
**我用的mybatis plus版本是3.5.3.1。记住jdk的版本和mybatis plus的版本要匹配不然也会出现问题。本人就踩过坑 ，这个版本要求自己查看官网文档即可**    


这里给出我的pom.xml文件
 ```xml
 
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.0.12</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com</groupId>
    <artifactId>backendVol</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>backend</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jdbc</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- https://mvnrepository.com/artifact/com.baomidou/mybatis-plus-boot-starter -->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.5.3.1</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>


    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
 ```

# 5. 配置数据库连接 
在`application.properties`或`application.yml`文件中配置数据库连接信息，包括数据库URL、用户名和密码等。
```yml
#端口号9090
server:
  port: 9999

#数据库名：mysql，用户名root，密码123456
spring:
  datasource:
    username: root
    password: 1111111
    url: jdbc:mysql://localhost:3306/数据库名称?useUnicode=true&amp
    driver-class-name: com.mysql.cj.jdbc.Driver



# mybatis-plus配置
mybatis-plus:
  # xml文件位置
  mapper-locations: classpath:mybatis/**/*Mapper.xml
  # 开启驼峰命名
  configuration:
    map-underscore-to-camel-case: true
    # 开启sql显示
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl

```

# 6. 创建包目录和添加注解

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b93d55dfd24d41f6a852b8b1720f1ada~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3008&h=1960&s=565933&e=png&a=1&b=333542)
我们在启动类里面添加`@SpringBootApplication`,`@MapperScan("com.backendvol.mapper")`
这两个注解



# 7.  创建实体类和Mapper接口 
创建一个Java类表示数据库表的实体，使用`@Table`注解指定表名和主键字段。然后创建一个继承自`BaseMapper`的Mapper接口，用于定义CRUD操作的方法。
在entity包里面创建User实体类

```java
package com.backendvol.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName(value = "user")
@Data
public class UserEntity {
    @TableId(value = "userId",type = IdType.AUTO)
    private Integer userId;

    @TableField("userName")
    private String userName;

    @TableField("userRole")
    private Integer userRole;

    @TableField("userPwd")
    private String userPwd;

    @TableField("userPic")
    private String userPic;

    @TableField("userTel")
    private String userTel;

    @TableField("userHobby")
    private String userHobby;

    @TableField("userVolDesc")
    private String userVolDesc;

    @TableField("userAge")
    private int userAge;
}
```

这里使用的是mybatis plus的注解`@TableName(value = "user")` 和`@TableField`,以及插件
lombok的@Data注解

在mapper包创建Mapper接口
```java
package com.backendvol.mapper;

import com.backendvol.entity.UserEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper extends BaseMapper<UserEntity> {
        // 自定义查询方法，例如根据用户名和密码查询用户信息
        @Select("select * from user where userName = #{username} and userPwd = #{password}")
        UserEntity selectByUsernameAndPwd(@Param("username") String username ,@Param("password") String password);

        // 自定义查询方法，例如根据用户名用户信息
        @Select("select * from user where userName = #{username}  ")
        UserEntity selectByUsername (@Param("username") String username  );

}
```

# 8.  实现CRUD操作
在service里面创建impl包 在Service层中调用Mapper接口的方法，即可实现对数据库表的CRUD操作。
创建service的的接口

```java
package com.backendvol.service;


import com.backendvol.entity.UserEntity;
import com.backendvol.utils.Result;
import com.baomidou.mybatisplus.extension.service.IService;

public interface UserService extends IService<UserEntity> {
     
}
```
创建service的的接口实现类
例如，在UserService中编写如下代码：

```java
 
package com.backendvol.service.impl;

import com.backendvol.entity.UserEntity;
import com.backendvol.mapper.UserMapper;
import com.backendvol.service.UserService;
import com.backendvol.utils.Result;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, UserEntity> implements UserService {


    private final UserMapper userMapper;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public Result login(String username, String password) {
        UserEntity user = userMapper.selectByUsernameAndPwd(username, password);

        System.out.println(user + "登陆用户");

        if (user != null && user.getUserPwd().equals(password)) {
            return Result.success("登陆成功",user);
        }

        return Result.fail("用户名或密码错误");
    }

    @Override
    public Result register(UserEntity UserEntity) {
        UserEntity user = userMapper.selectByUsername(UserEntity.getUserName());

        if (user != null) {
            return Result.fail("用户名已存在，请输入其他用户名");
        }
        userMapper.insert(UserEntity);
        UserEntity user2 = userMapper.selectByUsername(UserEntity.getUserName());
        return Result.success("注册成功",user2);

    }
}
```
对返回值做统一的封装
```java
package com.backendvol.utils;

import lombok.Data;
import org.springframework.data.relational.core.sql.In;

import java.io.Serializable;

/**
 * 封装统一的返回结果
 */
@Data
public class Result implements Serializable {
    private Integer code;
    private String msg;
    private Object data;
    public static Result success(Object data) {
        Result m = new Result();
        m.setCode(200);
        m.setData(data);
        m.setMsg("操作成功");
        return m;
    }
    public static Result success(String mess, Object data) {
        Result m = new Result();
        m.setCode(200);
        m.setData(data);
        m.setMsg(mess);
        return m;
    }
    public static Result fail(String mess) {
        Result m = new Result();
        m.setCode(500);
        m.setData(null);
        m.setMsg(mess);
        return m;
    }
    public static Result fail(String mess, Object data) {
        Result m = new Result();
        m.setCode(500);
        m.setData(data);
        m.setMsg(mess);
        return m;
    }
}
```
# 9.最后再创建路由控制器controller
```java
package com.backendvol.controller;

import com.backendvol.entity.UserEntity;
import com.backendvol.service.UserService;
import com.backendvol.utils.Result;
import org.springframework.web.bind.annotation.*;

import java.sql.Wrapper;


@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService UserService;

    public UserController(UserService userService) {
        UserService = userService;
    }

    //增加用户
    @PostMapping("/add")
    public Boolean add(@RequestBody UserEntity UserEntity) {
        return UserService.save(UserEntity);
    }

    //删除
    @GetMapping("delete/{id}")
    public Boolean delete(@PathVariable Integer id) {
        return UserService.removeById(id);
    }

    //修改
    @PostMapping("/update")
    public Boolean update(@RequestBody UserEntity UserEntity) {
        return UserService.updateById(UserEntity);
    }

    //查询
    @GetMapping("/get/{id}")
    public UserEntity get(@PathVariable Integer id) {
        return UserService.getById(id);
    }

    //查询全部
    @GetMapping("/list")
    public Result list() {
        return Result.success("测试", UserService.list());
    }

    //登陆接口
    @PostMapping("/login")
    public Result login(@RequestBody UserEntity userEntity) {
        return UserService.login(userEntity.getUserName(), userEntity.getUserPwd());
    }

    //注册接口
    @PostMapping("/register")
    public Result register(@RequestBody UserEntity userEntity) {
        return UserService.register(userEntity);
    }
}
```

基本上都不用写sql语句了(复杂的除外)。

运行测试一下接口。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c85c905f6d044e1f875c04073db38f09~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3008&h=1960&s=479511&e=png&a=1&b=30333f)


# 10.  总结 
通过整合Spring Boot和MyBatis-Plus，我们可以快速实现数据库的CRUD操作。MyBatis-Plus提供了许多便捷的功能和方法，使得开发更加高效。在本文中，我们介绍了整合的步骤，包括依赖的引入、数据库连接的配置、实体类和Mapper接口的创建以及Mapper XML文件的编写。希望本文对你在Spring Boot项目中整合MyBatis-Plus并快速实现CRUD操作有所帮助。