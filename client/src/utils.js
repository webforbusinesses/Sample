var extend;
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
})();

