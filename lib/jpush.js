/**
 * @author: youxiachai
 * @Date: 13-8-31
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */

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
 *
 * @param sendno
 * @param receiver
 * @param msg
 * @param callback
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
 *
 * @param sendno
 * @param receiver
 * @param msg
 * @param callback
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
 * 1、指定的 IMEI。

 2、指定的 tag。

 3、指定的 alias。

 4、广播：对 app_key 下的所有用户推送消息。
 * @param sendno
 * @param receiver_type
 * @param txt
 * @param platform
 * @param callback
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
 * 该api 只支持android
 * @param sendno
 * @param receiver
 * @param txt
 * @param callback
 */
JPush.prototype.pushAndroidSimpleMessage = function (sendno, receiver, txt, callback) {
  var postBody = {};
  postBody.sendno = sendno;
  postBody.app_key = this.appkey;
  postBody.receiver_type = receiver.type;
  postBody.receiver_value = receiver.value || '';
  postBody.verification_code = buildVerifcation(postBody.sendno , postBody.receiver_type, postBody.receiver_value, this.masterSecret);
  postBody.txt = txt;
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
 *
 * @param options
 * @returns {JPush}
 */
exports.build = function (options) {
  return new JPush(options);
}
