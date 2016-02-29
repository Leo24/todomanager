app.factory('projects', ['$http', 'localStorageService', '$window', function($http, localStorageService, $window) {

    var service = service || {};


    service.getData = function(userId, callback, failcallback) {
        $http({
            method: 'POST',
            url: window.location.origin + '/rest-api/web/projects/get-project-tasks',
            data: {userId: userId},
            contentType: 'application/json; charset=utf-8'
        })
            .success(function(data) {
                service.tasksForToday(data);
                service.tasksForWeek(data);
                service.getCompletedTasks(data);
                callback(data);
            })
            .error(function(err) {
                if (failcallback) failcallback(err);
            });
    };




    service.tasksForToday=function(data){
        angular.forEach(data, function(project) {
            var due_date;
            var todayTasks=[];
            var today = new Date();
            today.setHours(0,0,0,0);
            angular.forEach(project.tasks, function(value, key) {
                due_date = new Date(value.due_date);
                due_date.setHours(0,0,0,0);
                if (today.getTime() == due_date.getTime()) {
                    todayTasks.push(value)
                }
            }, todayTasks);
            project.todayTasks = todayTasks;
        });
        return data;
    };

    service.tasksForWeek=function(data){
        angular.forEach(data, function(project) {
            var due_date;
            var week = new Date();
            week.setHours(0,0,0,0);
            var numberOfDaysToAdd = 6;
            week.setDate(week.getDate() + numberOfDaysToAdd);
            var weekTasks = [];
            var today = new Date();
            today.setHours(0,0,0,0);
            numberOfDaysToAdd = 1;
            today.setDate(today.getDate() + numberOfDaysToAdd);
            angular.forEach(project.tasks, function(value, key) {
                due_date = new Date(value.due_date);
                due_date.setHours(0,0,0,0);
                if (due_date.getTime() >= today.getTime() && due_date.getTime() <= week ) {
                    weekTasks.push(value)
                }
            }, weekTasks);
            project.weekTasks = weekTasks;
        });
        return data;
    };


    service.getCompletedTasks=function(data){
        angular.forEach(data, function(project) {
            var completedTasks = [];
            var inCompletedTasks = [];
            angular.forEach(project.tasks, function(value, key) {
                if (value.completed == 0) {
                    inCompletedTasks.push(value);
                }else{
                    completedTasks.push(value);
                }
            }, inCompletedTasks, completedTasks);
            project.inCompletedTasks = inCompletedTasks;
            project.completedTasks = completedTasks;

        });
        return data;
    };












    return service;
}]);