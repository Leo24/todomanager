app.controller('ProjectsController', ['$scope', 'projects', '$filter', '$http', 'localStorageService', '$window',
    function($scope, projects, $filter, $http, localStorageService, $window) {
        if (localStorageService.isSupported) {
            if (localStorageService.get('userID')) {
                var userId = localStorageService.get('userID');



                projects.getData(userId, function(data) {
                    $scope.projects = data;
                    console.log($scope.projects);
                    $scope.project = $scope.projects[0];
                    $scope.project.defaultTasks = $scope.project.tasks;
                }, function(error) {
                    console.log(error);
                });




        //projects.success(function(data) {
        //    $scope.projects = data;
        //    console.log($scope.projects);
        //    $scope.project = $scope.projects[0];
        //});

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
            $scope.addTaskForm.create_date = $filter('date')($scope.today, "yyyy-MM-dd");

            $scope.project.tasks.push($scope.addTaskForm);
            var newTask = {};

            if($scope.addTaskForm.title){
                newTask.taskTitle = $scope.addTaskForm.title;
            }
            if($scope.addTaskForm.description){
                newTask.taskDescription = $scope.addTaskForm.description;
            }
            if($scope.addTaskForm.priority){
                newTask.taskPriority = $scope.addTaskForm.priority;
            }
            if($scope.addTaskForm.due_date){
                newTask.taskDueDate = $scope.addTaskForm.due_date;
            }
            if($scope.project.id){
                newTask.projectId = $scope.project.id;
            }

            $scope.addTaskForm = {};

            if(($scope.project.tasks.length-1) == -1){
                newTask.taskOrder = 0;
            }else{
                newTask.taskOrder = $scope.project.tasks.length;
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
            if ($event.target.className === 'fa fa-trash-o') {
                $http({
                    method: 'DELETE',
                    url: window.location.origin + '/rest-api/web/tasks/'+task.id,
                    contentType: 'text/plain; charset=utf-8'
                });

                var newProjectTasks = [];
                angular.forEach($scope.project.tasks, function(value, key) {
                    if(value.id !== task.id){
                        newProjectTasks.push(value);
                    }
                }, newProjectTasks);
                $scope.project.tasks = newProjectTasks;

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

        $scope.addProject=function(){
            var newProject = {};
            if($scope.addProjectForm.title){
                newProject.projectTitle = $scope.addProjectForm.title;
            }
            if($scope.addProjectForm.description){
                newProject.projectDescription= $scope.addProjectForm.description;
            }

            newProject.userId = localStorageService.get('userID');
            newProject.projectOrder = $scope.projects.length+1;

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
            $scope.projects.push($scope.addProjectForm);
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
        $scope.removeProject=function(project){

            $http({
                method: 'DELETE',
                url: window.location.origin + '/rest-api/web/projects/'+project.id,
                contentType: 'text/plain; charset=utf-8'
            });

            var newProjects = [];
            angular.forEach($scope.projects, function(value, key) {
                if(value.id !== project.id){
                    newProjects.push(value);
                }
            }, newProjects);
            $scope.projects = newProjects;

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


        $scope.today = $filter('date')(new Date(), "yyyy-MM-dd");


        $scope.predicate = '';
        $scope.reverse = false;
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : true;
            $scope.predicate = predicate;
            $scope.project.tasks = $scope.project.defaultTasks;

        };


        $scope.tasksForToday=function(){
            $scope.project.tasks = $scope.project.todayTasks;
        };

        $scope.tasksForWeek=function(){
            $scope.project.tasks = $scope.project.weekTasks;
        };

        $scope.getCompletedTasks=function(){
            $scope.project.tasks = $scope.project.completedTasks;
        };

        $scope.getIncompletedTasks=function(){
            $scope.project.tasks = $scope.project.inCompletedTasks;
        };

        $scope.logout=function(){
            if(localStorageService.isSupported) {
                localStorageService.remove('userID');
            }
            $window.location.href = '#/login';
        };


            } else {
                $window.location.href = '#/login';
                return false;
            }
        }


    }]);





