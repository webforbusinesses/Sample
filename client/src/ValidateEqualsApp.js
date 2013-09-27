(function () {
    "use strict";
    angular.module('ValidateEqualsApp', []).directive('validateEquals', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelController) {
                function validateEquals(myValue) {
                    var valid = (myValue === scope.$eval(attrs.validateEquals));
                    ngModelController.$setValidity('equals', valid);
                    return valid ? myValue : undefined;
                }

                ngModelController.$parsers.push(validateEquals);
                ngModelController.$formatters.push(validateEquals);

                scope.$watch(attrs.validateEquals, function () {
                    ngModelController.$setViewValue(ngModelController.$viewValue);
                });
            }
        };
    });
})();