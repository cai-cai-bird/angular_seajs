define(function (require, exports, module) {
    require("uiRouter");
    require("clazyload");
    require("ngCookies");

    var myApp = angular.module("myApp",['ui.router',"oc.lazyLoad",'ngCookies']);
    app.config(['$ocLazyLoadProvider',function($ocLazyLoadProvider){
        $ocLazyLoadProvider.config({
            loadedModules: ['monitorApp'],//主模块名,和ng.bootstrap(document, ['monitorApp'])相同
            jsLoader: seajs, //使用requirejs去加载文件
            files: ['modules/summary','modules/appEngine','modules/alarm','modules/database'], //主模块需要的资源，这里主要子模块的声明文件
            debug: true
    });
    }]);
   module.exports = myApp;
});