app.factory('projects', ['$http', 'LocalStorage', function($http, LocalStorage) {
    var userId = LocalStorage.getData();
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