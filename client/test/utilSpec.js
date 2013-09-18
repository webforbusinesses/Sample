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
})();
