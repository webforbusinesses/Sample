var extend;
var polyMethod;
var wrap;

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
            var args = Array.prototype.slice.call(arguments);
            if (fn.length === arguments.length) {
                return fn.apply(obj, args);
            } else if (old && typeof old === 'function') {
                return old.apply(obj, args);
            } else {
                throw "polyMethod: no option for " + prop + "/" + arguments.length + " [" + args + "]";
            }
        };
    };
    Function.prototype.bind = function bind(obj) {
        var fn = this;
        return function () {
            return fn.apply(obj, Array.prototype.slice.call(arguments));
        };
    };

    wrap = function wrap(obj, prop, fn) {
        var old = obj[prop];
        return obj[prop] = function () {
            return fn.apply(this, [old.bind(this)].concat(Array.prototype.slice.call(arguments)));
        };
    };
})();

