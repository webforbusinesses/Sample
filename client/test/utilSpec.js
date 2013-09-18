(function () {
    "use strict";
    describe("extend tests", function () {
        it("extend one object no override", function () {
            var empty = {};
            var obj = {'prop' : 'value'};
            var result = extend(empty, obj);
            expect(result).toBe(empty);
            expect(result).toEqual(obj);
        });
        it("extend one object with override", function () {
            var empty = {'prop' : 1};
            var obj = {'prop' : 'value'};
            var result = extend(empty, obj);
            expect(result).toBe(empty);
            expect(result).toEqual(obj);
        });
        it("extend 2 object no override", function () {
            var empty = {'prop' : 1};
            var obj1 = {'prop1' : 'value1'};
            var obj2 = {'prop2' : 'value2'};
            var result = extend(empty, obj1, obj2);
            expect(result).toBe(empty);
            expect(result.prop1).toEqual('value1');
            expect(result.prop2).toEqual('value2');
            expect(result.prop).toEqual(1);
        });
        it("extend 2 object with override", function () {
            var empty = {'prop' : 1};
            var obj1 = {'prop' : 'value1'};
            var obj2 = {'prop' : 'value2'};
            var result = extend(empty, obj1, obj2);
            expect(result).toBe(empty);
            expect(result).toEqual(obj2);
        });
    });
    describe("polymorphic tests", function(){
        /*
         * Instead of writing polymorphic methods with big switch like that:
         * foo.method = function(){
         *     switch(arguments.length){
         *          case 0:
         *              code for 0 arguments
         *              break;
         *           case 1:
         *              code for 1 arguments
         *              break;
         *           default:
         *              throw "error"
         *  }
         *  we prefer to write:
         *  polyMethod(foo, 'method', function(){ code for 0 arguments});
         *  polyMethod(foo, 'method', function(arg1){ code for 1 arguments});
         */
        it("polymorphicMethod ", function(){
            var obj = {};
            //noinspection JSUnusedLocalSymbols
            polyMethod(obj, 'argsLength', function argsLength2 (arg1, arg2) { return 2; });
            //noinspection JSUnusedLocalSymbols
            polyMethod(obj, 'argsLength', function argsLength1 (arg){ return 1; });
            polyMethod(obj, 'argsLength', function argsLength0 (){ return 0; });
            expect(obj.argsLength()).toEqual(0);
            expect(obj.argsLength(1)).toEqual(1);
            expect(obj.argsLength(1, 2)).toEqual(2);
            expect(function(){
                obj.argsLength(1, 2, 3);
            }).toThrow();
        });
    });
    describe("bind tests", function(){
        it("should bind", function(){
            function foo(){
                /*jshint validthis: true */
                return this;
            }
            var obj1 = {'foo': foo};
            var obj2 = {'foo': foo};
            expect(foo()).toBeUndefined();
            expect(obj1.foo()).toBe(obj1);
            expect(obj2.foo()).toBe(obj2);
            var bound = foo.bind(obj1);
            expect(bound()).toBe(obj1);
            obj2.bound = bound;
            expect(obj2.bound()).toBe(obj1);
        });
    });
    describe("wrap tests", function(){
        it("wrap identity over numbers", function(){
            var obj = {'fn' : function( n ){ return n; }};
            var wrapped = wrap(obj, 'fn', function(orig, n){ return n < 0 ? -n : orig(n);});
            expect(wrapped(-1)).toEqual(1);
            expect(wrapped(2)).toEqual(2);
            expect(obj.fn(-1)).toEqual(1);
            expect(obj.fn(2)).toEqual(2);
        });
    });
})();
