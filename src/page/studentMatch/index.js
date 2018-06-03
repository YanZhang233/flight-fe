require("./index.css");
var _fl = require('../../util/fl.js');
var _user   = require('../../service/user-service.js');
var templateIndex = require("./index.string");
var _flight =  require('../../service/flight-service.js');

//逻辑部分
var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
            var matchHTML = '';
            _flight.getRequest(function (res) {
                res.content.forEach(function (element,index,object) {
                    element.isTaken = (element.status===1);
                    if(element.status===-1) object.splice(index,1);
                });
                res.ifTaken = (res.content.status ===1);
                matchHTML = _fl.renderHtml(templateIndex,{
                    list : res.content
                });
                $('#matchForm').html(matchHTML);
            },function (msg) {
                _fl.errorTips(msg);
            });
    },
    bindEvent : function () {
            //按delete
            $(document).on('click', '.cancel', function(){
                var id = $('#requestId').html();
                _flight.deleteById(id,function () {
                    _fl.successTips("取消成功");
                    window.location.href = './studentMatch.html';
                },function (msg) {
                    _fl.errorTips(msg);
                })
            });
    }

};

//Jquery ready的时候调用
$(function(){
    page.init();
});