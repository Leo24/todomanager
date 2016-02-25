app.factory('projects', ['$http', 'localStorageService', '$window', function($http, localStorageService, $window) {

    var userId = localStorageService.get('userID');

    return $http({
            method: 'POST',
            url: window.location.origin + '/rest-api/web/projects/get-project-tasks',
            data: {userId: userId},
            contentType: 'application/json; charset=utf-8'
        })
            .success(function(data) {
                return data;
            })
            .error(function(err) {
                return err;
            });
}]);