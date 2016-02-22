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
            $scope.addTaskForm.create_date = $filter('date')($scope.today, "yyyy-MM-dd");;

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

        $scope.myVal = '<button ng-click=\'buttonClick()\'>I\'m button</button>';

        $scope.editTask=function($event, task){
            if ($event.target.className === 'fa fa-trash-o') {
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


        $scope.tasksForToday=function(){

            debugger;
            angular.element(document.getElementsByClassName('todo-list'));

        };

        $scope.getCompletedTasks=function(){

        };

        $scope.getIncompletedTasks=function(){

        };

        $scope.logout=function(){
            LocalStorage.setData(null);
            $window.location.href = '#/login';
        };


    }]);





