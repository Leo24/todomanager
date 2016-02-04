app.directive('taskInfo', function()
{
    return{
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: 'lib/angular/modules/site/directives/taskInfo.html'
    };
});