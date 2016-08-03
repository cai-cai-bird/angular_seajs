define(function (require, exports, module) {
    var myapp=require("../module/module");
    myapp.controller("login",["$scope",function ($scope) {
        
    }]);
    var login = function($scope,$http){
        $scope.users={
            email:'',
            password:'',
            captcha_image: '',
            captcha_code:'',
            captcha_key: ''
        }
        var $config = {
            headers: {
                login: true
            }
        }
        $scope.get_captcha=function(){
            $http.get('/captcha', config=$config)
                .success(function(data){
                    $scope.users.captcha_image=data.data.captcha.captcha_image;
                    $scope.users.captcha_key=data.data.captcha.captcha_key;
                })
        },

            $scope.login=function(){
                $http.post('/login', $scope.users, $config)
                    .success(function(data){
                        if(data.status){
                            location.href="#/index"
                        }else{
                            $('.err').remove()
                            for (k in data.error_msg) {
                                var v;
                                v = data.error_msg[k];
                                $("#"+k).after('<div class="err" style="color: red">'+v+"</div>")
                            }
                            $scope.get_captcha();
                        }
                    })
            }

        $scope.get_captcha();
    }
    module.exports=login;
});