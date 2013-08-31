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


/**
 *
 * @param options
 * @constructor
 */
function JPush(options) {
  this.appkey = options.appkey;
  this.masterSecret = options.masterSecret;
}

function buildVerifcation(sendno, receiver_type, receiver_value, master_secret) {
  return crypto.md5(sendno + '' + receiver_type +'' +receiver_value +'' +master_secret);
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
JPush.prototype.notification = function (sendno, receiver, txt, platform, callback) {

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

  request.post(JPUSH_API_URL_NOTIFICATION, done)
    .form({
      sendno: sendno,
      app_key: this.appkey,
      receiver_type: receiver.type,
      receiver_value: receiver.value,
      verification_code: buildVerifcation(sendno, receiver.type, receiver.value, this.masterSecret),
      txt: txt,
      platform: platform
    }
  );
}



module.exports = JPush;