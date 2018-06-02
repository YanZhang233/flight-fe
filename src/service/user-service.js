var  _fl =  require('../util/fl.js');

var _user = {
    // 用户登录
    login : function(userInfo, resolve, reject){
        _fl.request({
            url     : _fl.getServerUrl('/user'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查用户名
    checkUsername : function(username, resolve, reject){
        _fl.request({
            url     : _fl.getServerUrl('/user/check_valid'),
            data    : {
                type    : 'username',
                str     : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查邮箱
    checkEmail : function(email, resolve, reject){
        _fl.request({
            url     : _fl.getServerUrl('/user/check_valid'),
            data    : {
                type    : 'email',
                str     : email
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 用户普通注册
    registerCommon : function(userInfo, resolve, reject){
        _fl.request({
            url     : _fl.getServerUrl('/user/new'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    getValidateEmail : function (username,resolve,reject) {
        _fl.request({
            url     : _fl.getServerUrl('/user/email/'+username),
            data    : null,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    // 注册接机人员
    registerVolunteer : function(userInfo, resolve, reject){
        _fl.request({
            url     : _fl.getServerUrl('/user/volunteer'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取用户信息
    getUserInfo : function(param,resolve, reject){
        _fl.request({
            url     : _fl.getServerUrl('/user/'+param),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    // 登出
    logout : function(resolve, reject){
        _fl.request({
            url     : _fl.getServerUrl('/user/logout'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    //检查是否login获取id
    checkIfLogin : function (resolve,reject) {
        _fl.request({
            url     : _fl.getServerUrl('/user/check_login'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    //更新用户信息
    // 更新个人信息
    updateUserInfo : function(userInfo, resolve, reject){
        _fl.request({
            url     : _fl.getServerUrl('/user'),
            data    : userInfo,
            method  : 'PATCH',
            success : resolve,
            error   : reject
        });
    },
    //按照登录用户取得request
    getRequest: function (userId,resolve,reject) {
        _fl.request({
            url : _fl.getServerUrl('/flight/'+userId),
            data : null,
            method  : 'GET',
            success : resolve,
            error : reject
        });
    },
    emailResetPass : function (username,resolve,reject) {
        _fl.request({
            url : _fl.getServerUrl('/user/password/'+username),
            data : null,
            method  : 'GET',
            success : resolve,
            error : reject
        });
    },
    //登录下改密码
    resetPass : function (id,resolve,reject) {
        _fl.request({
            url : _fl.getServerUrl('/user/password/'+id),
            data : null,
            method  : 'PATCH',
            success : resolve,
            error : reject
        });
    },
    //通过邮箱改密码
    resetPassByToken : function (username,token,password,resolve,reject) {
        _fl.request({
            url : _fl.getServerUrl('/user/password/email/'+username),
            data : {
                newPass: password,
                token : token
            },
            method  : 'PATCH',
            success : resolve,
            error : reject
        });
    },
    //addRequest
    addRequest : function(request, resolve, reject){
        _fl.request({
            url     : _fl.getServerUrl('/flight'),
            data    : request,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _user;