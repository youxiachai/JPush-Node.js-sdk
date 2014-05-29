JPush Node.js sdk [![Build Status](https://travis-ci.org/youxiachai/JPush-Node.js-sdk.png?branch=master)](https://travis-ci.org/youxiachai/JPush-Node.js-sdk) [![NPM version](https://badge.fury.io/js/jpush.png)](http://badge.fury.io/js/jpush)
======================
极光推送Node.js 服务端 sdk

## v2 or v3

极光推送官网更新了v3 接口

[http://docs.jpush.cn/display/dev/Push-API-v3](http://docs.jpush.cn/display/dev/Push-API-v3)

所以,本sdk 库也同步更新...对于v2 接口用0.1.x 版本 , v3 用0.3.x版本.

## Usage

v2

```
npm install jpush@0.1
```

v3

```
npm install jpush
```

## Example

### Notification

``` js
var JPush = require('jpush');

var jpushClient = JPush.build({appkey: "you app key", masterSecret: "you master secret key"});

var body =  'Hi jpush nodejs sdk!';

jpushClient.pushNotification(body, function (err, result){
   console.log(result);
})
```

### Message

``` js
var JPush = require('jpush');

var jpushClient = JPush.build({appkey: "you app key", masterSecret: "you master secret key"});

var body =  'Hi jpush nodejs sdk!';

jpushClient.pushMessage(body, function (err, result) {
   console.log(result);
})
```

更多例子去看test目录下的单元测试

## Api Docs

### JPush Api v2

[jpush v2 在线API文档](http://blog.gfdsa.net/JPush-Node.js-sdk/api.html):http://blog.gfdsa.net/JPush-Node.js-sdk/

### JPush Api v3

[jpush v3 在线API文档](http://blog.gfdsa.net/JPush-Node.js-sdk/v3/jpush.html):http://blog.gfdsa.net/JPush-Node.js-sdk/v3/jpush.html

## 支持本项目
如果你觉得这个项目还不错,就请作者喝杯咖啡吧

[![](http://blog.gfdsa.net/img/pay_encourage.png)](http://me.alipay.com/youxilua)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/youxiachai/jpush-node.js-sdk/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

