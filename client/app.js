var app = angular.module('ToDoManager', ['dndLists', 'ngMaterial']);

app.filter('capitalize', function() {
    return function(input, $scope) {
        if (input!=null)
            input = input.toLowerCase();
        return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});