require("./index.css");
var _fl = require('../../util/fl.js');
var _user   = require('../../service/user-service.js');
var templateIndex = require("./index.string");
var _flight = require('../../service/flight-service.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('#err-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('#err-item').hide().find('.err-msg').text('');
    }
};

var formSuccess = {
    show : function(){
        $('#success-item').show();
    },
    hide : function(){
        $('#success-item').hide();
    }
};
//逻辑部分
var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        var detailHTML = '';
        var id = _fl.getUrlParam("id");
        _flight.getRequestById(id,function (res) {
            res.isNottaken = (res.status===0);
            detailHTML = _fl.renderHtml(templateIndex,{
                list : res
            });
            $('#requestBody').html(detailHTML);
        },function (msg) {
            alert(msg);
            $("#jiazaizhong").text("没有找到你的匹配！");
        });
    },
    bindEvent : function () {
        var _this = this;
        $(document).on('click','#taken',function () {
            _this.takeRequest();
        })
    },
    takeRequest : function () {
        var id = _fl.getUrlParam("id");
        _flight.takeRequest(id,function () {
            formSuccess.hide();
            formSuccess.show("Success");
        },function (msg) {
            formSuccess.hide();
            formError.show(msg);
        })
    }
};

//Jquery ready的时候调用
$(function(){
    page.init();
});