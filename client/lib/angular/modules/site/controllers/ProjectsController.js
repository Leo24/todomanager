app.controller('ProjectsController', ['$scope', 'projects', '$filter', '$http', '$rootScope', 'LocalStorage',
    function($scope, projects, $filter, $http, LocalStorage) {
        projects.success(function(data) {
            $scope.projects = data;
            console.log($scope.projects);
            $scope.project = $scope.projects[0];
        });

        $scope.getProjectTasks=function(project_id){
            $scope.submitTasksOrder();
            var projects = $scope.projects;
            $scope.project = $filter('filter')(projects, function (d) {return d.id === project_id;})[0];
        };


        $scope.reorderProjects=function(){
            $scope.reorderedProjects = $scope.projects;
            var newProjectOrder=[];
            angular.forEach($scope.reorderedProjects, function(value, key) {
                newProjectOrder.push({'projectId':value.id, 'projectOrder':key})
            }, newProjectOrder);

            $http({
                method: 'POST',
                url: window.location.origin + '/rest-api/web/projects/reorder-projects',
                data: {newProjectOrder: newProjectOrder},
                contentType: 'application/json; charset=utf-8'
            })
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        };




        $scope.reorderTasks=function(event, index, item, external, type, allowedType){
            $scope.reorderedTasks = $scope.project.tasks;
        };

        $scope.submitTasksOrder=function(){
            if($scope.reorderedTasks !== undefined ){
                var newTaskOrder=[];
                angular.forEach($scope.reorderedTasks, function(value, key) {
                    newTaskOrder.push({'taskId':value.id, 'taskOrder':key})
                }, newTaskOrder);

                $http({
                    method: 'POST',
                    url: window.location.origin + '/rest-api/web/tasks/reorder-tasks',
                    data: {newTaskOrder: newTaskOrder},
                    contentType: 'application/json; charset=utf-8'
                })
                    .success(function(data) {
                        return data;
                    })
                    .error(function(err) {
                        return err;
                    });

            } else {
                return false;
            }

        };

        $scope.addTask=function(){
            var newTask = {};
            angular.element(document.getElementsByClassName('todo-list'))
                .append("<li><span class='handle'>" +
                "<i class='fa fa-ellipsis-v'></i><i class='fa fa-ellipsis-v'></i>" +
                "</span>" +
                "<span class='checker " + $scope.addTaskForm.taskPriority + "-priority' ng-click='completeTask()'></span>" +
                "<span class='text task-title' ng-show='!showTaskDetails'>" + $scope.addTaskForm.taskTitle + "</span>" +
                "<span class='text create-date'  ng-show='!showTaskDetails'>Create Date: " + $scope.today + "</span>" +
                "<span class='text due-date'  ng-show='!showTaskDetails'>Due Date:" + $scope.taskDueDate + "</span>" +
                "<small class='label' ng-class='getClass(info.due_date, info)'><i class='fa fa-clock-o'></i> </small>" +
                "<div class='tools'>" +
                "<i class='fa fa-edit' ng-click='showTaskDetails = !showTaskDetails'></i>" +
                "<i class='fa fa-trash-o' ng-click='editTask(info)'></i>" +
                "</div></li>"
            );

            if($scope.addTaskForm.taskTitle){
                newTask.taskTitle = $scope.addTaskForm.taskTitle;
                $scope.addTaskForm.taskTitle = '';
            }
            if($scope.addTaskForm.taskDescription){
                newTask.taskDescription = $scope.addTaskForm.taskDescription;
                $scope.addTaskForm.taskDescription = '';
            }
            if($scope.addTaskForm.taskPriority){
                newTask.taskPriority = $scope.addTaskForm.taskPriority;
                $scope.addTaskForm.taskPriority = 0;
            }
            if($scope.taskDueDate){
                newTask.taskDueDate = $scope.taskDueDate;
                $scope.taskDueDate = 'Task Due Date';
            }
            if($scope.project.id){
                newTask.projectId = $scope.project.id;
            }

            if(($scope.project.tasks.length-1) == -1){
                newTask.taskOrder = 0;
            }else{
                newTask.taskOrder = parseInt($scope.project.tasks[$scope.project.tasks.length-1].task_order)+1;
            }

            $http({
                method: 'POST',
                url: window.location.origin + '/rest-api/web/tasks/create-new-task',
                data: {newTask: newTask},
                contentType: 'application/json; charset=utf-8'
            })
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });

            $scope.submitTasksOrder();



        };

        $scope.editTask=function($event, task){
            debugger;
            if ($event.target.className === 'fa fa-trash-o') {
                debugger;
                $http({
                    method: 'DELETE',
                    url: window.location.origin + '/rest-api/web/tasks/'+task.id,
                    contentType: 'text/plain; charset=utf-8'
                });

                $event.target.parentElement.parentElement.parentElement.hidden=true;

            } else if ($event.target.className === 'btn btn-primary confirm-task-edit') {

                $http({
                    method: 'POST',
                    url: window.location.origin + '/rest-api/web/tasks/update-task',
                    data: {newTask: task},
                    contentType: 'application/json; charset=utf-8'
                })
                    .success(function(data) {
                        return data;
                    })
                    .error(function(err) {
                        return err;
                    });
            }

        };




        $scope.completeTask=function(){

        };

        $scope.addProject=function(){
            var newProject = {};
            if($scope.addProjectForm.projectTitle){
                newProject.taskTitle = $scope.addProjectForm.projectTitle;
                $scope.addProjectForm.projectTitle = '';
            }
            if($scope.addProjectForm.projectDescription){
                newProject.projectDescription= $scope.addProjectForm.projectDescription;
                $scope.addProjectForm.projectDescription = '';
            }

            $http({
                method: 'POST',
                url: window.location.origin + '/rest-api/web/projects/create-new-project',
                data: {newProject: newProject},
                contentType: 'application/json; charset=utf-8'
            })
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        };

        $scope.editProject=function(project){
            $http({
                method: 'POST',
                url: window.location.origin + '/rest-api/web/projects/update-project',
                data: {project: project},
                contentType: 'application/json; charset=utf-8'
            })
                .success(function(data) {
                    debugger;
                    return data;
                })
                .error(function(err) {
                    return err;
                });

        };


        $scope.removeProject=function($event, project){

            $http({
                method: 'DELETE',
                url: window.location.origin + '/rest-api/web/projects/'+project.id,
                contentType: 'text/plain; charset=utf-8'
            });

            $event.target.parentElement.parentElement.parentElement.hidden=true;
        };


        $scope.clearTaskForm=function(){
            $scope.addTaskForm.taskTitle = '';
            $scope.addTaskForm.taskDescription = '';
            $scope.addTaskForm.taskPriority = 0;
            $scope.taskDueDate = 'Task Due Date';
        };

        $scope.clearProjectForm=function(){
            $scope.addProjectForm.projectTitle= '';
            $scope.addProjectForm.projectDescription = '';
        };


        //$scope.today = new Date();
        $scope.today = $filter('date')(new Date(), "yyyy-MM-dd");


        $scope.predicate = '';
        $scope.reverse = false;
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : true;
            $scope.predicate = predicate;
        };

        $scope.logout=function(){
            LocalStorage.setData(null);
            $window.location.href = '#/login';
        };


    }]);





