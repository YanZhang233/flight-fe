
require('./index.css');
var templatePagination  = require('./index.string');
var _fl = require('../fl.js');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 2,
        onSelectPage    : null
    };
    // 事件的处理
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        // 对于active和disabled按钮点击，不做处理
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function' 
            ? _this.option.onSelectPage(($this.data('value'))-1) : null;
    });
};
// 渲染分页组件
Pagination.prototype.render = function(userOption){
    // 合并选项，先把default，放进去再把useroption放进去
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否为合法的jquery对象
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    // 判断是否只有1页
    if(this.option.totalPages <= 1){
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};
// 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
Pagination.prototype.getPaginationHtml = function(){
    var html        = '',
        option      = this.option,
        pageArray   = [],
        start       = option.pageNum - option.pageRange > 0 
            ? option.pageNum - option.pageRange : 1,
        end         = option.pageNum + option.pageRange < option.totalPages
            ? option.pageNum + option.pageRange : option.totalPages;
    // 上一页按钮的数据
    pageArray.push({
        name : '上一页',
        value : (this.option.pageNum-1),
        disabled : (this.option.first===true)
    });
    // 数字按钮的处理
    for(var i = start; i <= end; i++){
        pageArray.push({
            name : i,
            value : i,
            active : (i === option.pageNum)
        });
    };
    // 下一页按钮的数据
    pageArray.push({
        name : '下一页',
        value : (this.option.pageNum+1),
        disabled : (this.option.last===true)
    });
    html = _fl.renderHtml(templatePagination, {
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.totalPages
    });
    return html;
};

module.exports = Pagination;