;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
objectTrim = require('../src/object-trim.js');

},{"../src/object-trim.js":6}],2:[function(require,module,exports){
/**
 * Removes empty items from an array. Empty values are '', undefined, null, [],
 *  {}, and objects with no enumerable properties.
 * @param {Array} arr The array to trim.
 * @returns {Array} arr The array with empty values removed.
 */
function arrayTrim (arr) {
    var out;
    var empty = require('atropa-is-empty');
    out = arr.filter(function (item) {
        return !empty(item);
    });
    return out;
}
module.exports = arrayTrim;
},{"atropa-is-empty":3}],3:[function(require,module,exports){
/**
 * Tells you if the value is empty. Empty values are '', undefined, null, [],
 *  {}, and objects with no enumerable properties.
 * @param {Mixed} item The item to check.
 */
function isEmpty (item) {
    var out = false;
    switch (item) {
        case '' :
        case null :
        case undefined :
            out = true;
        default:
            break;
    }
    try {
        if (Object.keys(item).length === 0) {
            out = true;
        }
    } catch (ignore) {
        // not an object.
    }
    return out;
}
module.exports = isEmpty;
},{}],4:[function(require,module,exports){
/**
 * Executes a function on each of an objects own enumerable properties. The
 *  callback function will receive three arguments: the value of the current
 *  property, the name of the property, and the object being processed. This is
 *  roughly equivalent to the signature for callbacks to
 *  Array.prototype.forEach.
 * @param {Object} obj The object to act on.
 * @param {Function} callback The function to execute.
 * @returns {Object} Returns the given object.
 */
function objectForeach(obj, callback) {
    "use strict";
    Object.keys(obj).forEach(function (prop) {
        callback(obj[prop], prop, obj);
    });
    return obj;
};
module.exports = objectForeach;
},{}],5:[function(require,module,exports){
/**
 * Walks through an object executing user defined functions at every node on the 
 *  way down and back up. Functions will be given three arguments: the value
 *  of the current node, the name of the current node, and the object being
 *  being walked through. This roughly resembles the callback signature of
 *  Array.prototype.map.
 * @param {Object} obj The object to walk through.
 * @param {Function} [descentionFn = function () {return null;}] callback
 *  function to be executed at every node from the top down.
 * @param {Function} [ascentionFn = function () {return null;}] callback
 *  function to be executed at every node from the bottom up.
 * @returns {Object} Returns the object with empty values removed.
 */
function objectWalk(obj, descentionFn, ascentionFn) {
    "use strict";
    descentionFn = descentionFn || function () {return null;}
    ascentionFn = ascentionFn || function () {return null;}
    var objectForeach = require('object-foreach');
    function walk(obj) {
        objectForeach(obj, function (val, prop, aObj) {
            descentionFn(val, prop, aObj);
            if (val instanceof Object) {
                walk(val);
                ascentionFn(val, prop, aObj);
            }
        });
        return obj;
    }
    return walk(obj);
};
module.exports = objectWalk;
},{"object-foreach":4}],6:[function(require,module,exports){
/**
 * Trims empty values out of a given object. Empty values are '', undefined,
 *  null, [], {}, and objects with no enumerable properties.
 * @param {Object} obj The object to trim empty values from.
 * @returns {Object} Returns the object with empty values removed.
 */
function objectTrim(obj) {
    "use strict";
    var isEmpty = require('atropa-is-empty');
    var objectWalk = require('object-walk');
    var arrayTrim = require('array-trim');
    function descentionFn(val, prop, aObj) {
        if (isEmpty(val)) {
            delete aObj[prop];
        }
        if (val instanceof Array) {
            aObj[prop] = arrayTrim(val);
        }
    }
    function ascentionFn(val, prop, aObj) {
        if (isEmpty(val) === true) {
            delete aObj[prop];
        }
    }
    return objectWalk(obj, descentionFn, ascentionFn);
};
module.exports = objectTrim;
},{"array-trim":2,"atropa-is-empty":3,"object-walk":5}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcb2JqZWN0LXRyaW1cXGRldlxcYnJvd3Nlck1haW4uanMiLCJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcb2JqZWN0LXRyaW1cXG5vZGVfbW9kdWxlc1xcYXJyYXktdHJpbVxcc3JjXFxhcnJheS10cmltLmpzIiwiQzpcXFVzZXJzXFxrYXN0b3JcXERlc2t0b3BcXG9iamVjdC10cmltXFxub2RlX21vZHVsZXNcXGF0cm9wYS1pcy1lbXB0eVxcc3JjXFxpcy1lbXB0eS5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxvYmplY3QtdHJpbVxcbm9kZV9tb2R1bGVzXFxvYmplY3Qtd2Fsa1xcbm9kZV9tb2R1bGVzXFxvYmplY3QtZm9yZWFjaFxcc3JjXFxvYmplY3QtZm9yZWFjaC5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxvYmplY3QtdHJpbVxcbm9kZV9tb2R1bGVzXFxvYmplY3Qtd2Fsa1xcc3JjXFxvYmplY3Qtd2Fsay5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxvYmplY3QtdHJpbVxcc3JjXFxvYmplY3QtdHJpbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIm9iamVjdFRyaW0gPSByZXF1aXJlKCcuLi9zcmMvb2JqZWN0LXRyaW0uanMnKTtcclxuIiwiLyoqXHJcbiAqIFJlbW92ZXMgZW1wdHkgaXRlbXMgZnJvbSBhbiBhcnJheS4gRW1wdHkgdmFsdWVzIGFyZSAnJywgdW5kZWZpbmVkLCBudWxsLCBbXSxcclxuICogIHt9LCBhbmQgb2JqZWN0cyB3aXRoIG5vIGVudW1lcmFibGUgcHJvcGVydGllcy5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byB0cmltLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IGFyciBUaGUgYXJyYXkgd2l0aCBlbXB0eSB2YWx1ZXMgcmVtb3ZlZC5cclxuICovXHJcbmZ1bmN0aW9uIGFycmF5VHJpbSAoYXJyKSB7XHJcbiAgICB2YXIgb3V0O1xyXG4gICAgdmFyIGVtcHR5ID0gcmVxdWlyZSgnYXRyb3BhLWlzLWVtcHR5Jyk7XHJcbiAgICBvdXQgPSBhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuICFlbXB0eShpdGVtKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG91dDtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5VHJpbTsiLCIvKipcclxuICogVGVsbHMgeW91IGlmIHRoZSB2YWx1ZSBpcyBlbXB0eS4gRW1wdHkgdmFsdWVzIGFyZSAnJywgdW5kZWZpbmVkLCBudWxsLCBbXSxcclxuICogIHt9LCBhbmQgb2JqZWN0cyB3aXRoIG5vIGVudW1lcmFibGUgcHJvcGVydGllcy5cclxuICogQHBhcmFtIHtNaXhlZH0gaXRlbSBUaGUgaXRlbSB0byBjaGVjay5cclxuICovXHJcbmZ1bmN0aW9uIGlzRW1wdHkgKGl0ZW0pIHtcclxuICAgIHZhciBvdXQgPSBmYWxzZTtcclxuICAgIHN3aXRjaCAoaXRlbSkge1xyXG4gICAgICAgIGNhc2UgJycgOlxyXG4gICAgICAgIGNhc2UgbnVsbCA6XHJcbiAgICAgICAgY2FzZSB1bmRlZmluZWQgOlxyXG4gICAgICAgICAgICBvdXQgPSB0cnVlO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIG91dCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoaWdub3JlKSB7XHJcbiAgICAgICAgLy8gbm90IGFuIG9iamVjdC5cclxuICAgIH1cclxuICAgIHJldHVybiBvdXQ7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBpc0VtcHR5OyIsIi8qKlxyXG4gKiBFeGVjdXRlcyBhIGZ1bmN0aW9uIG9uIGVhY2ggb2YgYW4gb2JqZWN0cyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzLiBUaGVcclxuICogIGNhbGxiYWNrIGZ1bmN0aW9uIHdpbGwgcmVjZWl2ZSB0aHJlZSBhcmd1bWVudHM6IHRoZSB2YWx1ZSBvZiB0aGUgY3VycmVudFxyXG4gKiAgcHJvcGVydHksIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSwgYW5kIHRoZSBvYmplY3QgYmVpbmcgcHJvY2Vzc2VkLiBUaGlzIGlzXHJcbiAqICByb3VnaGx5IGVxdWl2YWxlbnQgdG8gdGhlIHNpZ25hdHVyZSBmb3IgY2FsbGJhY2tzIHRvXHJcbiAqICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGFjdCBvbi5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUuXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGdpdmVuIG9iamVjdC5cclxuICovXHJcbmZ1bmN0aW9uIG9iamVjdEZvcmVhY2gob2JqLCBjYWxsYmFjaykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICBjYWxsYmFjayhvYmpbcHJvcF0sIHByb3AsIG9iaik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBvYmo7XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0Rm9yZWFjaDsiLCIvKipcclxuICogV2Fsa3MgdGhyb3VnaCBhbiBvYmplY3QgZXhlY3V0aW5nIHVzZXIgZGVmaW5lZCBmdW5jdGlvbnMgYXQgZXZlcnkgbm9kZSBvbiB0aGUgXHJcbiAqICB3YXkgZG93biBhbmQgYmFjayB1cC4gRnVuY3Rpb25zIHdpbGwgYmUgZ2l2ZW4gdGhyZWUgYXJndW1lbnRzOiB0aGUgdmFsdWVcclxuICogIG9mIHRoZSBjdXJyZW50IG5vZGUsIHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50IG5vZGUsIGFuZCB0aGUgb2JqZWN0IGJlaW5nXHJcbiAqICBiZWluZyB3YWxrZWQgdGhyb3VnaC4gVGhpcyByb3VnaGx5IHJlc2VtYmxlcyB0aGUgY2FsbGJhY2sgc2lnbmF0dXJlIG9mXHJcbiAqICBBcnJheS5wcm90b3R5cGUubWFwLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gd2FsayB0aHJvdWdoLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZGVzY2VudGlvbkZuID0gZnVuY3Rpb24gKCkge3JldHVybiBudWxsO31dIGNhbGxiYWNrXHJcbiAqICBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBhdCBldmVyeSBub2RlIGZyb20gdGhlIHRvcCBkb3duLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbYXNjZW50aW9uRm4gPSBmdW5jdGlvbiAoKSB7cmV0dXJuIG51bGw7fV0gY2FsbGJhY2tcclxuICogIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGF0IGV2ZXJ5IG5vZGUgZnJvbSB0aGUgYm90dG9tIHVwLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBvYmplY3Qgd2l0aCBlbXB0eSB2YWx1ZXMgcmVtb3ZlZC5cclxuICovXHJcbmZ1bmN0aW9uIG9iamVjdFdhbGsob2JqLCBkZXNjZW50aW9uRm4sIGFzY2VudGlvbkZuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGRlc2NlbnRpb25GbiA9IGRlc2NlbnRpb25GbiB8fCBmdW5jdGlvbiAoKSB7cmV0dXJuIG51bGw7fVxyXG4gICAgYXNjZW50aW9uRm4gPSBhc2NlbnRpb25GbiB8fCBmdW5jdGlvbiAoKSB7cmV0dXJuIG51bGw7fVxyXG4gICAgdmFyIG9iamVjdEZvcmVhY2ggPSByZXF1aXJlKCdvYmplY3QtZm9yZWFjaCcpO1xyXG4gICAgZnVuY3Rpb24gd2FsayhvYmopIHtcclxuICAgICAgICBvYmplY3RGb3JlYWNoKG9iaiwgZnVuY3Rpb24gKHZhbCwgcHJvcCwgYU9iaikge1xyXG4gICAgICAgICAgICBkZXNjZW50aW9uRm4odmFsLCBwcm9wLCBhT2JqKTtcclxuICAgICAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgd2Fsayh2YWwpO1xyXG4gICAgICAgICAgICAgICAgYXNjZW50aW9uRm4odmFsLCBwcm9wLCBhT2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gd2FsayhvYmopO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFdhbGs7IiwiLyoqXHJcbiAqIFRyaW1zIGVtcHR5IHZhbHVlcyBvdXQgb2YgYSBnaXZlbiBvYmplY3QuIEVtcHR5IHZhbHVlcyBhcmUgJycsIHVuZGVmaW5lZCxcclxuICogIG51bGwsIFtdLCB7fSwgYW5kIG9iamVjdHMgd2l0aCBubyBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byB0cmltIGVtcHR5IHZhbHVlcyBmcm9tLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBvYmplY3Qgd2l0aCBlbXB0eSB2YWx1ZXMgcmVtb3ZlZC5cclxuICovXHJcbmZ1bmN0aW9uIG9iamVjdFRyaW0ob2JqKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBpc0VtcHR5ID0gcmVxdWlyZSgnYXRyb3BhLWlzLWVtcHR5Jyk7XHJcbiAgICB2YXIgb2JqZWN0V2FsayA9IHJlcXVpcmUoJ29iamVjdC13YWxrJyk7XHJcbiAgICB2YXIgYXJyYXlUcmltID0gcmVxdWlyZSgnYXJyYXktdHJpbScpO1xyXG4gICAgZnVuY3Rpb24gZGVzY2VudGlvbkZuKHZhbCwgcHJvcCwgYU9iaikge1xyXG4gICAgICAgIGlmIChpc0VtcHR5KHZhbCkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIGFPYmpbcHJvcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBhT2JqW3Byb3BdID0gYXJyYXlUcmltKHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXNjZW50aW9uRm4odmFsLCBwcm9wLCBhT2JqKSB7XHJcbiAgICAgICAgaWYgKGlzRW1wdHkodmFsKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBkZWxldGUgYU9ialtwcm9wXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqZWN0V2FsayhvYmosIGRlc2NlbnRpb25GbiwgYXNjZW50aW9uRm4pO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFRyaW07Il19
;