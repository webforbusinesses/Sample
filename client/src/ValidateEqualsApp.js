(function () {
    "use strict";
    angular.module('ValidateEqualsApp', []).directive('validateEquals', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelController) {
                var errorMsg = scope.$eval(attrs.errorMsg);
                if(errorMsg){
                    var helpEl = angular.element("<span>").addClass("help-inline ng-hide hide").text(errorMsg);
                    elm.after(helpEl);
                }
                function validateEquals(myValue) {
                    var valid = (myValue === scope.$eval(attrs.validateEquals));
                    ngModelController.$setValidity('equals', valid);
                    if(valid){
                        if(helpEl){
                            helpEl.addClass("ng-hide hide");
                        }
                        return myValue;
                    }else{
                        if(helpEl){
                            helpEl.removeClass("ng-hide hide");
                        }
                        return undefined;
                    }
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