(function () {
    "use strict";

    describe('BasicService tests', function () {
        var basicSvc;

        //excuted before each "it" is run.
        beforeEach(function () {

            //load the module.
            module('myApp');

            //inject your service for testing.
            inject(function (BasicService) {
                basicSvc = BasicService;
            });
        });

        //check to see if it has the expected function
        it('should have an exciteText function', function () {
            expect(angular.isFunction(basicSvc.exciteText)).toBe(true);
        });

        //check to see if it does what it's supposed to do.
        it('should make text exciting', function () {
            var result = basicSvc.exciteText('bar');
            expect(result).toBe('bar!!!');
        });
    });
})();
