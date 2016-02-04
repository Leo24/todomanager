app.controller('TasksController',  ['$scope', '$http',function($scope, $http) {


        //tasksList.success(function(data) {
        //    $scope.tasksList = data;
        //    console.log($scope.tasksList);
        //});

    $scope.getTasksList=function(project_id) {
        $http({
            method: 'POST',
            url: window.location.href + 'rest-api/web/tasks/project-tasks',
            data: {project_id: project_id}
        })
            .success(function(data) {
                console.log(data);
                return data;
            })
            .error(function(err) {
                return err;
            });






    }


}]);
