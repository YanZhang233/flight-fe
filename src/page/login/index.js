require("./index.css");
var _fl = require('../../util/fl.js');
var _user = require('../../service/user-service.js');

/**
 * 登录部分
 * @type {{show: formError.show, hide: formError.hide}}
 */

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
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 登录按钮的点击
        $('#logForm').submit(function(){
            _this.submit();
        });
        $('#forgetPass').click(function () {
            _this.getEmailResetPass();
        });
    },
    getEmailResetPass : function () {
        var username = $.trim($('#forgetUserName').val());
        _user.emailResetPass(username,function () {
            alert("请查看邮箱");
        },function (msg) {
            alert(msg);
        });
    },

    // 提交表单
    submit : function(){
        var formData = {
                username : $.trim($('#username').val()),
                password : $.trim($('#password').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            _user.login(formData, function(res){
                window.location.href = _fl.getUrlParam('redirect') || './index.html';
            }, function(msg){
                formError.show(msg);
            });
        }
        // 验证失败
        else{
            // 错误提示
            formError.show(validateResult.msg);
        }

    },
    // 表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_fl.validate(formData.username, 'require')){
            result.msg = 'username cant be empty';
            return result;
        }
        if(!_fl.validate(formData.password, 'require')){
            result.msg = 'password cant be empty';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = 'Success';
        return result;
    }
};
//Jquery ready的时候调用
$(function(){
    page.init();
});




//表单输入验证
$(function () {
    var errMsg;
    $.each($("input"), function (i, val) {
        $(val).blur(function () {
            if ($(val).attr("name") == "email") {
                $(".emailMsg").remove();
                var email = val.value;
                var regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[edu]+$/;
                if (email == "" || email.trim() == "") {
                    errMsg = "<span class='emailMsg' style='color:red;'>邮箱不能为空</span>";
                } else if (!regEmail.test(email)) {
                    errMsg = "<span class='emailMsg' style='color:red;'>请输入有效的edu邮箱</span>";
                }
                $(this).parent().append(errMsg);
            } else if ($(val).attr("name") == "password") {
                $(".pwdMsg").remove();
                var pwd = val.value;
                if (pwd == "" || pwd.trim() == "") {
                    errMsg = "<span class='pwdMsg' style='color:red;'>密码不能为空</span>";
                }
                $(this).parent().append(errMsg);
            }
        });
    });
});

//忘记密码的弹窗
$(document).ready(function () {
    $('.forgot-pass').click(function(event) {
        $(".pr-wrap").toggleClass("show-pass-reset");
    });

    $('.pass-reset-submit').click(function(event) {
        $(".pr-wrap").removeClass("show-pass-reset");
    });
});