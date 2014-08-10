/*jslint node: true */
/*global define*/

(function () {
    'use strict';

    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    var __ = function () {};

    // Export the Underscore object for **Node.js**, with backwards-compatibility for the old `require()` API.
    // If we're in the browser, add `__` as a global object.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = __;
        }
        exports.__ = __;
    }
    else {
        root.__ = __;
    }

    //removed falsey values from an array
    __.compact = function (array) {
        var result = [];
        for(var i = 0; i < array.length; i++) {
            if (array[i]) {
                result[result.length] = array[i];
            }
        }
        return result;
    };

    //removed values from the given array that match ===
    __.difference = function (array) {
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
    __.findIndex = function (array, secondArgument) {

        if (typeof secondArgument === 'function') {
            for (var i = 0; i < array.length; i++) {
                if (secondArgument(array[i])) {
                    return i;
                }
            }
        }
        else if (typeof secondArgument === 'object') {
            for (var j = 0; j < array.length; j++) {
                var isValidForAllProperties = false;
                for (var property in secondArgument) {
                    if (secondArgument.hasOwnProperty(property) && array[j][property] === secondArgument[property]) {
                        isValidForAllProperties = true;
                    }
                    else {
                        isValidForAllProperties = false;
                        break;
                    }
                }
                if (isValidForAllProperties) {
                    return j;
                }
            }
        }
        else if (typeof secondArgument === 'string') {
            for (var k = 0; k < array.length; k++) {
                if (array[k][secondArgument]) {
                    return k;
                }
            }
        }
        return -1;
    };

    //similar to find but instead returns the index of the first match
    __.findLastIndex = function (array, secondArgument) {

        if (typeof secondArgument === 'function') {
            for (var i = array.length - 1; i >= 0; i--) {
                if (secondArgument(array[i])) {
                    return i;
                }
            }
        }
        else if (typeof secondArgument === 'object') {
            for (var j = array.length - 1; j >= 0; j--) {
                var isValidForAllProperties = false;
                for (var property in secondArgument) {
                    if (secondArgument.hasOwnProperty(property) && array[j][property] === secondArgument[property]) {
                        isValidForAllProperties = true;
                    }
                    else {
                        isValidForAllProperties = false;
                        break;
                    }
                }
                if (isValidForAllProperties) {
                    return j;
                }
            }
        }
        else if (typeof secondArgument === 'string') {
            for (var k = array.length - 1; k >= 0; k--) {
                if (array[k][secondArgument]) {
                    return k;
                }
            }
        }
        return -1;
    };

    __.first = function (array, secondArgument) {

        if (secondArgument === undefined) {
            if (array.length > 0) {
                return array[0];
            }
        }
        else if (typeof secondArgument === 'number') {
            var numberResult = [];
            if (array.length > 0) {
                for (var j = 0; j < secondArgument; j++) {
                    if (array.length > j)
                    numberResult.push(array[j]);
                }
                return numberResult;
            }
        }
        else if (typeof secondArgument === 'function') {
            var functionResult = [];
            for (var i = 0; i < array.length; i++) {
                if (secondArgument(array[i])) {
                    functionResult.push(array[i]);
                }
                else {
                    return functionResult;
                }
            }
            return functionResult;
        }
        else if (typeof secondArgument === 'string') {
            for (var k = 0; k < array.length; k++) {
                if (array[k][secondArgument] === true) {
                    return array[k];
                }
            }
        }
        else if (typeof secondArgument === 'object') {
            for (var m = 0; m < array.length; m++) {
                var isAMatch = true;
                for (var key in secondArgument) {
                    if (array[m][key] !== secondArgument[key]) {
                        isAMatch = false;
                    }
                }
                if (isAMatch) {
                    return array[m];
                }
            }
        }
    };

    __.flatten = function (array, secondArgument) {

        var result = [];
        if (typeof secondArgument === 'string') {
            var pluckedArray = __.pluck(array, secondArgument);
            for(var i = 0; i < pluckedArray.length; i++) {
                recursiveFlatten(pluckedArray[i], result, false);
            }
            return result;
        }
        else {
            var shouldDoShallowFlattening = secondArgument || false;
            for(var j = 0; j < array.length; j++) {
                recursiveFlatten(array[j], result, shouldDoShallowFlattening);
            }
            return result;
        }
    };

    __.pluck = function(array, property) {
        var result = [];
        for(var i = 0; i < array.length; i++) {
            if(__.has(array[i], property)) {
                result.push(array[i][property]);
            }
        }
        return result;
    };

    __.has = function(object, key) {
        if(object !== null && object !== undefined) {
            return object.hasOwnProperty(key);
        }
        return false;
    };

    __.indexOf = function (array, element, fromIndexOrShouldDoBinarySearch) {
        if (typeof fromIndexOrShouldDoBinarySearch === 'boolean') {
            if(fromIndexOrShouldDoBinarySearch === true) {
                return doBinarySearch(array, element);
            }
            else {
                return __.indexOf(array, element);
            }
        }
        else {
            var fromIndex = fromIndexOrShouldDoBinarySearch || 0;
            if(fromIndex < array.length) {
                for(var i = fromIndex; i < array.length; i++) {
                    if(array[i] === element) {
                        return i;
                    }
                }
            }
        }
        return -1;
    };

    //returns the common elements in an array
    __.intersection = function () {
        if (arguments.length === 1) {
            return argumentsArray[0];
        }
        if(arguments.length > 1) {
            var argumentsArray = Array.prototype.slice.call(arguments, 0);
            return recursiveIntersection(argumentsArray);
        }
    };

    __.last = function (array, secondArgument) {

        if(array.length <= 0) {
            return undefined;
        }

        var typeOfSecondArgument = typeof secondArgument;
        if(typeOfSecondArgument === 'number') {
            if(secondArgument >= array.length) {
                return array;
            }

            var numberResult = [];
            for(var i = array.length - secondArgument; i < array.length; i++) {
                numberResult.push(array[i]);
            }
            return numberResult;
        }

        if(typeOfSecondArgument === 'string') {
            var stringResult = [];
            for (var j = array.length - 1; j > -1; j--) {
                if (array[j][secondArgument] !== true) {
                    break;
                }
                stringResult.push(array[j]);
            }
            return stringResult.reverse();
        }

        if(typeOfSecondArgument === 'function') {
            var functionResult = [];
            for (var k = array.length - 1; k > -1; k--) {
                if (secondArgument(array[k]) !== true) {
                    break;
                }
                functionResult.push(array[k]);
            }
            return functionResult.reverse();
        }

        if(typeOfSecondArgument === 'object') {
            var objectResult = [];
            for (var x = array.length - 1; x > -1; x--) {
                var isAMatch = true;
                for (var key in secondArgument) {
                    if (array[x][key] !== secondArgument[key]) {
                        isAMatch = false;
                        break;
                    }
                }
                if (isAMatch) {
                    objectResult.push(array[x]);
                }
            }
            return objectResult.reverse();
        }

        //default is just returning the last element
        return array[array.length - 1];
    };

    __.lastIndexOf = function (array, element, fromIndex) {
        var result = -1;
        for(var i = array.length -1; i > -1; i--) {
            if(array[i] === element) {
                result = i;
                break;
            }
        }
        if (typeof fromIndex === 'number') {

            if(fromIndex > array.length || result < fromIndex) {
                result = -1;
            }
            else {
                result = result - fromIndex;
            }
        }
        return result;
    };

    __.pull = function (array) {
        if(arguments.length > 1) {
            for(var i = 1; i < arguments.length; i++) {
                var indexToRemove = array.indexOf(arguments[i]);
                while (indexToRemove !== -1) {
                    array.splice(indexToRemove, 1);
                    indexToRemove = array.indexOf(arguments[i]);
                }
            }
        }
        return array;
    };

    //private function that does recursive intersection of more than two arrays
    function recursiveIntersection(argumentsArray) {
        if (argumentsArray.length === 2) {
            return intersectionOfTwoArrays(argumentsArray);
        }
        if (argumentsArray.length > 2) {
            var resultOfFirstTwoElements = intersectionOfTwoArrays(argumentsArray.slice(0, 2));
            return recursiveIntersection(argumentsArray.splice(0, 2, resultOfFirstTwoElements));
        }
    }

    function intersectionOfTwoArrays(argumentsArray) {
        var array1 = argumentsArray[0];
        var array2 = argumentsArray[1];
        var result = [];
        for(var i = 0; i < array1.length; i++) {
            if (__.indexOf(result, array1[i]) === -1) {
                for(var j = 0; j < array2.length; j++) {
                    if (array1[i] === array2[j]) {
                        result.push(array1[i]);
                    }
                }
            }
        }
        return result;
    }

    function doBinarySearch(array, element) {
        var midIndex = array.length / 2 | 0;
        if(array[midIndex] > element) {
            return doBinarySearch(array.slice(0, midIndex), element);
        }
        if (array[midIndex] < element) {
            return doBinarySearch(array.slice(midIndex + 1), element);
        }
        for(var i = midIndex -1 ; i > -1; i--) {
            if(array[i] !== element) {
                return i + 1;
            }
        }
        return 0;
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

    //IE8 and older do not contain indexOf hence this
    var indexOf = function(needle) {

        if (typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        }
        else {
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

    // AMD registration happens at the end for compatibility with AMD loaders
    // that may not enforce next-turn semantics on modules. Even though general
    // practice for AMD registration is to be anonymous, underscore registers
    // as a named module because, like jQuery, it is a base library that is
    // popular enough to be bundled in a third party lib, but not be part of
    // an AMD load request. Those cases could generate an error when an
    // anonymous define() is called outside of a loader request.
    if (typeof define === 'function' && define.amd) {
        define('lowerdash', [], function() {
            return __;
        });
    }

}).call(this);