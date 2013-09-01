/**
 * @author: youxiachai
 * @Date: 13-8-31
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */

var should = require('should');
var JPush = require('../index');
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 *   // 4 means broadcast should wait 1 minute;
 if (receiver.type == 4) {
    if (!broadcastTimers) {
      var oneSecond = 60;
      broadcastTimers = setInterval(function () {
        oneSecond = oneSecond - 1;
        console.log(oneSecond);
        if (broadcastTimers == 0) {
          clearInterval(broadcastTimers);
          broadcastTimers = null;
        }
      }, 1000);

    } else {
      return callback(broadcastTimers);
    }
     // 1
    var IMEI = '';
    //2
    var tag = '';
    //3
    var alias = ''
    //4
    var bora = 4;
  }
 */
describe('should all test done', function () {
  var jpushClient = JPush.build({appkey: "90f80351266b389350168ebe", masterSecret: "aa83ac670b6ea7bfe8ba090e"});
  var sendno;
  beforeEach(function () {
    sendno = getRandomInt(1, 100000);
  })

  it('should push notificaion with IMEI', function (done) {
    var receiver = {};
    receiver.type = 1;
    //11be746356bd8fd8
    receiver.value = '11be746356bd8fd8';

    var msg = {};
    msg.type = 1;
    msg.platform = 'android';
    msg.content = {
      n_content: "hello world! from % && imei"
    };


    setTimeout(function () {
      jpushClient.pushNotification(sendno, receiver, msg, function (err, body) {
        if (err) return  done(JSON.stringify(err));
        body.should.include('"errmsg":"Succeed"');
        done();
      });
    }, 500);
  })

  it('should push notificaionn with tag', function (done) {
    var receiver = {};
    receiver.type = 2;
    //11be746356bd8fd8
    receiver.value = 'test';

    var msg = {};
    msg.type = 1;
    msg.platform = 'android';
    msg.content = {
      n_content:  'Hi! from tag'
    };

    setTimeout(function () {
      jpushClient.pushNotification(sendno, receiver, msg, function (err, body) {
        if (err) return  done(JSON.stringify(err));
        body.should.include('"errmsg":"Succeed"');
        done();
      });
    }, 500);
  })

  it('should push notificaion with alias', function (done) {
    var receiver = {};
    receiver.type = 3;
    //11be746356bd8fd8
    receiver.value = 'alias';

    var msg = {};
    msg.type = 1;
    msg.platform = 'android';
    msg.content = {
      n_content:  'Hi! from alias'
    };

    setTimeout(function () {
      jpushClient.pushNotification(sendno, receiver, msg, function (err, body) {
        if (err) return  done(JSON.stringify(err));
        body.should.include('"errmsg":"Succeed"');
        done();
      });
    }, 500);
  })

  it('should push notificaion with boardcast', function (done) {
    var receiver = {};
    receiver.type = 4;
    receiver.value = '';

    var msg = {};
    msg.type = 1;
    msg.platform = 'android';
    msg.content = {
      n_content:  'Hi! from boardcast'
    };
    this.timeout(0);
    setTimeout(function () {
    jpushClient.pushNotification(sendno, receiver, msg, function (err, body) {
      if (err) return  done(JSON.stringify(err));
      body.should.include('"errmsg":"Succeed"');
      done();
    })}, 60000);;

  })
});