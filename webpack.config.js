var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
// 环境变量配置，dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig     = function (name) {
    return{
        template:'./src/view/'+ name +'.html',
        filename:"view/"+ name +".html",
        inject : true,
        hash : true,
        chunks: ['common',name]
    };
};

var config = {
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index'  : ['./src/page/index/index.js'],
        'entry'  : ['./src/page/entry/index.js'],
        'logIn'  : ['./src/page/login/index.js'],
        'signUp' : ['./src/page/signup/index.js'],
        'studentInfo' : ['./src/page/studentInfo/index.js'],
        'studentMatch' : ['./src/page/studentMatch/index.js'],
        'request' : ['./src/page/request/index.js'],
        'changePwd' : ['./src/page/changePwd/index.js'],
        'requestList' : ['./src/page/requestList/index.js'],
        'validateEmail' : ['./src/page/validateEmail/index.js'],
        'signUpAsVolunteer' : ['./src/page/signUpAsVolunteer/index.js'],
        'admin' : ['./src/page/admin/index.js'],
        'studentDetail' : ['./src/page/studentDetail/index.js'],
        'requestDetail' : ['./src/page/requestDetail/index.js'],
    },
    output:{
        path:'./dist/',
        publicPath: '/dist/',
        filename: 'js/[name].js'
    },

    module:{
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },

    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },

    plugins:[
        new webpack.optimize.CommonsChunkPlugin ({
            name:'common',
            filename:'js/base.js'
        }),
        //导入css
        new ExtractTextPlugin("css/[name].css"),
        //导入html
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('entry')),
        new HtmlWebpackPlugin(getHtmlConfig('logIn')),
        new HtmlWebpackPlugin(getHtmlConfig('signUp')),
        new HtmlWebpackPlugin(getHtmlConfig('studentInfo')),
        new HtmlWebpackPlugin(getHtmlConfig('studentMatch')),
        new HtmlWebpackPlugin(getHtmlConfig('request')),
        new HtmlWebpackPlugin(getHtmlConfig('changePwd')),
        new HtmlWebpackPlugin(getHtmlConfig('requestList')),
        new HtmlWebpackPlugin(getHtmlConfig('validateEmail')),
        new HtmlWebpackPlugin(getHtmlConfig('signUpAsVolunteer')),
        new HtmlWebpackPlugin(getHtmlConfig('admin')),
        new HtmlWebpackPlugin(getHtmlConfig('studentDetail')),
        new HtmlWebpackPlugin(getHtmlConfig('requestDetail')),
    ]
}

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}


module.exports = config;