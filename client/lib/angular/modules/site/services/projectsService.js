app.factory('projects', ['$http', function($http) {
    return $http.get(window.location.href + 'rest-api/web/projects/get-project-tasks')
        .success(function(data) {
            return data;
        })
        .error(function(err) {
            return err;
        });
}]);