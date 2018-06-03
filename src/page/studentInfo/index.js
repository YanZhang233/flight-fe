require("./index.css");
var _fl = require('../../util/fl.js');
var _user   = require('../../service/user-service.js');
var templateIndex = require("./index.string");
// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 加载用户信息
        this.loadUserInfo();
    },
    bindEvent : function () {
        //提交表单
        var _this = this;
        $("#updateFrom").submit(function () {
            _this.update();
        });

        //退出登录
        // $("#logout").click(function () {
        //     _user.logout(function () {
        //         window.location.href = './index.html';
        //     },function (msg) {
        //         _fl.errorTips(msg);
        //     })
        // })
        $(document).on('click','#logout',function () {
                _user.logout(function () {
                     window.location.href = './index.html';
                 },function (msg) {
                     _fl.errorTips(msg);
                 });
        });
    }
    ,
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
        _user.getCurUserInfo(function(res){
            userHtml = _fl.renderHtml(templateIndex, res);
            $('#updateFrom').html(userHtml);
        }, function(msg){
            _fl.errorTips(msg);
        });
    }
};
$(function(){
    page.init();
});
