require("./index.css");
var _fl = require('../../util/fl.js');
var _user   = require('../../service/user-service.js');
var templateIndex = require("./index.string");
// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 加载用户信息
        this.loadUserInfo();

        var _this = this;
        $("#updateFrom").submit(function () {
            _this.update();
        });
    },
    //update用户信息
    update : function () {
        var userInfo = {
            gender : $("#gender").val()
        }
        _user.updateUserInfo(userInfo,function () {
            _fl.successTips("Update success");
        },function () {
            _fl.errorTips("Update error");
        })
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.checkIfLogin(function (res) {
            if(res){
                _user.getUserInfo(res.id,function(res){
                    userHtml = _fl.renderHtml(templateIndex, res);
                    $('#updateFrom').html(userHtml);
                }, function(msg){
                    _fl.errorTips(msg);
                });
            }
        },function (msg) {
           //强制登录
            _fl.doLogin();
        });
    }
};
$(function(){
    page.init();
});
