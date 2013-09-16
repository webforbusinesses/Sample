(function () {

    "use strict";

    var app = angular.module('myApp');

// a service.
    app.factory('Foo', function () {
        return {
            bar: function (msg) {
                //do something here.
            }
        };
    });

// a service that depends on the other service.
    app.factory('MyService', function (Foo) {
        return {
            test: function (msg) {
                Foo.bar(msg);
            }
        };
    });

})();