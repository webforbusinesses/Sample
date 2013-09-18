var extend;
var polyMethod;

(function () {
    "use strict";
    extend = function extend() {
        var first = arguments[0];
        for (var i = 1; i < arguments.length; ++i) {
            var currentObj = arguments[i];
            for (var prop in currentObj) {
                if (currentObj.hasOwnProperty(prop)) {
                    first[prop] = currentObj[prop];
                }
            }
        }
        return first;
    };
    polyMethod = function polyMethod(obj, prop, fn) {
        var old = obj[prop];
        return obj[prop] = function () {
            var args = Array.prototype.slice.call(arguments, 0);
            if (fn.length === arguments.length) {
                return fn.apply(obj, args);
            } else if (old && typeof old === 'function') {
                return old.apply(obj, args);
            } else {
                throw "polyMethod: no option for " + prop + "/" + arguments.length + " [" + args + "]";
            }
        };
    };
})();

