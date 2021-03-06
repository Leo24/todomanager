app.directive('taskInfo', function()
{
    return{
        restrict: 'E',
        scope: {
            info: '=',
            today: '@',
            getClass: '&'
        },

        templateUrl: 'lib/angular/modules/site/directives/taskInfo.html',
        controller: function($scope, $http){

            $scope.completeTask=function(info){
                var task = info;
                $http({
                    method: 'POST',
                    url: window.location.origin + '/rest-api/web/tasks/update-task',
                    data: {newTask: task},
                    contentType: 'application/json; charset=utf-8'
                })
                    .success(function(data) {
                        console.log(data);
                        return data;
                    })
                    .error(function(err) {
                        return err;
                    });

            };

        },
        link: function(scope, element, attrs, $http) {
            scope.getClass =  function(due_date, task) {
                var end_date, today, days_left;
                end_date = new Date(due_date);
                today = new Date();
                days_left = end_date.getTime() - today.getTime();
                days_left = Math.floor(days_left / 86400000);
                task.days_left = days_left;
                if (days_left > 30) {
                    return 'label-default';
                } else if (days_left >= 20) {
                    return 'label-success';
                } else if (days_left >= 10) {
                    return 'label-primary';
                } else if (days_left  >= 5) {
                    return 'label-info';
                } else if (days_left  >= 3) {
                    return 'label-warning';
                } else if (days_left >= 1) {
                    return 'label-danger';
                } else if (days_left <= 0) {
                    return 'label-danger';
                }
            };
        }
    };

});