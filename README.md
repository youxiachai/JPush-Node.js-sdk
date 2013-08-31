# JPush Node.js sdk

极光推送Node.js 服务端 sdk


##Usage

```
npm install jpush
```

###Example

``` js
var JPush = require('jpush');

var jpushClient = JPush.build({appkey: "you app key", masterSecret: "you master secret key"});

// type value 的限制与文档一致
var receiver = {};
receiver.type = 4;
receiver.value = '';

var msg = {};
msg.content =  'Hi! from boardcast';
msg.platform = 'android';

jpushClient.pushSimpleNotification(1, receiver, msg, function (err, body) {
  // JPush server message
  console.log(body);
});
```

##Api Support

###pushNotification

###pushSimpleNotification

###pushAndroidMessage

###pushSimpleNotification

