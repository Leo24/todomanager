var app = angular.module('ToDoManager', ['dndLists', 'ngMaterial', 'ngRoute', 'angular-md5']);

app.filter('capitalize', function() {
    return function(input, $scope) {
        if (input!=null)
            input = input.toLowerCase();
        return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});

app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/todomanager', {
                    templateUrl: 'lib/angular/modules/site/views/todomanager.html',
                    controller: 'ProjectsController'}).
                when('/login', {
                    templateUrl: 'lib/angular/modules/site/views/login.html',
                    controller: 'LoginController'
                })
                .
                otherwise({
                    redirectTo: '/login'
                });
        }]);

app.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
    $scope.$on('$routeChangeSuccess', function(e, nextRoute){
        if ( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
            $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Auth0 Sample' ;
        }
    });
})

;