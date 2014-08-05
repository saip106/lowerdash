'use strict'

;(function () {

    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    var _ = function () {};

    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `_` as a global object.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    //removed falsey values from an array
    _.compact = function (array) {
        var result = [];
        for(var i = 0; i < array.length; i++) {
            if (array[i]) {
                result[result.length] = array[i];
            }
        }
        return result;
    };

    //IE8 and older do not contain indexOf hence this
    var indexOf = function(needle) {
        if(typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function(needle) {
                var index = -1;

                for(var i = 0; i < this.length; i++) {
                    if(this[i] === needle) {
                        index = i;
                        break;
                    }
                }

                return index;
            };
        }
        return indexOf.call(this, needle);
    };

	//removed values from the given array that match ===
    _.difference = function (array) {
        var result = [];

        //arguments looks like an array but is not one except for the length property,
        //hence we are converting it to array here
        var args = Array.prototype.slice.call(arguments);
        var valuesToBeRemoved = args.splice(1);
        for(var i = 0; i < array.length; i++) {
            if (indexOf.call(valuesToBeRemoved, array[i]) === -1) {
                result[result.length] = array[i];
            }
        }
        return result;
    };

	//similar to find but instead returns the index of the last match
    _.findIndex = function (array, secondArgument) {

        if (typeof secondArgument === 'function') {
            for (var i = 0; i < array.length; i++) {
                if (secondArgument(array[i])) {
                    return i;
                }
            }
        }
        else if (typeof secondArgument === 'object') {
            for (var i = 0; i < array.length; i++) {
                var isValidForAllProperties = false;
                for (var property in secondArgument) {
                    if (secondArgument.hasOwnProperty(property) && array[i][property] === secondArgument[property]) {
                        isValidForAllProperties = true
                    }
                    else {
                        isValidForAllProperties = false;
                        break;
                    }
                }
                if (isValidForAllProperties) {
                    return i;
                }
            }
        }
        else if (typeof secondArgument === 'string') {
            for (var i = 0; i < array.length; i++) {
                if (array[i][secondArgument]) {
                    return i;
                }
            }
        }
        return -1;
    };

    //similar to find but instead returns the index of the first match
    _.findLastIndex = function (array, secondArgument) {

        if (typeof secondArgument === 'function') {
            for (var i = array.length - 1; i >= 0; i--) {
                if (secondArgument(array[i])) {
                    return i;
                }
            }
        }
        else if (typeof secondArgument === 'object') {
            for (var i = array.length - 1; i >= 0; i--) {
                var isValidForAllProperties = false;
                for (var property in secondArgument) {
                    if (secondArgument.hasOwnProperty(property) && array[i][property] === secondArgument[property]) {
                        isValidForAllProperties = true
                    }
                    else {
                        isValidForAllProperties = false;
                        break;
                    }
                }
                if (isValidForAllProperties) {
                    return i;
                }
            }
        }
        else if (typeof secondArgument === 'string') {
            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i][secondArgument]) {
                    return i;
                }
            }
        }
        return -1;
    };

    _.first = function (array, secondArgument) {

        if (secondArgument === undefined) {
            if (array.length > 0) {
                return array[0];
            }
        }
        else if (typeof secondArgument === 'number') {
            var result = [];
            if (array.length > 0) {
                for (var j = 0; j < secondArgument; j++) {
                    if (array.length > j)
                    result.push(array[j]);
                }
                return result;
            }
        }
        else if (typeof secondArgument === 'function') {
            var result = [];
            for (var i = 0; i < array.length; i++) {
                if (secondArgument(array[i])) {
                    result.push(array[i]);
                }
                else {
                    return result;
                }
            }
            return result;
        }
        else if (typeof secondArgument === 'string') {
            for (var i = 0; i < array.length; i++) {
                if (array[i][secondArgument] === true) {
                    return array[i];
                }
            }
        }
        else if (typeof secondArgument === 'object') {
            for (var i = 0; i < array.length; i++) {
                var isAMatch = true;
                for (var key in secondArgument) {
                    if (array[i][key] !== secondArgument[key]) {
                        isAMatch = false;
                    }
                }
                if (isAMatch) {
                    return array[i];
                }
            }
        }
    };

    _.flatten = function (array, secondArgument) {

        var result = [];
        if (typeof secondArgument === 'string') {
            var pluckedArray = _.pluck(array, secondArgument);
            for(var i = 0; i < pluckedArray.length; i++) {
                recursiveFlatten(pluckedArray[i], result, false);
            }
            return result;
        }
        else {
            var shouldDoShallowFlattening = secondArgument || false;
            for(var i = 0; i < array.length; i++) {
                recursiveFlatten(array[i], result, shouldDoShallowFlattening);
            }
            return result;
        }
    }

    _.pluck = function(array, property) {
        var result = [];
        for(var i = 0; i < array.length; i++) {
            if(_.has(array[i], property)) {
                result.push(array[i][property]);
            }
        }
        return result;
    }

    _.has = function(object, key) {
        if(object !== null && object !== undefined) {
            return object.hasOwnProperty(key);
        }
        return false;
    }

    _.indexOf = function (array, element) {
        for(var i = 0; i < array.length; i++) {
            if(array[i] === element) {
                return i;
            }
        }
        return -1;
    }

    function recursiveFlatten (element, result, shouldDoShallowFlattening) {
        if(Array.isArray(element)) {
            for(var j = 0; j < element.length; j++) {
                if(shouldDoShallowFlattening) {
                    result.push(element[j]);
                }
                else {
                    recursiveFlatten(element[j], result);
                }
            }
        }
        else {
            result.push(element);
        }
    }

    // AMD registration happens at the end for compatibility with AMD loaders
    // that may not enforce next-turn semantics on modules. Even though general
    // practice for AMD registration is to be anonymous, underscore registers
    // as a named module because, like jQuery, it is a base library that is
    // popular enough to be bundled in a third party lib, but not be part of
    // an AMD load request. Those cases could generate an error when an
    // anonymous define() is called outside of a loader request.
    if (typeof define === 'function' && define.amd) {
        define('lowerdash', [], function() {
            return _;
        });
    }

}).call(this);