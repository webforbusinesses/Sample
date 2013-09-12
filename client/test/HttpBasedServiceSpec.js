"use strict";

describe('HttpBasedService tests', function () {
    var svc,
        httpBackend;

    beforeEach(function (){
        //load the module.
        module('myApp');

        //get your service, also get $httpBackend
        //$httpBackend will be a mock, thanks to angular-mocks.js
        inject(function($httpBackend, HttpBasedService) {
            svc = HttpBasedService;
            httpBackend = $httpBackend;
        });
    });

    //make sure no expectations were missed in your tests.
    //(e.g. expectGET or expectPOST)
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should send the msg and return the response.', function (){
        //set up some data for the http call to return and test later.
        var returnData = { excited: true };

        //expectGET to make sure this is called once.
        httpBackend.expectGET('somthing.json?msg=wee').respond(returnData);

        //create an object with a functio to spy on.
        var test = {
            handler: function() {}
        };

        //set up a spy for the callback handler.
        spyOn(test, 'handler');

        //make the call.
        var returnedPromise = svc.sendMessage('wee');

        //use the handler you're spying on to handle the resolution of the promise.
        returnedPromise.then(test.handler);

        //flush the backend to "execute" the request to do the expectedGET assertion.
        httpBackend.flush();

        //check your spy to see if it's been called with the returned value.
        expect(test.handler).toHaveBeenCalledWith(returnData);
    });
});