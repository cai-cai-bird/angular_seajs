define(function (require, exports, module) {
    var myapp=require("../module/module");
    var loginController=require("../controller/login");
    require("../css/style.css");

    myapp.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
        var lazyDeferred;
        /**
         * 路由切换时调用
         * @param param.file 懒加载文件数组
         * @param tpl 子模块view视图
         * @param module 子模块名
         */
        function resovleDep(param,tpl,module){
            var resolves = {
                loadMyCtrl: ['$ocLazyLoad', '$templateCache', '$q', function($ocLazyLoad,$templateCache,$q) {
                    lazyDeferred = $q.defer();
                    return $ocLazyLoad.load({
                        name : module,
                        cache: false,
                        files: param.files
                    }).then(function() {
                        lazyDeferred.resolve($templateCache.get(tpl));
                    });
                }]
        };
            return resolves;
        };
        $urlRouterProvider.otherwise("login");
        $stateProvider
            .state("login", {
                url: "/login",
                templateProvider: function() { return lazyDeferred.promise; },
                controller: 'loginController',
                resolve : resovleDep({files:['controllers/module1Ctrl','services/module1Service','directives/module1Directive']}, './template/login.html', 'myapp.login')
            })
            .state("index", {
                url: "/index",
                templateUrl: "index.html"
            })
            .state("index.Create_Advertiser",{
                url:"Create_Advertiser",
                templateUrl:"view/Create_Advertiser.html"
            })
    }]);

});