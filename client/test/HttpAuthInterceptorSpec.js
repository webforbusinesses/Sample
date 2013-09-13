"use strict";

describe('HttpAuthInterceptor tests', function () {
    var http;
    var rootScope;
    var authorized = false;

    function httpBackEndConfigure($httpBackend) {

        $httpBackend.whenPOST('auth/login').respond(function (method, url, data) {
            authorized = true;
            console.info("authorized = true");
            return [200];
        });
        $httpBackend.whenPOST('auth/logout').respond(function (method, url, data) {
            authorized = false;
            return [200];
        });

        $httpBackend.whenGET('data/public').respond(function (method, url, data) {
            return [200, 'I have received and processed your data [' + data + '].'];
        });
        $httpBackend.whenGET('data/protected').respond(function (method, url, data) {
            return authorized ? [200, 'This is confidential [' + data + '].'] : [401];
        });

        //otherwise

        $httpBackend.whenGET(/.*/).passThrough();
    }

    angular.module('httpAuthInterceptor')
        .config(function ($provide) {
            $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
        })
        .run(httpBackEndConfigure);


    var userService = angular.module('userService', ['httpAuthInterceptor']);
    userService.factory('http', function ($http, $rootScope) {
        rootScope = $rootScope;
        return $http;
    });

    beforeEach(function () {
        var $injector = angular.injector(['ng', 'userService']);
        http = $injector.get('http'); // load the service and get http;
//        authService = $injector.get('authService'); // load the service and get http;
    });


    it("a dummy test", function () {
        var flag;
        console.info("about to get data");
        runs(function () {
            flag = false;
            http.get('data/public').then(function () {
                console.info("get data/public returns", arguments);
                flag = true;
            });

        });
        waitsFor(function () {
            return flag;
        }, "should get the data", 1000);

        rootScope.$apply(function () {
            rootScope.$on('event:auth-loginRequired', function () {
                console.log("event:auth-loginRequired", arguments);
            });
        });

        var good = "no";
        runs(function () {
            http.get('data/protected').then(function () {
                console.info("******* get data/protected returns");
                good = "yes";
            });
        });

        runs(function () {
            flag = false;
            http.post('auth/login').then(function () {
                console.info('login confirmed');
                rootScope.$broadcast('event:auth-loginConfirmed');
                flag = true;
            });
        });

        waitsFor(function () {
            return flag;
        }, "should login", 1000);

        waitsFor(function(){
            return good == "yes";
        }, "should return the original protected data", 1000);


    });
});