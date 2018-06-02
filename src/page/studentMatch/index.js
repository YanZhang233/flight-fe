require("./index.css");
var _fl = require('../../util/fl.js');
var _user   = require('../../service/user-service.js');
var templateIndex = require("./index.string");


//逻辑部分
var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent : function(){
        _user.checkIfLogin(function (user) {
            //res就是user
            var matchHTML = '';
            _user.getRequest(user.id,function (res) {
                matchHTML = _fl.renderHtml(templateIndex,{
                    list : res.content
                });
                $('#matchBody').html(matchHTML);
            },function (msg) {
                $("#jiazaizhong").text("没有找到你的匹配！");
            })
        },function (msg) {
            alert(msg);
        })
    }
};

//Jquery ready的时候调用
$(function(){
    page.init();
});