require('./index.css');
var _fl = require('../../util/fl.js');
var _admin = require('../../service/admin-service.js');
var _flight = require('../../service/flight-service.js');
var Pagination = require('../../util/pagination/index.js');
var templateIndex = require("./index.string");
var requestTemplate = require('./request.string');


var page = {

    data:{
        listParam:{
            pageIndex:_fl.getUrlParam('pageIndex')|| 0,
            pageSize:_fl.getUrlParam('pageSize')|| 10
        }
    },

    init: function(){
        this.onload();
        this.bindEvent();
    },
    bindEvent:function () {
        var _this = this;
        $('#listRequests').click(function () {
            $(".tab").html('<tr> <th>申请人</th> <th>详细情况</th> <th>撤销</th> </tr>');
            _this.loadRequestList();
        });
        $(document).on('click','#cancelRequest',function () {
            var id = $('#requestId').html();
            _flight.deleteById(id,function () {
                _fl.successTips("操作成功");
            },function (msg) {
                _fl.errorTips(msg);
            })
        });
        $(document).on('click','#permit',function () {
            var id = $('#volunteerId').html();
            _this.permit(id);
        });
    },
    onload: function(){
        var _this = this;
        this.loadList();
        $("#unchecked").click(function () {
            $(".tab").html( "<tr> <th>姓名</th> <th>ID</th> <th>申请时间</th> <th>是否激活邮箱</th> <th>状态</th> <th>点击同意</th>></tr>");
            _this.loadUncheck();
        });
        $("#all").click(function () {
            window.location.href = './admin.html';
        });
    },
    //显示未通过的
    loadUncheck : function () {
        var _this       = this,
            listHtml    = '';
        // 请求接口
        _admin.listUncheckedVolunteer(0,10, function(res){
            res.content.forEach(function (value) {
                value.createTime = value.createTime.substr(0,10);
               value.permited = (value.status===0);
               value.validate = (value.emailValidate===0);
            });
            listHtml = _fl.renderHtml(templateIndex, {
                list :  res.content
            });
            $(".tab").append(listHtml);
            _this.loadPagination({
                totalPages      : res.totalPages,
                pageNum         : (res.number+1),
                last            : res.last,
                first           : res.first,
            });
        }, function(msg){
            alert(msg);
        });
    },
    // 加载list数据
    loadList : function(pageIndex){
        var _this       = this,
            listHtml    = '';
        // 请求接口
        _admin.listAllVolunteer(pageIndex,10, function(res){
            res.content.forEach(function (value) {
                value.createTime = value.createTime.substr(0,10);
                value.permited = (value.status===0);
                value.validate = (value.emailValidate===0);
            });
            listHtml = _fl.renderHtml(templateIndex, {
                list :  res.content
            });
            $(".tab").append(listHtml);
            _this.loadPagination({
                totalPages      : res.totalPages,
                pageNum         : (res.number+1),
                last            : res.last,
                first           : res.first,
            });
        }, function(msg){
            alert(msg);
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        //对于空对象，先把pageinfo 放进去，再把后面放进去
        this.pagination.render($.extend({}, pageInfo, {
            container : $('#pagination'),
            onSelectPage : function(pageIndex){
                _this.data.listParam.pageIndex = pageIndex;
                _this.loadList(_this.data.listParam.pageIndex);
            }
        }));
    },
    permit : function (id) {
       _admin.permitVolunteer(id,function () {
           _fl.successTips("成功通过");
           window.location.href = './admin.html';
       },function (msg) {
           _fl.errorTips(msg);
       });
    },
    loadRequestList : function (pageIndex) {
        var _this       = this,
            requestHtml    = '';
        // 请求接口
        _flight.listAll(pageIndex,10, function(res){
            requestHtml = _fl.renderHtml(requestTemplate, {
                list :  res.content
            });
            $(".tab").append(requestHtml);
            _this.loadPagination({
                totalPages      : res.totalPages,
                pageNum         : (res.number+1),
                last            : res.last,
                first           : res.first,
            });
        }, function(msg){
            alert(msg);
        });
    }
};

$(function(){
    page.init();
});