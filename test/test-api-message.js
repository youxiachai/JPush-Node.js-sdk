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

describe('should test all push message', function () {

    var jpushClient = JPush.build({appkey: "90f80351266b389350168ebe", masterSecret: "aa83ac670b6ea7bfe8ba090e"});
    var sendno;

    beforeEach(function () {
        sendno = getRandomInt(1, 100000);
    })

    it('should push message all platform all audience', function (done) {

        var body = 'Hi jpush nodejs sdk!';

        setTimeout(function () {
            jpushClient.pushMessage(body, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done(err)
            })
        }, 1000)


    })

    it('should push message all platform all audience with options', function (done) {
        var body = ' push message from nodejs sdk!';

        var jpushOpitons = {};
        jpushOpitons.options = {};
        jpushOpitons.options.sendno = sendno;

        setTimeout(function () {
            jpushClient.pushMessage(body, jpushOpitons, function (err, result) {
                should.not.exist(err);

                result.sendno.should.equal(sendno + "");
                done(err)
            })
        }, 500)


    })


    it('should push message all platform audience tag sdk with options', function (done) {
        var body = 'push message all platform audience tag sdk';

        var jpushOpitons = {};
        jpushOpitons.options = {};
        jpushOpitons.options.sendno = sendno;

        jpushOpitons.audience = {
            "tag": ["sdk"]
        };

        setTimeout(function () {
            jpushClient.pushMessage(body, jpushOpitons, function (err, result) {
                should.not.exist(err);

                result.sendno.should.equal(sendno + "");
                done(err)
            })
        }, 500)


    })


    it('should push message obj all platform audience tag sdk with options', function (done) {
        var body = {};

        body.msg_content = 'push message obj';
        body.title = "Node.js sdk";


        var jpushOpitons = {};
        jpushOpitons.options = {};
        jpushOpitons.options.sendno = sendno;

        jpushOpitons.audience = {
            "tag": ["sdk"]
        };

        setTimeout(function () {
            jpushClient.pushMessage(body, jpushOpitons, function (err, result) {
                should.not.exist(err);
                result.sendno.should.equal(sendno + "");
                done(err)
            })
        }, 500);


    })


});