require("./index.css");
var _fl = require('../../util/fl.js');
var _user = require('../../service/user-service.js');


var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var paramToken = _fl.getUrlParam("token");
        var paramUsername = _fl.getUrlParam("username");
        if(!paramToken){
            $("#submitNewPass").click(function () {
                _user.checkIfLogin(function (user) {
                    var id = user.id;
                    _user.resetPass(id,function () {
                        alert("更新密码成功");
                    },function (msg) {
                        alert(msg);
                    });
                },function (msg) {
                    alert(msg);
                });
            });
        }else {
            //用的邮箱改密码
            $("#submitNewPass").click(function () {
                var newPass = $.trim($("#newPass").val());
                _user.resetPassByToken(paramUsername,paramToken,newPass,function () {
                    alert("修改成功");
                },function (msg) {
                    alert(msg);
                });
            });
        }
    }
};

//Jquery ready的时候调用
$(function(){
    page.init();
});