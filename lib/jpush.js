var request = require('request'),
    debug = require('debug')('jpush:sdk');


var JPUSH_API_URL = 'https://api.jpush.cn/v3/push'


function JPush(options) {
    this.appkey = options.appkey;
    this.masterSecret = options.masterSecret;
}


/**
 * support android ios winphone
 * @param body
 * @param options
 * @param callback
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
    //check default all
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
 * support android ios
 * @param body
 * @param options
 * @param callback
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
    //check default all
    postBody.platform = options.platform || 'all';

    postBody.audience = options.audience || 'all';

    postBody.options = options.options || {};

    var postBody = {};
    //check default all
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
    //check default all
    postBody.platform = options.platform || 'all';

    postBody.audience = options.audience || 'all';

    postBody.options = options.options || {};


    postJPushApi(postBody, options, callback);

}


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
 * @param {Object} options {appkey: "you app key", masterSecret: "you master secret"}
 * @return {JPush} JPush实例 build({appkey: "you app key", masterSecret: "you master secret"})
 */
function build(options) {
    return new JPush(options);
}


exports.build = build;

exports.postJPushApi = postJPushApi;
