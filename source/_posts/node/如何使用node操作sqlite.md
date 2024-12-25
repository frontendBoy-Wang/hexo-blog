---
title: 如何使用node操作sqlite
categories:
    - node
cover: ../img/39.png
feature: false
date: 2022-7-19 10:46:35
tags: node slq
---

# 什么是sqlit

SQLite是一种轻量级的嵌入式关系型数据库管理系统，它以库的形式存在，可以嵌入到应用程序中。它使用简单的、基于文件的数据库格式，不需要独立的服务器进程，非常适合在资源有限的环境中使用。

# SQLite的优点

1. 简单易用：SQLite的API简单明了，学习曲线低，使用方便。
2. 零配置：无需复杂的配置和管理，只需一个数据库文件即可开始使用。
3. 占用资源少：SQLite数据库文件通常很小，内存占用也较少，适用于嵌入式设备或低性能环境。
4. 支持事务：具备ACID特性，支持事务操作，保证数据的完整性和并发控制。
5. 跨平台：SQLite可以在多个操作系统上运行，包括Windows、macOS、Linux等。

# SQLite的缺点包括

1. 并发性限制：由于它是单用户模式，不支持多个写操作同时进行，因此在高并发读写场景下性能可能受限。
2. 存储容量有限：由于文件格式的限制，SQLite数据库文件的大小通常有上限。
3. 功能相对较少：相比于传统的大型数据库管理系统，SQLite提供的功能较为有限，不适合处理大规模复杂数据。

# SQLite适用于以下应用场景

1. 移动应用：由于SQLite的轻量级特性，它常被用于移动应用开发中，用来存储和管理少量结构化数据。
2. 嵌入式系统：SQLite的小巧和低资源占用使它成为嵌入式设备上的理想选择，如物联网设备、嵌入式系统等。
3. 测试和原型开发：在快速开发和测试阶段，SQLite可以作为临时的数据库解决方案，提供方便的开发和测试环境。
4. 小型网站：对于小型网站或个人项目，SQLite提供了一个简单可靠的数据库解决方案，不需要复杂的数据库服务器。

总之，SQLite在轻量级应用和资源受限环境下具有优势，适合那些对性能要求不高、数据量较小或者需要方便集成的场景。

# 如何操作sqlite

使用Node.js操作SQLite数据库有多种方式，其中常用的方式包括使用sqlite3模块、sequelize模块和knex模块。每种方式都有其特点和适用场景。

## 1. sqlite3：
   - 纯粹的SQLite数据库驱动模块，提供了底层的数据库访问接口。
   - 可以直接使用SQL语句进行数据库操作。
   - 适合对数据库操作有更细粒度控制需求的开发者。

## 2. sequelize：
   - 是一个功能强大的ORM(Object-Relational Mapping)库，支持多种数据库包括SQLite。
   - 提供了面向对象的方式定义模型，便于操作数据库。
   - 自动构建SQL查询语句，简化数据库操作。
   - 支持事务管理、关联查询等高级功能。
   - 适合需要使用ORM进行数据库操作或有复杂业务需求的开发者。

## 3. knex：
   - 是一个SQL查询构建器，支持多种数据库包括SQLite。
   - 使用链式调用方法构建SQL查询语句。
   - 支持灵活的查询条件、聚合查询、分页等功能。
   - 可以直接执行SQL语句。
   - 适合对数据库操作有更高灵活性要求的开发者。

哪种方式最好用取决于实际需求。如果需要更底层的数据库访问接口或对数据库操作有更细粒度的控制，可以选择sqlite3模块。如果需要使用ORM进行数据库操作或有复杂业务需求，可以选择sequelize模块。如果需要更灵活地构建SQL查询语句或有特定的查询需求，可以选择knex模块。

一般是根据项目需求选择适合的方式使用Node.js操作SQLite数据库。

# knex详细介绍
官网介绍：
> KneX可以在Node.js和浏览器中用作SQL查询构建器，但受WebSQL的限制(如不能删除表或读取模式)。
> 强烈反对在浏览器中编写在服务器上执行的SQL查询，因为这可能会导致严重的安全漏洞。
> 在WebSQL之外构建的浏览器主要用于学习目的-例如，您可以打开控制台并使用kneX对象在此页面上构建查询。

>KneX的主要目标环境是Node.js，您将需要安装KneX库，然后安装相应的数据库库：PG for PostgreSQL、CockroachDB和Amazon RedShift、PG-Native for PostgreSQL和Native C++libpq绑定(需要安装PostgresSQL才能链接到它)、MySQL for MySQL或MariaDB、SQLite3 for SQLite3或Destous for MSSQL。

# 使用knex对sqlite的增删改查
使用knex之前先得安装knex和数据库驱动，我这里用的是sqlite数据库，所以需要安装sqlite3

```shell
$ npm install knex --save

# Then add one of the following (adding a --save) flag:
$ npm install pg
$ npm install pg-native
$ npm install sqlite3
$ npm install better-sqlite3
$ npm install mysql
$ npm install mysql2
$ npm install oracledb
$ npm install tedious
```

根据自己的需要选择合适的数据库驱动即可

## 初始化knex实例
```js

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite'
  }
});
```
在实例化knex时，可以传入一些配置参数来进行数据库连接和其他相关配置。常用的配置参数如下：

> 1. client：指定数据库类型，比如sqlite3、mysql、postgresql等。
> 2. connection：指定数据库连接信息，可以是一个URL字符串或一个包含连接信息的对象，如host、port、user、password、database等。
> 3. pool：连接池的配置，控制数据库连接的复用和管理，常用的配置项有min、max、idleTimeoutMillis等。
> 4. migrations：迁移文件相关的配置，用于数据库迁移管理，包括directory（迁移文件目录）、tableName（存储迁移记录的表名）等。
> 5. seeds：种子数据相关的配置，用于初始化数据库，包括directory（种子数据文件目录）等。
> 6. debug：是否开启调试模式，输出SQL查询语句和参数。
>
> 以下是一个示例代码，演示了实例化knex时的配置参数：

```javascript
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data/db.sqlite3'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './seeds'
  },
  debug: true
});

module.exports = knex;
```

上述示例代码中，使用SQLite3作为数据库类型，指定了数据库文件路径。同时配置了连接池的最小连接数和最大连接数。定义了迁移文件和种子数据文件的目录，以及迁移记录表的表名。开启了调试模式，输出SQL查询语句和参数。

根据实际需求，可以根据以上配置参数进行灵活的配置。具体的配置项及其含义可以参考knex的官方文档。


## 创建数据库表

在使用knex创建表之前，可以通过`knex.schema.hasTable()`方法检查表是否已经存在。以下是一个使用knex创建表前判断表是否存在的示例代码：

```javascript
knex.schema.hasTable('users').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('email');
    });
  }
}).then(() => {
  console.log('Table created successfully');
}).catch((err) => {
  console.error(err);
});
```

在上述代码中，首先使用`knex.schema.hasTable()`方法检查名为"users"的表是否存在。如果不存在，则执行创建表的操作；如果存在，则直接跳过创建表的步骤。这样可以确保在创建表之前先判断表是否已存在。

通过这种方式，可以避免重复创建表或导致错误。需要注意的是，在实际开发中，根据业务需求可能需要对表结构进行更精确的判断，比如检查是否存在特定的列等，可以根据具体情况进行扩展。



## 增删改查

当使用knex操作SQLite数据库时，可以按照以下方式进行增删改查操作：

1. 插入数据：

```javascript
knex('users').insert({
  name: 'John Doe',
  email: 'john.doe@example.com'
}).then(() => {
  console.log('Data inserted successfully');
}).catch((err) => {
  console.error(err);
});
```

2. 查询数据：

```javascript
knex.select().from('users').then((rows) => {
  rows.forEach((row) => {
    console.log(row.name, row.email);
  });
}).catch((err) => {
  console.error(err);
});
```

3. 更新数据：

```javascript
knex('users')
  .where('id', 1)
  .update({ name: '前端少年汪' })
  .then(() => {
    console.log('Data updated successfully');
  }).catch((err) => {
    console.error(err);
  });
```

6. 删除数据：

```javascript
knex('users')
  .where('id', 1)
  .del()
  .then(() => {
    console.log('Data deleted successfully');
  }).catch((err) => {
    console.error(err);
  });
```

以上代码演示了使用knex操作SQLite数据库的基本增删改查操作。根据实际需求，可以使用knex提供的更多方法和功能来完成更复杂的数据库操作。