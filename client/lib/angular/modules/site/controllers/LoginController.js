app.controller('LoginController', ['$scope', '$http', 'md5', '$window', '$rootScope', 'LocalStorage',
    function($scope, $http, md5, $window, $rootScope, LocalStorage) {
    $scope.init = function(){



    };


    $scope.login = function(isValid){

        $scope.loginForm;
        var user = {};

        if($scope.loginForm.username){
            user.username = $scope.loginForm.username.$modelValue;
        }
        if($scope.loginForm.password){
            user.password = md5.createHash($scope.loginForm.password.$modelValue || '');
        }

        $http({
            method: 'POST',
            url: window.location.origin + '/rest-api/web/user/check-user',
            data: {userData: user},
            contentType: 'application/json; charset=utf-8'
        })
            .success(function(user) {
                if(user !== 'Login incorrect'){
                    LocalStorage.setData(user.id);
                    $window.location.href = '#/todomanager';

                } else if(user == 'Login incorrect'){
                    console.log('Login incorrect');
                }
            })
            .error(function(err) {
                if(err) {
                    console.log(err.message);
                }
            });

    };

    $scope.create = function(isValid){

        var newUser = {};

        if($scope.createAccount.username){
            newUser.username = $scope.createAccount.username.$modelValue;
        }
        if($scope.createAccount.email){
            newUser.email = $scope.createAccount.email.$modelValue;
        }
        if($scope.createAccount.password){
            newUser.password = md5.createHash($scope.createAccount.password.$modelValue || '');
        }



        $http({
            method: 'POST',
            url: window.location.origin + '/rest-api/web/user/create-user',
            data: {newUserData: newUser},
            contentType: 'application/json; charset=utf-8'
        })
            .success(function(user) {
                if(user === 'User with such username already exists. Please choose another username.'){
                    $scope.createAccount.username = null;
                    $scope.createAccount.email = null;
                    $scope.createAccount.password = null;
                    alert(user);
                } else if(user !== 'User create failed'){
                    $rootScope.userId = user.id;
                    $rootScope.username = user.username;
                    $window.location.href = '#/todomanager';
                } else {
                    console.log('User create failed');
                }
            })
            .error(function(err) {
                debugger;
                if(err) {
                    console.log(err.message);
                }
            });
    };

}]);