(function () {
    "use strict";

    describe('Test the validate equal directive it is used when user wish to change its login', function () {

        var $scope;
        var element;
        var modelValue;
        var modelController;

        var form = "<form name='testForm'><input name='testInput' ng-model='model.value' data-validate-equals='model.compareTo'></form>";

        beforeEach(function () {
            //load the module.
            module('ValidateEqualsApp');

            //inject your service for testing.
            inject(function ($compile, $rootScope) {
                $scope = $rootScope.$new();
                var linkFn = $compile(form);
                element = linkFn($scope);

                modelValue = $scope.model = {};
                modelController = $scope.testForm.testInput;
            });
        });
        describe('model value changed', function () {
            it('should be invalid if the model changes', function () {
                modelValue.value = 'different';
                modelValue.compareTo = '';
                $scope.$digest();
                expect(modelController.$valid).toBeFalsy();
                expect(modelController.$viewValue).toBeUndefined();
            });
            it('should be invalid if the reference value changes', function () {
                modelValue.compareTo = 'different';
                $scope.$digest();
                expect(modelController.$valid).toBeFalsy();
                expect(modelController.$viewValue).toBeUndefined();
            });
            it('should be valid if the reference and the value are euqals', function () {
                modelValue.compareTo = 'different';
                modelValue.value = 'different';
                $scope.$digest();
                expect(modelController.$valid).toBeTruthy();
                expect(modelController.$viewValue).toEqual(modelValue.value);
            });
            it('should be valid if the value become become equals to the reference', function () {
                modelValue.compareTo = 'different';
                $scope.$digest();
                modelValue.value = 'different';
                $scope.$digest();
                expect(modelController.$valid).toBeTruthy();
                expect(modelController.$viewValue).toEqual(modelValue.value);
            });
        });
    });
})();
