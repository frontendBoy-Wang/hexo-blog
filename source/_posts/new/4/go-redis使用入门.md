---
title: go-redis使用入门
categories:
- go
cover: ../img/41.png
feature: false
date: 2023-4-18 10:46:35
tags: go
---


# 安装go-redis

```
//redis 6
go get github.com/go-redis/redis/v8
//redis 7
go get github.com/go-redis/redis/v9
```

 

# 初始化连接redis

```go
func redisInit() {
	//初始化redis，连接地址和端口，密码，数据库名称
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "wmq12138",
		DB:       0,
	})
}
```

  


# 入门案例

```go
package main

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
)

var rdb *redis.Client

func main() {
	redisInit()
	//创建上下文
	ctx := context.Background()
	//set方法设置key和value，处理返回的错误，参数（上下文，key名，value值，过期时间）
	err := rdb.Set(ctx, "goredistest", "test", 0).Err()
	if err != nil {
		fmt.Print(err)
		return
	}
	//get方法获取value
	val, err := rdb.Get(ctx, "goredistest").Result()
	if err != nil {
		fmt.Print(err)
		return
	}
	//do方法使用原生命令,返回值是一个interface类型
	result, err := rdb.Do(ctx, "get", "goredistest").Result()
	if err != nil {
		fmt.Print(err)
		return
	}
	fmt.Println("get:", val)
	fmt.Print("原生命令：", result.(string))

}
```

  





# 连接配置

redis.NewClient(&redis.Options{}),其中Options是连接的配置，是一个结构体类型，以下是配置选项和说明

```go
type Options struct {
  // 网络类型：[ tcp , unix ]
  // 默认是 tcp
  Network string

  // host:port 地址
  Addr string

  // 要使用的 TLS 配置。 当设置 TLS 时将协商。
  TLSConfig *tls.Config
  //创建一个新的连接，优先于Newwork和Addr选项
  Dialer func(ctx context.Context, network, addr string) (net.Conn, error)
  // 新建一个redis连接的时候，会回调这个函数
  OnConnect func(ctx context.Context, cn *Conn) error
  // 当连接到使用 Redis ACL 系统的 Redis 6.0 或更高版本的实例时，
  // 使用指定的 用户名 对当前连接进行身份验证  (ACL 列表中定义的连接之一)。
  Username string

  // 可选密码。 
  // 必须与 requirepass 服务器配置选项中指定的密码（如果连接到 Redis 5.0 或更低版本的实例）
  // 或 连接到使用 Redis ACL 系统的 Redis 6.0 或更高版本的实例时的用户密码 匹配。
  Password string

  // 连接到服务器后要选择的数据库。
  DB int

  // ====== 重试、退避时间======
  // 放弃前的最大重试次数。
  // 默认是 3 次重试； -1（非 0）禁用重试。
  MaxRetries int
  // 每次重试之间的最小退避。
  // 默认为 8 毫秒； -1 禁用退避。
  MinRetryBackoff time.Duration
   // 每次重试之间的最大退避。
  // 默认为 512 毫秒； -1 禁用退避。
  MaxRetryBackoff time.Duration

  // ======连接超时、读超时、写超时======
  // 建立新连接的拨号超时。
  // 默认为 5 秒。
  DialTimeout time.Duration
  // 套接字读取超时。 
  // 如果达到，命令将失败并超时而不是阻塞。
  // 使用值 -1 表示无超时，使用 0 表示默认值。
  // 默认为 3 秒。
  ReadTimeout time.Duration
  // 套接字写入超时。 
  // 如果达到，命令将失败并超时而不是阻塞。
  // 默认为 ReadTimeout。
  WriteTimeout time.Duration

  // 连接池的类型。
  // FIFO 池为 true，LIFO 池为 false。
  // 请注意，与 lifo 相比，fifo 的开销更高。
  PoolFIFO bool

  // 最大套接字连接数。
  // 默认为每个可用 CPU 10 个连接，由 runtime.GOMAXPROCS 报告。  
  PoolSize int

  // 建立新连接缓慢时有用的最小空闲连接数。
  MinIdleConns int

  // 客户端退出（关闭）连接的连接年龄。
  // 默认是不关闭老化的连接。
  MaxConnAge time.Duration

  // 如果所有连接都忙，则客户端在返回错误之前等待连接的时间。
  // 默认为 ReadTimeout + 1 秒。
  PoolTimeout time.Duration

  // 客户端关闭空闲连接的时间。
  // 应该小于服务器的超时时间。
  // 默认为 5 分钟。 -1 禁用空闲超时检查。
  IdleTimeout time.Duration

  // 空闲连接 reaper 进行空闲检查的频率。
  // 默认为 1 分钟。 -1 禁用空闲连接reaper，
  // 但如果设置了 IdleTimeout，空闲连接仍会被客户端丢弃。
  IdleCheckFrequency time.Duration
  
  // 在从节点上启用只读查询。
  readOnly bool

  // 用于实现断路器或速率限制器的限制器接口。
  Limiter Limiter
}
```

  


* * *

  


# 基本使用

```go
package main

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"time"
)

var rdb *redis.Client          //创建redis客户端实例
var ctx = context.Background() //创建上下文
```

## string类型的操作方法

-   Get
-   Set
-   GetSet
-   SetNX
-   MGset
-   MSet
-   Incr,IncrBy
-   Decr,DecrBy
-   Del
-   Expire

### Get 获取key的值，返回值：错误信息error和value

```go
//get 方法 返回值和错误信息
func Get(k string) string {
	str, err := rdb.Get(ctx, k).Result()
	if err != nil {
		fmt.Print(err)
	}
	fmt.Println("key", k, "的值：", str)
	return str
}
```

  


### Set 设置key和value，以及key的过期时间expiration 返回值：error

```
//set 方法
func Set(key string, val interface{}, expiration time.Duration) {
	err := rdb.Set(ctx, key, val, expiration).Err()
	if err != nil {
		fmt.Print(err)
		return
	}
}
```

  


### GetSet 设置一个key的值，并且返回这个key的旧值

```
func GetSet(k string, v interface{}) interface{} {
	oldValue, err := rdb.GetSet(ctx, k, v).Result()
	if err != nil {
		fmt.Print(err)
	}
	fmt.Println("设置一个key的值，并返回这个key的旧值:", oldValue)
	return oldValue
}
```

  


### SetNX 如果key不存在，则设置这个key的值

```
func SetNx(k string, v interface{}, t time.Duration) {
	err := rdb.SetNX(ctx, k, v, t)
	if err != nil {
		fmt.Print(err)
	}
}
```

  


### MGet 批量查询key的值

```
func MGet(k ...string) {
	err := rdb.MGet(ctx, k...)
	if err != nil {
		fmt.Print(err)
	}
}
```

  


### MSet 批量设置key的值

```
//MSet 批量设置key的值
func MSet(values ...interface{}) {
	rdb.MSet(ctx, values)
}
```

  


### Del 删除单个或者多个key

```
//delOneKeys 删除单个key
func delOneKeys(k string) {
    rdb.Del(ctx, k)
}

//delKeys 删除多个key
func delKeys(k ...string) {
	rdb.Del(ctx, k...)
}
```

### Expire 设置key的过期时间

```
func expire(k string, t time.Duration) {
	rdb.Expire(ctx, k, t)
}
```

  


### Incr针对一个key的数值进行递增操作

IncrBy指定每次递增多少 IncrByFloat 指定每次递增多少，跟IncrBy的区别是累加的是浮点数

```go
//addVal 针对一个key的数值进行递增操作
func addVal(k string) {
	// Incr函数每次加一
	val, err := rdb.Incr(ctx, "key").Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("最新值", val)

	// IncrBy函数，可以指定每次递增多少
	valBy, err := rdb.IncrBy(ctx, "key", 2).Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("最新值", valBy)

	// IncrByFloat函数，可以指定每次递增多少，跟IncrBy的区别是累加的是浮点数
	valFloat, err := rdb.IncrByFloat(ctx, "key1", 2.2).Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("最新值", valFloat)
}
```

  


### Decr 针对一个key的数值进行递减操作

```go
func Decr() {
	// Decr函数每次减一
	val, err := rdb.Decr(ctx, "key").Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("最新值", val)

	// DecrBy函数，可以指定每次递减多少
	valBy, err := rdb.DecrBy(ctx, "key", 2).Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("最新值", valBy)
}
```

  


## Hash类型的操作方法

**内部采用数组+链表结构，采用链地址法解决哈希冲突。**

-   [1. HSet](https://www.mszlu.com/go/go-redis/02/02.html#_1-hset)
-   [2. HGet](https://www.mszlu.com/go/go-redis/02/02.html#_2-hget)
-   [3. HGetAll](https://www.mszlu.com/go/go-redis/02/02.html#_3-hgetall)
-   [4. HIncrBy](https://www.mszlu.com/go/go-redis/02/02.html#_4-hincrby)
-   [5. HKeys](https://www.mszlu.com/go/go-redis/02/02.html#_5-hkeys)
-   [6. HLen](https://www.mszlu.com/go/go-redis/02/02.html#_6-hlen)
-   [7. HMGet](https://www.mszlu.com/go/go-redis/02/02.html#_7-hmget)
-   [8. HMSet](https://www.mszlu.com/go/go-redis/02/02.html#_8-hmset)
-   [9. HSetNX](https://www.mszlu.com/go/go-redis/02/02.html#_9-hsetnx)
-   [10. HDel](https://www.mszlu.com/go/go-redis/02/02.html#_10-hdel)
-   [11. HExists](https://www.mszlu.com/go/go-redis/02/02.html#_11-hexists)

```go
// HashMethods Hash 操作方法
func HashMethods() {
	//●  HSet
	// user_1 是hash key，username 是字段名, zhangsan是字段值
	rdb.HSet(ctx, "user_1", "username", "zhangsan", "f1", "f_v1")
	//● 2. HGet 	根据key和field字段，查询field字段的值
	result, _ := rdb.HGet(ctx, "user_1", "username").Result()
	fmt.Println(result)

	//● 3. HGetAll	获取所有的字段和值
	all, _ := rdb.HGetAll(ctx, "user_1").Result()
	fmt.Println(all)
	//● 4. HIncrBy 累加count字段的值，一次性累加2， user_1为hash key
	count, err := rdb.HIncrBy(ctx, "user_1", "count", 2).Result()
	fmt.Println(count, err)
	//● 5. HKeys根据key返回所有的字段名
	keys := rdb.HKeys(ctx, "user_1")
	fmt.Println(keys)
	//● 6. HLen根据key，查询hash的字段数量
	i, err := rdb.HLen(ctx, "user_1").Result()
	fmt.Println(i)
	//● 7. HMGet根据key和多个字段名，批量查询多个hash字段值
	b, err := rdb.HMGet(ctx, "user_1", "f1", "count").Result()
	fmt.Println(b)
	//● 8. HMSet根据key和多个字段名和字段值，批量设置hash字段值
	// 初始化hash数据的多个字段值
	data := make(map[string]interface{})
	data["id"] = 1
	data["username"] = "lisi"
	// 一次性保存多个hash字段值
	rdb.HMSet(ctx, "key", data).Err()

	//● 9. HSetNX如果field字段不存在，则设置hash字段值
	rdb.HSetNX(ctx, "user_1", "f2", "f2value")
	//● 10. HDel根据key和字段名，删除hash字段，支持批量删除hash字段
	// 删除一个字段id
	rdb.HDel(ctx, "key", "id")
	// 删除多个字段
	rdb.HDel(ctx, "key", "id", "username")
	//● 11. HExists检测hash字段名是否存在
	err = rdb.HExists(ctx,"key", "id").Err()
	if err != nil {
		fmt.Println(err)
	}

}
```

## List的操作方法

  


-   [1. LPush](https://www.mszlu.com/go/go-redis/02/02.html#_1-lpush)
-   [2. LPushX](https://www.mszlu.com/go/go-redis/02/02.html#_2-lpushx)
-   [3. RPop](https://www.mszlu.com/go/go-redis/02/02.html#_3-rpop)
-   [4. RPush](https://www.mszlu.com/go/go-redis/02/02.html#_4-rpush)
-   [5. RPushX](https://www.mszlu.com/go/go-redis/02/02.html#_5-rpushx)
-   [6. LPop](https://www.mszlu.com/go/go-redis/02/02.html#_6-lpop)
-   [7. LLen](https://www.mszlu.com/go/go-redis/02/02.html#_7-llen)
-   [8. LRange](https://www.mszlu.com/go/go-redis/02/02.html#_8-lrange)
-   [9. LRem](https://www.mszlu.com/go/go-redis/02/02.html#_9-lrem)
-   [10. LIndex](https://www.mszlu.com/go/go-redis/02/02.html#_10-lindex)
-   [11. LInsert](https://www.mszlu.com/go/go-redis/02/02.html#_11-linsert)

```go
//ListOperateMethods List操作方法
func ListOperateMethods() {
	//● 1. LPush 添加到list的左侧,LPush支持一次插入一个或者任意个数据
	rdb.LPush(ctx, "w1", "w2", "w3", "w4", "w")
	//● 2. LPushX 跟LPush的区别是，仅当列表存在的时候才插入数据,用法完全一样。
	rdb.LPushX(ctx, "w1", "w2", "w3", "w4", "w")
	//● 3. RPop从列表的右边删除第一个数据，并返回删除的数据
	rdb.RPop(ctx, "w1")
	//● 4. RPush
	rdb.RPush(ctx, "w1", "wmq", "wmq2")
	//● 5. RPushX 跟RPush的区别是，仅当列表存在的时候才插入数据, 他们用法一样
	rdb.RPushX(ctx, "w1", "wm3", "w3")
	//● 6. LPop从列表左边删除第一个数据，并返回删除的数据
	val, _ := rdb.LPop(ctx, "w1").Result()
	fmt.Println(val)
	//● 7. LLen返回列表的大小
	lLen, _ := rdb.LLen(ctx, "w1").Result()
	fmt.Println(lLen)
	//● 8. LRange返回列表的一个范围内的数据，也可以返回全部数据
	result, _ := rdb.LRange(ctx, "w1", 0, lLen).Result()
	fmt.Println(result)
	//● 9. LRem删除列表中的数据 从列表左边开始，删除100， 如果出现重复元素，仅删除1次，也就是删除第一个
	dels, _ := rdb.LRem(ctx, "key", 1, "w1").Result()
	fmt.Println(dels)
	//● 10. LIndex
	// 列表索引从0开始计算，这里返回第6个元素
	val, _ = rdb.LIndex(ctx, "w1", 5).Result()

	fmt.Println(val)
	//● 11. LInsert// 在列表中5的前面插入4
	//// before是之前的意思
	insert := rdb.LInsert(ctx, "w1", "after", 1, 2)
	fmt.Println(insert)
}
```

## Set的操作方法

**Set是无序且不会重复的字符串集合** set和list的区别是set不包含重复的元素

-   [1. SAdd](https://www.mszlu.com/go/go-redis/02/02.html#_1-sadd)
-   [2. SCard](https://www.mszlu.com/go/go-redis/02/02.html#_2-scard)
-   [3. SIsMember](https://www.mszlu.com/go/go-redis/02/02.html#_3-sismember)
-   [4. SMembers](https://www.mszlu.com/go/go-redis/02/02.html#_4-smembers)
-   [5. SRem](https://www.mszlu.com/go/go-redis/02/02.html#_5-srem)
-   [6. SPop,SPopN](https://www.mszlu.com/go/go-redis/02/02.html#_6-spop-spopn)

```go
//	Set操作方法
func setOperateMethods() {
	//● 1. SAdd
	rdb.SAdd(ctx, "set_key", 100, 10, 32, 4, 100, 5)
	//● 2. SCard
	res, _ := rdb.SCard(ctx, "set_key").Result()
	fmt.Println(res)

	//● 3. SIsMember判断元素是否在集合中
	result, _ := rdb.SIsMember(ctx, "set_key", 900).Result()
	fmt.Println(result)
	//● 4. SMembers 获取集合中所有的元素
	strings, _ := rdb.SMembers(ctx, "set_key").Result()
	fmt.Println(strings)

	//● 5. SRem删除集合元素
	i, _ := rdb.SRem(ctx, "set_key", 100, 4).Result()
	fmt.Println("返回删除的个数", i)
	//● 6. SPop,SPopN 随机返回集合中的元素，并且删除返回的元素
	rdb.SPop(ctx, "set_key")
	fmt.Println(rdb.SMembers(ctx, "set_key").Result())

	// 随机返回集合中的一个元素，并且删除这个元素
	val, _ := rdb.SPop(ctx,"key").Result()
	fmt.Println(val)

	// 随机返回集合中的5个元素，并且删除这些元素
	vals, _ := rdb.SPopN(ctx,"key", 5).Result()
	fmt.Println(vals)

}
```

## sorted set操作方法

有序的，非重复的的字符串集合

-   [1. ZAdd](https://www.mszlu.com/go/go-redis/02/02.html#_1-zadd)
-   [2. ZCard](https://www.mszlu.com/go/go-redis/02/02.html#_2-zcard)
-   [3. ZCount](https://www.mszlu.com/go/go-redis/02/02.html#_3-zcount)
-   [4. ZIncrBy](https://www.mszlu.com/go/go-redis/02/02.html#_4-zincrby)
-   [5. ZRange,ZRevRange](https://www.mszlu.com/go/go-redis/02/02.html#_5-zrange-zrevrange)
-   [6. ZRangeByScore](https://www.mszlu.com/go/go-redis/02/02.html#_6-zrangebyscore)
-   [7. ZRevRangeByScore](https://www.mszlu.com/go/go-redis/02/02.html#_7-zrevrangebyscore)
-   [8. ZRangeByScoreWithScores](https://www.mszlu.com/go/go-redis/02/02.html#_8-zrangebyscorewithscores)
-   [9. ZRem](https://www.mszlu.com/go/go-redis/02/02.html#_9-zrem)
-   [10. ZRemRangeByRank](https://www.mszlu.com/go/go-redis/02/02.html#_10-zremrangebyrank)
-   [11.ZRemRangeByScore](https://www.mszlu.com/go/go-redis/02/02.html#_11-zremrangebyscore)
-   [12. ZScore](https://www.mszlu.com/go/go-redis/02/02.html#_12-zscore)
-   [13. ZRank](https://www.mszlu.com/go/go-redis/02/02.html#_13-zrank)

* * *

  


# 发布订阅

  


Redis提供了发布订阅功能，可以用于消息的传输，Redis的发布订阅机制包括三个部分，发布者，订阅者和Channel。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9191e7cbae14520ae300552b6546303~tplv-k3u1fbpfcp-zoom-1.image)

  


发布者和订阅者都是Redis客户端，Channel则为Redis服务器端，发布者将消息发送到某个的频道，订阅了这个频道的订阅者就能接收到这条消息。

## 订阅者 subscriber

  


```go
//subscriber 订阅者订阅channel1的消息
func subscriber() {
	// 订阅channel1这个channel
	sub := rdb.Subscribe(ctx, "channel1")
	// sub.Channel() 返回go channel，可以循环读取redis服务器发过来的消息
	for msg := range sub.Channel() {
		// 打印收到的消息
		fmt.Println( msg.Channel, msg.Payload)
		fmt.Println()
	}
	//或者
	for {
		msg, err := sub.ReceiveMessage(ctx)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(msg.Channel, msg.Payload)
	}
}
```

  


## 发布者 publisher

  


```go
package main

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"strconv"
)

var rdb *redis.Client          //创建redis客户端实例
var ctx = context.Background() //创建上下文
func main() {
	//初始化redis，连接地址和端口，密码，数据库名称
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	// 将"message"消息发送到channel1这个通道上

	for i := 1; i <= 100; i++ {
		fmt.Println(i)
		str := strconv.Itoa(i) + ".message收到前端回答"
		rdb.Publish(ctx, "channel1", str)
	}
}
```

  


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7de52b591b14ae5a5f25d9f5552c228~tplv-k3u1fbpfcp-zoom-1.image)

其他的一些方法

```go
func cancelSub() {
	// 订阅channel1这个channel
	sub := rdb.Subscribe(ctx, "channel1")
	// 取消订阅
	sub.Unsubscribe(ctx, "channel1")
}

func querySubCount() {
	// 查询channel_1通道的订阅者数量
	chs, _ := rdb.PubSubNumSub(ctx, "channel_1").Result()
	for ch, count := range chs {
		fmt.Println(ch)    // channel名字
		fmt.Println(count) // channel的订阅者数量
	}
}
```

##

## 事务操作

  


redis事务可以一次执行多个命令， 并且带有以下两个重要的保证：

-   事务是一个单独的隔离操作：事务中的所有命令都会序列化、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断。
-   事务是一个原子操作：事务中的命令要么全部被执行，要么全部都不执行。

  


### TxPinline

```go
//事务操作
//TxPinline
func Txline() {
	// 开启一个TxPipeline事务
pipe := rdb.TxPipeline()

// 执行事务操作，可以通过pipe读写redis
incr := pipe.Incr(ctx,"tx_pipeline_counter")
pipe.Expire(ctx,"tx_pipeline_counter", time.Hour)

// 上面代码等同于执行下面redis命令
//
//     MULTI
//     INCR pipeline_counter
//     EXPIRE pipeline_counts 3600
//     EXEC

// 通过Exec函数提交redis事务
_, err := pipe.Exec(ctx)

// 提交事务后，我们可以查询事务操作的结果
// 前面执行Incr函数，在没有执行exec函数之前，实际上还没开始运行。
fmt.Println(incr.Val(), err)
}
```

### watch

redis乐观锁支持，可以通过watch监听一些Key, 如果这些key的值没有被其他人改变的话，才可以提交事务

  


```go
func watch() {

	// 定义一个回调函数，用于处理事务逻辑
	fn := func(tx *redis.Tx) error {
		// 先查询下当前watch监听的key的值
		v, err := tx.Get(ctx, "key").Int()
		if err != nil && err != redis.Nil {
			return err
		}
		// 这里可以处理业务
		v++

		// 如果key的值没有改变的话，Pipelined函数才会调用成功
		_, err = tx.Pipelined(ctx, func(pipe redis.Pipeliner) error {
			// 在这里给key设置最新值
			pipe.Set(ctx, "key", v, 0)
			return nil
		})
		return err
	}

	// 使用Watch监听一些Key, 同时绑定一个回调函数fn, 监听Key后的逻辑写在fn这个回调函数里面
	// 如果想监听多个key，可以这么写：client.Watch(ctx,fn, "key1", "key2", "key3")
	rdb.Watch(ctx, fn, "key")
}
```