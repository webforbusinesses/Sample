(function () {

    "use strict";

    var app = angular.module('myApp');

    app.factory('HttpBasedService', function ($http) {
        return {
            sendMessage: function (msg) {
                return $http.get('somthing.json?msg=' + msg)
                    .then(function (result) {
                        return result.data;
                    });
            }
        };
    });

})();