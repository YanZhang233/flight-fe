require("./index.css");
var _fl = require('../../util/fl.js');
var _user = require('../../service/user-service.js');

var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        _user.checkIfLogin(function (res) {
            $("#showUser").text("Hello "+res.userName);
            $("#showUser").attr("href","studentInfo.html");
        },function () {
            //没有登录 不做处理
        });
    }
}

//Jquery ready的时候调用
$(function(){
    page.init();
});