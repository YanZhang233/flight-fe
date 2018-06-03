require("./index.css");

var _fl = require('../../util/fl.js');
var _user   = require('../../service/user-service.js');

// page 逻辑部分
var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        var paramUsername = _fl.getUrlParam("username");
        var token = _fl.getUrlParam("token");
        if(token&&paramUsername){
            this.validateEmail(paramUsername,token);
        }
    },
    validateEmail :function (username,token) {
        _user.validateEmail(username,token,function () {
            _fl.successTips("激活成功");
        },function (msg) {
            _fl.errorTips(msg);
        })
    }

}
//Jquery ready的时候调用
$(function(){
    page.init();
});
