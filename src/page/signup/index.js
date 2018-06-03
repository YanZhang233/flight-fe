require("./index.css");
var _fl = require('../../util/fl.js');
var _user   = require('../../service/user-service.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.err-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.err-item').hide().find('.err-msg').text('');
    }
};

var formSuccess = {
    show : function(){
        $('.success-item').show();
    },
    hide : function(){
        $('.success-item').hide();
    }
}


//逻辑部分
var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        //验证user name
        $('#username').blur(function () {
            var username = $.trim($(this).val());
            //如果没输入用户名
            if (!username) {
                return;
            }
            //异步验证是否存在
            _user.checkUsername(username, function (res) {
                formError.hide();
            }, function (msg) {
                formError.show(msg);
            });
        });
        //检查邮箱
        $('#email').blur(function () {
            var email = $.trim($(this).val());
            //没有输入
            if (!email) {
                return;
            }
            _user.checkEmail(email, function (res) {
                formError.hide();
            }, function (msg) {
                formError.show(msg);
            });
        });
        // 注册按钮的点击
        $('#signUpForm').submit(function () {
            _this.submit();
        });
    },
    // 提交表单
    submit: function () {
        var username = $.trim($('#username').val());
        var _this = this;
        var formData = {
                userName: $.trim($('#username').val()),
                email: $.trim($('#email').val()),
                phone: $.trim($('#phone').val()),
                passwordConfirm: $.trim($('#passwordConfirm').val()),
                password: $.trim($('#password').val()),
                gender: $.trim($("#gender").val()),
                graduateFrom: $.trim($('#graduateFrom').val()),
                major: $.trim($('#major').val()),
                homeTown: $.trim($('#hometown').val()),
                actualName: $.trim($('#actualName').val()),
                wechat: $.trim($('#wechat').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        // 验证成功
        if (validateResult.status) {
            _user.registerCommon(formData, function (res) {
                formError.hide();
                formSuccess.show();
                //发邮件
                _this.sendEmail(username);
            }, function (msg) {
                formError.show(msg);
            });
        }// 验证失败
        else {
            // 错误提示
            formError.show(validateResult.msg);
        }
        
    },
    sendEmail : function (username) {
        _user.getValidateEmail(username,function () {
            alert("邮件发送成功");
        },function (msg) {
            alert(msg);
        })
    },
    // 表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_fl.validate(formData.userName, 'require')){
            result.msg = 'username cant be empty';
            return result;
        }
        if(!_fl.validate(formData.password, 'require')){
            result.msg = 'password cant be empty';
            return result;
        }
        if(formData.password.length<6){
            result.msg = 'password length cant be less than 6';
            return result;
        }
        if(formData.password!== formData.passwordConfirm){
            result.msg = 'Two passwords are not same';
            return result;
        }
        if(!_fl.validate(formData.email, 'require')){
            result.msg = 'Email is not right';
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

