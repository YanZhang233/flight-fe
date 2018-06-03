var  _fl =  require('../util/fl.js');

var _flight = {
     addRequest : function(request, resolve, reject){
        _fl.request({
            url     : _fl.getServerUrl('/flight'),
            data    : request,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    listAll : function (pageIndex,pageSize,resolve,reject) {
        _fl.request({
            url     : _fl.getServerUrl('/flight/all'),
            data    : {
                pageIndex : pageIndex,
                pageSize  : pageSize
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        })
    },
    //list status是0
    listAllByStatus : function (pageIndex,pageSize,resolve,reject) {
        _fl.request({
            url     : _fl.getServerUrl('/flight'),
            data    : {
                pageIndex : pageIndex,
                pageSize  : pageSize
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        })
    },
    takeRequest : function (id,resolve,reject) {
        _fl.request({
            url     : _fl.getServerUrl('/flight/'+id),
            method  : 'PATCH',
            success : resolve,
            error   : reject
        })
    },
    deleteById : function (id,resolve,reject) {
        _fl.request({
            url     : _fl.getServerUrl('/flight/'+id),
            method  : 'DELETE',
            success : resolve,
            error   : reject
        })
    },
    //按照登录用户取得request by user
    getRequest: function (resolve,reject) {
        _fl.request({
            url : _fl.getServerUrl('/flight/user'),
            method  : 'GET',
            success : resolve,
            error : reject
        });
    },
    getRequestById : function (id,resolve,reject) {
        _fl.request({
            url : _fl.getServerUrl('/flight/'+id),
            method  : 'GET',
            success : resolve,
            error : reject
        });
    }
};

module.exports = _flight;