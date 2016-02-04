app.factory('tasksList', ['$http', function($http) {
    return $http({
        method: 'POST',
        url: window.location.href + 'rest-api/web/tasks/project-tasks',
        params: {project_id: project_id}
    })
        .success(function(data) {
            console.log(data, 'project_id');
            return data;
        })
        .error(function(err) {
            return err;
        });
}]);