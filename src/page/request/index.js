require("./index.css");
var _fl = require('../../util/fl.js');
var _flight = require('../../service/flight-service.js');
var _user = require('../../service/user-service.js');


// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.err-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.err-item').hide().find('.err-msg').text('');
    }
};

var page = {
    init: function () {
        _user.checkIfLogin(function (res) {
            //login了
            $("#username").val(res.userName);
            $("#phone").val(res.phone);
        },function (msg) {
            //do login
            _fl.doLogin();
        });
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $("#request").submit(function () {
            _this.submitRequest();
        });
    },
    submitRequest : function () {
        var requestInfo = {
            airport : $.trim($("#airport").val()),
            destination : $.trim($("#destination").val()),
            description : $.trim($("#description").val()),
            flightInfo : $.trim($("#flightInfo").val()),
            time : $.trim($("#time").val()),
            baggage : $.trim($("#baggage").val()),
            numOfPeople : $.trim($("#people").val())
        };
        _flight.addRequest(requestInfo,function () {
            _fl.successTips("添加成功，请等待匹配");
            window.location.href = './studentMatch.html';
        },function (msg) {
            formError.show(msg);
        });
    }
};

//Jquery ready的时候调用
$(function(){
    page.init();
});