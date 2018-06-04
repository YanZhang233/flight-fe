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

        $(document).on('click','#activate',function () {
            var username = $('#username').val();
            _this.sendEmail(username,function () {
                _fl.successTips("发送成功");
            },function (msg) {
                _fl.errorTips(msg);
            })
        });
    }
    ,
    //update用户信息
    update : function () {
        var userInfo = {
            gender: $.trim($("#gender").val()),
            graduatedFrom: $.trim($('#graduatedFrom').val()),
            major: $.trim($('#major').val()),
            homeTown: $.trim($('#home').val()),
            actualName: $.trim($('#name').val()),
            wechat: $.trim($('#wechat').val())
        };
        _user.updateUserInfo(userInfo,function () {
            _fl.successTips("Success");
            window.location.href = './studentInfo.html';
        },function (msg) {
            _fl.errorTips(msg);
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
    },
    sendEmail : function (username) {
        _user.getValidateEmail(username,function () {
            _fl.successTips("邮件已发送");
        },function (msg) {
            _fl.errorTips(msg);
        })
    }
};
$(function(){
    page.init();
});
