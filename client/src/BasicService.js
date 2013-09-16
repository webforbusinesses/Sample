(function () {
    "use strict";
    var app = angular.module('myApp');

    app.factory('BasicService', function () {
        return {
            exciteText: function (msg) {
                return msg + '!!!';
            }
        };
    });
})();