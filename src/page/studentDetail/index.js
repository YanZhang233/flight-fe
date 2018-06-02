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
        var detailHTML = '';
        var id = _fl.getUrlParam("id");
        _user.getUserInfo(id,function (res) {
            detailHTML = _fl.renderHtml(templateIndex, res);
            $('#requestBody').html(detailHTML);
        },function (msg) {
            $("#jiazaizhong").text("没有找到此同学的相关信息！");
        })
    }
};

//Jquery ready的时候调用
$(function(){
    page.init();
});