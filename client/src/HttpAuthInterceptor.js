(function () {
    "use strict";
    var app = angular.module("httpAuthInterceptor", []);
    app.config(function ($httpProvider) {
        var interceptor = function ($rootScope, $q, $injector) {
            var buffer = [];
            var $http;
            function success(response) {
                return response;
            }

            function error(response) {
                if (response.status === 401 && !response.config.ignoreAuthModule) {
                    $rootScope.$broadcast('event:auth-loginRequired');
                    var deferred = $q.defer();
                    buffer.push({'config':response.config, 'deferred':deferred});
                    return deferred.promise;
                }
                // otherwise, default behaviour
                return $q.reject(response);
            }
            function retryHttpRequest(config, deferred) {
                $http = $http || $injector.get('$http');
                $http(config).then(function (response) {
                    deferred.resolve(response);
                }, function(){
                    console.error('retry', config, "failed", arguments);
                });
            }

            function retryAll(){
                for (var i = 0; i < buffer.length; ++i) {
                    retryHttpRequest(buffer[i].config, buffer[i].deferred);
                }
                buffer = [];
            }

            $rootScope.$on('event:auth-loginConfirmed', retryAll);

            return function authServiceInterceptor (promise) {
                return promise.then(success, error);
            };
        };
        $httpProvider.responseInterceptors.push(interceptor);
    });


    app.factory('authService', function ($rootScope, httpBuffer) {
        return {
            loginConfirmed: function () {
                $rootScope.$broadcast('event:auth-loginConfirmed');
            }
        }
    });
})();