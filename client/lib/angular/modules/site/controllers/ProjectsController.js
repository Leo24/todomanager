app.controller('ProjectsController', ['$scope', 'projects', function($scope, projects) {
    projects.success(function(data) {
        $scope.projects = data;
        console.log($scope.projects);
    });
}]);

