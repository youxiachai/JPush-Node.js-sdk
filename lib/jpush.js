
var request = require('request'),
  crypto = require('popularcrypto');

var JPUSH_API_URL = 'http://api.jpush.cn:8800/sendmsg/v2/sendmsg',
  JPUSH_API_URL_NOTIFICATION = 'http://api.jpush.cn:8800/sendmsg/v2/notification',
  JPUSH_API_URL_CUSTOM_MESSAGE = 'http://api.jpush.cn:8800/sendmsg/v2/custom_message';



function JPush(options) {
  this.appkey = options.appkey;
  this.masterSecret = options.masterSecret;
}

function buildVerifcation(sendno, receiver_type, receiver_value, master_secret) {
  return crypto.md5(sendno + '' + receiver_type +'' +receiver_value +'' +master_secret);
}

/**
 * 推送通知
 *
 * @param {int} sendno 1
 * @param {Object} receiver {type: 4, value: ""}
 * @param {Object} msg {type: 1, platform: "Android",  content: {n_content: "Hello world"}}
 * @param {Function} callback function(err, body){}
 */
JPush.prototype.pushNotification = function (sendno, receiver, msg, callback) {
  var postBody = {};
  postBody.sendno = sendno;
  postBody.app_key = this.appkey;
  postBody.receiver_type = receiver.type;
  postBody.receiver_value = receiver.value || '';
  postBody.verification_code = buildVerifcation(postBody.sendno , postBody.receiver_type, postBody.receiver_value, this.masterSecret);
  postBody.msg_type = msg.type;
  postBody.msg_content = JSON.stringify(msg.content);
  postBody.platform = msg.platform;

 postJPushApi(JPUSH_API_URL, postBody, callback);
}

/**
 * 推送自定义消息,只支持Android
 *
 * @param {int} sendno 1
 * @param {Object} receiver {type: 4, value: ""}
 * @param {Object} msg {content: {message: {your custom json}}}
 * @param {Function} callback function(err, body){}
 */
JPush.prototype.pushAndroidMessage = function (sendno, receiver, msg, callback) {
  var postBody = {};
  postBody.sendno = sendno;
  postBody.app_key = this.appkey;
  postBody.receiver_type = receiver.type;
  postBody.receiver_value = receiver.value || '';
  postBody.verification_code = buildVerifcation(postBody.sendno , postBody.receiver_type, postBody.receiver_value, this.masterSecret);
  postBody.msg_type = 2;
  postBody.msg_content = JSON.stringify(msg.content);
  postBody.platform = 'android';

  postJPushApi(JPUSH_API_URL, postBody, callback);
}

/**
 * 简易推送通知,纯文本
 * @param {int} sendno 1
 * @param {Object} receiver {type: 4, value: ""}
 * @param {Object} msg {content:  "hello world!"}
 * @param {Function} callback function(err, body){}
 */
JPush.prototype.pushSimpleNotification = function (sendno, receiver, msg, callback) {
  var postBody = {};
  postBody.sendno = sendno;
  postBody.app_key = this.appkey;
  postBody.receiver_type = receiver.type;
  postBody.receiver_value = receiver.value || '';
  postBody.verification_code = buildVerifcation(postBody.sendno , postBody.receiver_type, postBody.receiver_value, this.masterSecret);
  postBody.txt = msg.content;
  postBody.platform = msg.platform;

  postJPushApi(JPUSH_API_URL_NOTIFICATION, postBody, callback);
}

/**
 * 推送简易消息,纯文本只支持android
 * @param {int} sendno 1
 * @param {Object} receiver {type: 4, value: ""}
 * @param {Object} msg {content:  "hello world!"}
 * @param {Function} callback function(err, body){}
 */
JPush.prototype.pushAndroidSimpleMessage = function (sendno, receiver, msg, callback) {
  var postBody = {};
  postBody.sendno = sendno;
  postBody.app_key = this.appkey;
  postBody.receiver_type = receiver.type;
  postBody.receiver_value = receiver.value || '';
  postBody.verification_code = buildVerifcation(postBody.sendno , postBody.receiver_type, postBody.receiver_value, this.masterSecret);
  postBody.txt = msg.content;
  postBody.platform = 'android';

  postJPushApi(JPUSH_API_URL_CUSTOM_MESSAGE, postBody, callback);
}



function postJPushApi (apiUrl,postBody ,callback) {

  var done = function (err, res, body) {
    if (err) return callback(err);

    if (res.statusCode == 200) {
      callback(null, body);
    } else {
      callback({
        statusCode: res.statusCode,
        body: body
      })
    }
  };

  request.post(apiUrl, done)
    .form(postBody);
}

/**
 * 创建一个JPush 远程调用实例
 * @param {Object} options {appkey: "you app key", masterSecret: "you master secret"}
 * @return {JPush} JPush实例 build({appkey: "you app key", masterSecret: "you master secret"})
 */
function build (options) {
  return new JPush(options);
}


exports.build = build;