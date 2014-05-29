var request = require('request'),
    debug = require('debug')('jpush:sdk');


var JPUSH_API_URL = 'https://api.jpush.cn/v3/push'


function JPush(options) {
    this.appkey = options.appkey;
    this.masterSecret = options.masterSecret;
}


/**
 *
 * Example 1:
 *
```js
 var jpushClient = JPush.build({appkey: "appkey", masterSecret: "masterSecret"});
 var body =  'Hi jpush nodejs sdk!';
 jpushClient.pushNotification(body, function (err, result){
     console.log(result);
   })
```
 *
 * Example 2:
 *
```js
 var jpushClient = JPush.build({appkey: "appkey", masterSecret: "masterSecret"});
 //对象格式文档
 //http://docs.jpush.cn/display/dev/Push-API-v3#Push-API-v3-notification
 var body = {};
 body.android = {};
 body.android.alert = 'Hello, JPush Node.js sdk !';
 body.android.title = "Node.js sdk";

 var jpushOpitons = {};
 jpushOpitons.options = {};
 jpushOpitons.options.sendno = sendno;

 jpushOpitons.audience = {
            "tag" : ["sdk"]
        };
 jpushClient.pushNotification(body, function (err, result){
     console.log(result);
   })
```
 */
JPush.prototype.pushNotification = function (body, options, callback) {

    if (typeof body === 'undefined') {
        throw new Error('undefined is not a valid object.')
    }

    if ((typeof options === 'function') && !callback) {
        callback = options;
    }

    var options = typeof options === 'object' ? options : {};

    options.appkey = this.appkey;
    options.masterSecret = this.masterSecret;

    var postBody = {};


    postBody.platform = options.platform || 'all';

    postBody.audience = options.audience || 'all';

    postBody.options = options.options || {};

    postBody.notification = {};

    if(typeof body === 'string'){
        postBody.notification.alert = body;
    }else {
        postBody.notification = body;
    }

    postJPushApi(postBody, options, callback);
}

/**
 *
 * Example 1:
 *
 ```js
 var jpushClient = JPush.build({appkey: "appkey", masterSecret: "masterSecret"});
 var body =  'Hi jpush nodejs sdk!';
 jpushClient.pushMessage(body, function (err, result){
     console.log(result);
   })
 ```
 *
 * Example 2:
 *
 ```js
 var jpushClient = JPush.build({appkey: "appkey", masterSecret: "masterSecret"});
 //对象格式文档
 //http://docs.jpush.cn/display/dev/Push-API-v3#Push-API-v3-notification
 var body = {};
 body.android = {};
 body.android.alert = 'Hello, JPush Node.js sdk !';
 body.android.title = "Node.js sdk";

 var jpushOpitons = {};
 jpushOpitons.options = {};
 jpushOpitons.options.sendno = sendno;
 jpushOpitons.audience = {
            "tag" : ["sdk"]
        };
 jpushClient.pushMessage(body, function (err, result){
     console.log(result);
   })
 ```
 */
JPush.prototype.pushMessage = function (body, options, callback) {
    if (typeof body === 'undefined') {
        throw new Error('undefined is not a valid object.')
    }

    if ((typeof options === 'function') && !callback) {
        callback = options;
    }

    var options = typeof options === 'object' ? options : {};

    options.appkey = this.appkey;
    options.masterSecret = this.masterSecret;

    var postBody = {};

    postBody.platform = options.platform || 'all';

    postBody.audience = options.audience || 'all';

    postBody.options = options.options || {};

    var postBody = {};

    postBody.platform = options.platform || 'all';

    postBody.audience = options.audience || 'all';

    postBody.options = options.options || {};

    postBody.message = {};

    if(typeof body === 'string'){
        postBody.message.msg_content = body;
    }else {
        postBody.message = body;
    }



    postJPushApi(postBody, options, callback);


}

/*!
 *
 * @param postBody
 * @param options
 * @param callback
 */
JPush.prototype.pushNotifyAndMessage = function (body, options, callback) {

    if (typeof body === 'undefined') {
        throw new Error('undefined is not a valid object.')
    }

    if ((typeof options === 'function') && !callback) {
        callback = options;
    }

    var options = typeof options === 'object' ? options : {};

    options.appkey = this.appkey;
    options.masterSecret = this.masterSecret;

    var postBody = {};

    postBody.platform = options.platform || 'all';

    postBody.audience = options.audience || 'all';

    postBody.options = options.options || {};


    postJPushApi(postBody, options, callback);

}

/*!
 *
 * @param postBody
 * @param options
 * @param callback
 */
function postJPushApi(postBody, options, callback) {

    var done = function (err, res, body) {
        if (err) return callback(err);

        if (res.statusCode == 200) {
            callback(null, JSON.parse(body));
        } else {
            callback({
                statusCode: res.statusCode,
                body: JSON.parse(body)
            })
        }
    };

    debug('postJPushApi' + JSON.stringify(postBody));
    request.post({
        url: JPUSH_API_URL,
        body: JSON.stringify(postBody),
        auth: {
            user: options.appkey,
            pass: options.masterSecret
        },
        timeout: options.timeout || 60000  //default 1 min timeout
    }, done)


}

/**
 * 创建一个JPush 远程调用实例
 ```js
 var jpushClient = JPush.build({appkey: "appkey", masterSecret: "masterSecret"});
 ```
 */
function build(options) {
    return new JPush(options);
}


exports.build = build;

exports.postJPushApi = postJPushApi;
