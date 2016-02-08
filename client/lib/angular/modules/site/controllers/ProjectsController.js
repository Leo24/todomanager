app.controller('ProjectsController', ['$scope', 'projects', '$filter', '$http', '$rootScope',
    function($scope, projects, $filter, $http) {
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
                    url: window.location.href + 'rest-api/web/tasks/reorder-tasks',
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
            newTask.taskOrder = parseInt($scope.project.tasks[$scope.project.tasks.length-1].task_order)+1;

            $http({
                method: 'POST',
                url: window.location.href + 'rest-api/web/tasks/create-new-task',
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
                    url: window.location.href + 'rest-api/web/tasks/'+task.id,
                    contentType: 'text/plain; charset=utf-8'
                });

                $event.target.parentElement.parentElement.parentElement.hidden=true;

            } else if ($event.target.className === 'btn btn-primary confirm-task-edit') {

                $http({
                    method: 'POST',
                    url: window.location.href + 'rest-api/web/tasks/update-task',
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




        $scope.completeTask=function(){};


        $scope.addProject=function(){
            var newProject = {};
            if($scope.addProjectForm.projectTitle){
                newProject.taskTitle = $scope.addProjectForm.projectTitle;
                $scope.addProjectForm.projectTitle = '';
            }
            if($scope.addProjectForm.projectDescription){
                newProject.projectDescription= $scope.addProjectForm.projectDescription;
                $scope.addProjectForm.project.Description = '';
            }

            $http({
                method: 'POST',
                url: window.location.href + 'rest-api/web/projects/create-new-project',
                data: {newTask: newProject},
                contentType: 'application/json; charset=utf-8'
            })
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
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


        $scope.today = new Date();


    }]);





