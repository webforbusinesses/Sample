"use strict";

describe('testing some service', function (){
    var svc,
        mockFooSvc;

    beforeEach(function (){
        //load our module
        //BUT also provide a mock $foo!
        module('myApp', function($provide) {

            //create the mock
            mockFooSvc = {
                bar: function (){}
            };

            //add a spy so you can see if bar was called.
            spyOn(mockFooSvc, 'bar');

            //provide the mock!
            $provide.value('Foo', mockFooSvc);
        });

        //now we inject the service we're testing.
        inject(function(MyService) {
            svc = MyService;
        });
    });

    it('should call $foo.bar on $myService.test passing through parameters.', function (){
        //make the call.
        svc.test('WEE!');

        //check our spy to see if bar was called properly.
        expect(mockFooSvc.bar).toHaveBeenCalledWith('WEE!');
    });
});