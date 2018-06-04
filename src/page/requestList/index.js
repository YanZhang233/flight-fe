require('./index.css');
var _fl = require('../../util/fl.js');
var _flight = require('../../service/flight-service.js');
var Pagination = require('../../util/pagination/index.js');
var templateIndex = require("./index.string");


var page = {

    data:{
        listParam:{
            pageIndex:_fl.getUrlParam('pageIndex')|| 0,
            pageSize:_fl.getUrlParam('pageSize')|| 10
        }
    },

    init: function(){
        this.onload();
    },
    onload: function(){
        this.loadList();
    },
    // 加载list数据
    loadList : function(pageIndex){
        var _this       = this,
            listHtml    = '';
        // 请求接口
        _flight.listAll(pageIndex,10, function(res){
            res.content.forEach(function (element) {
                element.isTaken = (element.status===1);
            });
            listHtml = _fl.renderHtml(templateIndex, {
                list :  res.content
            });
            $(".tab").html(" <tr> <th>姓名</th> <th>到达机场</th> <th>目的地</th> <th>航班号</th> <th>到达时间</th>  <th>是否匹配</th> <th>点击获取</th> </tr>");
            $(".tab").append(listHtml);
            _this.loadPagination({
                totalPages      : res.totalPages,
                pageNum         : (res.number+1),
                last            : res.last,
                first           : res.first,
            });
        }, function(msg){
            _fl.errorTips(msg);
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
    }
};

$(function(){
    page.init();
})