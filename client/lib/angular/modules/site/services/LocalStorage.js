app.factory("LocalStorage", function($window) {
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('my-storage', val);
            return this;
        },
        getData: function() {
            return $window.localStorage && $window.localStorage.getItem('my-storage');
        }
    };
});