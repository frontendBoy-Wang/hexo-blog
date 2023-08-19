---
title: golang的orm框架入门
categories:
  - 技术
cover: ../img/3.png
feature: false
date: 2023-02-13 09:12:28
tags: go gorm xorm
---

# gorm的CRUD操作

# 安装

```shell
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
```

第一个是gorm的库，第二个是mysql的连接驱动

# 连接数据库

GORM 官方支持的数据库类型有： MySQL, PostgreSQL, SQlite, SQL Server

# 创建DB实例

```go
//构建连接字符串
/*注意：想要正确的处理 time.Time ，您需要带上 parseTime 参数， (更多参数)要支持完整的 UTF-8 编码，您需要将 charset=utf8 更改为 charset=utf8mb4 查看 此文章 获取详情*/
dsn := "root:password1234@tcp(127.0.0.1:3306)/gorm?charset=utf8mb4&parseTime=True&loc=Local"
db, _ = gorm.Open(mysql.Open(dsn), &gorm.Config{})
```

# 结构体映射数据库表

创建结构体

```go
package main

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name string
	Age  uint8
}
```

使用`db.AutoMigrate(User{})`方法从结构体生成数据库表

# 连接设置

```go
sqlDB, _ := db.DB()

// SetMaxIdleConns 设置空闲连接池中连接的最大数量
sqlDB.SetMaxIdleConns(10)

// SetMaxOpenConns 设置打开数据库连接的最大数量。
sqlDB.SetMaxOpenConns(100)

// SetConnMaxLifetime 设置了连接可复用的最大时间。
sqlDB.SetConnMaxLifetime(time.Hour)
```

# 插入数据

```go

//添加数据
func add() {
    //插入单条数据
    user := User{Model: gorm.Model{}, Name: "wmq", Age: 17}
    result := db.Create(&user)
    fmt.Println(user.ID, result.RowsAffected)
    
    //插入指定字段
    result = db.Select("Name", "Age").Create(&User{Name: "前端少年", Age: 22})
    fmt.Println(user, result.RowsAffected)
    
    //切片批量插入
    var users = []User{{Name: "w1"}, {Name: "w2"}, {Name: "w3"}}
    result = db.Create(&users)
    fmt.Println("users", result.RowsAffected, users)
    
    //map批量插入
    db.Model(&User{}).Create(map[string]interface{}{
         "Name": "jinzhu", "Age": 18,
    })
    
    // 根据 `[]map[string]interface{}{}` 批量插入
    db.Model(&User{}).Create([]map[string]interface{}{
        {"Name": "", "Age": nil},
        {"Name": "", "Age": nil},
        {},
    })
}
```

## 创建时的Hook操作

// 开始事务  
BeforeSave  
BeforeCreate  
// 关联前的 save  
// 插入记录至 db // 关联后的 save  
AfterCreate AfterSave  
// 提交或回滚事务

# 更新数据

-   使用Save方法 会保存所有的字段，即使字段是零值

```go

//修改
func update() {
	//更新单列
	var user User
	user.Name = "迁客骚人"
	user.Age = 100
	db.Save(&user)
	fmt.Println(user.Name)

	// 条件更新
	db.Model(&User{}).Where("active = ?", true).Update("name", "hello")
	// UPDATE users SET name='hello', updated_at='2013-11-17 21:34:10' WHERE active=true;

	// User 的 ID 是 `111`
	db.Model(&user).Update("name", "hello")
	// UPDATE users SET name='hello', updated_at='2013-11-17 21:34:10' WHERE id=111;

	// 根据条件和 model 的值进行更新
	db.Model(&user).Where("active = ?", true).Update("name", "hello")
	// UPDATE users SET name='hello', updated_at='2013-11-17 21:34:10' WHERE id=111 AND active=true;

	// 根据 `struct` 更新属性，只会更新非零值的字段
	db.Model(&user).Updates(User{Name: "hello", Age: 18})
	// UPDATE users SET name='hello', age=18, updated_at = '2013-11-17 21:34:10' WHERE id = 111;

	// 根据 `map` 更新属性
	db.Model(&user).Updates(map[string]interface{}{"Name": "hello", "Age": 18})
	// UPDATE users SET name='hello', age=18, actived=false, updated_at='2013-11-17 21:34:10' WHERE id=111;

	//批量更新
	// 根据 struct 更新
	db.Model(User{}).Where("role = ?", "admin").Updates(User{Name: "wmq", Age: 18})
	// UPDATE users SET name='hello', age=18 WHERE role = 'admin;

	// 根据 map 更新
	db.Table("users").Where("id IN ?", []int{10, 11}).Updates(map[string]interface{}{"name": "hello", "age": 18})
	// UPDATE users SET name='hello', age=18 WHERE id IN (10, 11);
}
```

---
# xorm的CRUD操作

# xorm的特性

- 支持Struct和数据库表之间的灵活映射，并支持自动同步
- 事务支持
- 同时支持原始SQL语句和ORM操作的混合执行
- 使用连写来简化调用
- 支持使用Id, In, Where, Limit, Join, Having, Table, SQL, Cols等函数和结构体等方式作为条件
- 支持级联加载Struct
- Schema支持（仅Postgres）
- 支持缓存
- 支持根据数据库自动生成xorm的结构体
- 支持记录版本（即乐观锁）
- 内置SQL Builder支持
- 通过EngineGroup支持读写分离和负载均衡

# 安装

```shell
go get xorm.io/xorm
```


# 创建 Engine 引擎  创建结构体同步数据库表

```go
// CoonXormMysql 连接数据库
package main

import (
"fmt"
_ "gorm.io/driver/mysql"
"time"
"xorm.io/xorm"
)

//数据库连接基本信息
var (
   userName  string = "root"
   password  string = "12138"
   ipAddress string = "127.0.0.1"
   port      int    = 3306
   dbName    string = "xorm_db"
   charset   string = "utf8mb4"
)

type User struct {
   Id      int64
   Name    string
   Age     int
   Passwd  string    `xorm:"varchar(200)"`
   Created time.Time `xorm:"created"`
   Updated time.Time `xorm:"updated"`
}

var engine *xorm.Engine

// CoonXormMysql 连接数据库
func CoonXormMysql() {
   //构建数据库连接信息
   dataSourceName := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=%s", userName, password, ipAddress, port, dbName, charset)
   //创建引擎
   engine, _ = xorm.NewEngine("mysql", dataSourceName)

   err := engine.Sync2(new(User))
   if err != nil {
      fmt.Println("同步失败")
   }
}

```

#CRUD操作
使用Engine的insert，query，update，delete等方法
## 添加
- 插入一条数据，此时可以用Insert或者InsertOne
```go
user := User{Id: 1, Name: "wmq1", Age: 17, Passwd: "1234567"}
n, _ := engine.Insert(user)
```

- 插入数据使用Insert方法，Insert方法的参数可以是一个或多个Struct的指针，一个或多个Struct的Slice的指针。
  如果传入的是Slice并且当数据库支持批量插入时，Insert会使用批量插入的方式进行插入。
```go
//user切片
var users []User
users = append(users, User{Id: 2, Name: "wmq2", Age: 11, Passwd: "12344567"})
users = append(users, User{Id: 3, Name: "wmq3", Age: 10, Passwd: "12344567"})
n, _ = engine.Insert(users)
```
> 这里虽然支持同时插入，但这些插入并没有事务关系。因此有可能在中间插入出错后，后面的插入将不会继续。此时前面的插入已经成功，如果需要回滚，请开启事务。
批量插入会自动生成Insert into table values (),(),()的语句，因此各个数据库对SQL语句有长度限制，因此这样的语句有一个最大的记录数，根据经验测算在150条左右。大于150条后，生成的sql语句将太长可能导致执行失败。因此在插入大量数据时，目前需要自行分割成每150条插入一次。

## 查询
```go
//查询
func query() {
   //使用sql语句查询
   results, _ := engine.Query("select * from user")
   fmt.Println(results)
   results2, _ := engine.QueryString("select * from user")
   fmt.Println(results2)
   results3, _ := engine.QueryInterface("select * from user")
   fmt.Println(results3)

   //Get 只能查询单条数据
   user := User{}
   engine.Get(&user)
   fmt.Println("查询单条数据", user)

   //指定条件查询
   user1 := User{Name: "wmq1"}
   engine.Where("name=?", user1.Name).Asc("id").Get(&user1)
   fmt.Println("指定条件查询", user1)

   //获取指定字段的值
   var name string
   engine.Table(&user).Where("id = 3").Cols("name").Get(&name)
   fmt.Println("获取指定字段的值", name)

   //查询多条/所有记录 find
   var users []User //定义切片
   engine.Find(&users)
   fmt.Println("查询多条/所有记录", users)

   //Count 获取记录条数
   user2 := User{Passwd: "12344567"}
   count, _ := engine.Count(&user2)
   fmt.Println("获取记录条数", count)

   //Iterate 和 Rows根据条件遍历数据
   engine.Iterate(&User{Passwd: "12344567"}, func(idx int, bean interface{}) error {
      user := bean.(*User)
      fmt.Println("Iterate 和 Rows根据条件遍历数据", user)
      return nil
   })
   rows, _ := engine.Rows(&User{Passwd: "12344567"})
   defer rows.Close()
   userBean := new(User)
   for rows.Next() {
      rows.Scan(userBean)
      fmt.Println(userBean)
   }
}

```

## 修改
```go
//修改
func update() {
   //更新
   user := User{Name: "前端少年汪"}
   n, _ := engine.ID(1).Update(&user)
   fmt.Println(n)
}
```

## 删除
```go
//删除
func del() {
   //删除
   var user1 User
   n1, _ := engine.ID(3).Delete(&user1)
   fmt.Println(n1)
   
}
```

## 执行一个sql语句
```go
engine.Exec("update user set age = ? where id = ?", 10, 1001)
```

# 完整代码
```go
package main

import (
   "fmt"
   _ "gorm.io/driver/mysql"
   "time"
   "xorm.io/xorm"
)

//数据库连接基本信息
var (
   userName  string = "root"
   password  string = "12138"
   ipAddress string = "127.0.0.1"
   port      int    = 3306
   dbName    string = "xorm_db"
   charset   string = "utf8mb4"
)

type User struct {
   Id      int64
   Name    string
   Age     int
   Passwd  string    `xorm:"varchar(200)"`
   Created time.Time `xorm:"created"`
   Updated time.Time `xorm:"updated"`
}

var engine *xorm.Engine

func main() {
   fmt.Println("xorm 学习")

   CoonXormMysql()
   var input int

   var flag bool = true
   for flag {
      fmt.Println("1.添加")
      fmt.Println("2.查询")
      fmt.Println("3.更新")
      fmt.Println("4.删除")
      fmt.Println("5.退出")
      fmt.Scan(&input)
      if input == 1 {
         add()
      } else if input == 2 {
         query()
      } else if input == 3 {
         update()
      } else if input == 4 {
         del()
      } else if input == 5 {
         flag = false
      }
   }

}

// CoonXormMysql 连接数据库
func CoonXormMysql() {
   //构建数据库连接信息
   dataSourceName := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=%s", userName, password, ipAddress, port, dbName, charset)
   //创建引擎
   engine, _ = xorm.NewEngine("mysql", dataSourceName)

   err := engine.Sync2(new(User))
   if err != nil {
      fmt.Println("同步失败")
   }
}

//添加
func add() {
   user := User{Id: 1, Name: "wmq1", Age: 17, Passwd: "1234567"}
   n, _ := engine.Insert(user)
   fmt.Println(n)
   if n >= 1 {
      fmt.Println("插入成功")
   }

   //user切片
   var users []User
   users = append(users, User{Id: 2, Name: "wmq2", Age: 11, Passwd: "12344567"})
   users = append(users, User{Id: 3, Name: "wmq3", Age: 10, Passwd: "12344567"})
   n, _ = engine.Insert(users)

}

//查询
func query() {
   //使用sql语句查询
   results, _ := engine.Query("select * from user")
   fmt.Println(results)
   results2, _ := engine.QueryString("select * from user")
   fmt.Println(results2)
   results3, _ := engine.QueryInterface("select * from user")
   fmt.Println(results3)

   //Get 只能查询单条数据
   user := User{}
   engine.Get(&user)
   fmt.Println("查询单条数据", user)

   //指定条件查询
   user1 := User{Name: "wmq1"}
   engine.Where("name=?", user1.Name).Asc("id").Get(&user1)
   fmt.Println("指定条件查询", user1)

   //获取指定字段的值
   var name string
   engine.Table(&user).Where("id = 3").Cols("name").Get(&name)
   fmt.Println("获取指定字段的值", name)

   //查询多条/所有记录 find
   var users []User //定义切片
   engine.Find(&users)
   fmt.Println("查询多条/所有记录", users)

   //Count 获取记录条数
   user2 := User{Passwd: "12344567"}
   count, _ := engine.Count(&user2)
   fmt.Println("获取记录条数", count)

   //Iterate 和 Rows根据条件遍历数据
   engine.Iterate(&User{Passwd: "12344567"}, func(idx int, bean interface{}) error {
      user := bean.(*User)
      fmt.Println("Iterate 和 Rows根据条件遍历数据", user)
      return nil
   })
   rows, _ := engine.Rows(&User{Passwd: "12344567"})
   defer rows.Close()
   userBean := new(User)
   for rows.Next() {
      rows.Scan(userBean)
      fmt.Println(userBean)
   }
}

//修改
func update() {
   //更新
   user := User{Name: "前端少年汪"}
   n, _ := engine.ID(1).Update(&user)
   fmt.Println(n)
}

//删除
func del() {
   //删除
   var user1 User
   n1, _ := engine.ID(3).Delete(&user1)
   fmt.Println(n1)
}

```


