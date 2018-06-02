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
            url     : _fl.getServerUrl('/flight'),
            data    : {
                pageIndex : pageIndex,
                pageSize  : pageSize
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        })
    }
};

module.exports = _flight;