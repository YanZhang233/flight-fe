var  _fl =  require('../util/fl.js');

var _flight = {
    listAllVolunteer : function (pageIndex,pageSize,resolve,reject) {
        _fl.request({
            url     : _fl.getServerUrl('/admin/all'),
            data    : {
                pageIndex : pageIndex,
                pageSize  : pageSize
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        })
    },
    listUncheckedVolunteer : function (pageIndex,pageSize,resolve,reject) {
        _fl.request({
            url     : _fl.getServerUrl('/admin'),
            data    : {
                pageIndex : pageIndex,
                pageSize  : pageSize
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        })
    },
    permitVolunteer : function (id,resolve,reject) {
        _fl.request({
            url     : _fl.getServerUrl('/admin/'+id),
            method  : 'PATCH',
            success : resolve,
            error   : reject
        })
    }
};

module.exports = _flight;