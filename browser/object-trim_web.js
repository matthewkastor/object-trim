(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    node: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYnJvd3Nlck1haW4uanMiLCJub2RlX21vZHVsZXMvYXJyYXktdHJpbS9zcmMvYXJyYXktdHJpbS5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEtaXMtZW1wdHkvc3JjL2lzLWVtcHR5LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1mb3JlYWNoL3NyYy9vYmplY3QtZm9yZWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3Qtd2Fsay9zcmMvb2JqZWN0LXdhbGsuanMiLCJzcmMvb2JqZWN0LXRyaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJvYmplY3RUcmltID0gcmVxdWlyZSgnLi4vc3JjL29iamVjdC10cmltLmpzJyk7XHJcbiIsIi8qKlxyXG4gKiBSZW1vdmVzIGVtcHR5IGl0ZW1zIGZyb20gYW4gYXJyYXkuIEVtcHR5IHZhbHVlcyBhcmUgJycsIHVuZGVmaW5lZCwgbnVsbCwgW10sXHJcbiAqICB7fSwgYW5kIG9iamVjdHMgd2l0aCBubyBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gdHJpbS5cclxuICogQHJldHVybnMge0FycmF5fSBhcnIgVGhlIGFycmF5IHdpdGggZW1wdHkgdmFsdWVzIHJlbW92ZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBhcnJheVRyaW0gKGFycikge1xyXG4gICAgdmFyIG91dDtcclxuICAgIHZhciBlbXB0eSA9IHJlcXVpcmUoJ2F0cm9wYS1pcy1lbXB0eScpO1xyXG4gICAgb3V0ID0gYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiAhZW1wdHkoaXRlbSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhcnJheVRyaW07IiwiLyoqXHJcbiAqIFRlbGxzIHlvdSBpZiB0aGUgdmFsdWUgaXMgZW1wdHkuIEVtcHR5IHZhbHVlcyBhcmUgJycsIHVuZGVmaW5lZCwgbnVsbCwgW10sXHJcbiAqICB7fSwgYW5kIG9iamVjdHMgd2l0aCBubyBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXHJcbiAqIEBwYXJhbSB7TWl4ZWR9IGl0ZW0gVGhlIGl0ZW0gdG8gY2hlY2suXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0VtcHR5IChpdGVtKSB7XHJcbiAgICB2YXIgb3V0ID0gZmFsc2U7XHJcbiAgICBzd2l0Y2ggKGl0ZW0pIHtcclxuICAgICAgICBjYXNlICcnIDpcclxuICAgICAgICBjYXNlIG51bGwgOlxyXG4gICAgICAgIGNhc2UgdW5kZWZpbmVkIDpcclxuICAgICAgICAgICAgb3V0ID0gdHJ1ZTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBvdXQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGlnbm9yZSkge1xyXG4gICAgICAgIC8vIG5vdCBhbiBvYmplY3QuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gaXNFbXB0eTsiLCIvKipcclxuICogRXhlY3V0ZXMgYSBmdW5jdGlvbiBvbiBlYWNoIG9mIGFuIG9iamVjdHMgb3duIGVudW1lcmFibGUgcHJvcGVydGllcy4gVGhlXHJcbiAqICBjYWxsYmFjayBmdW5jdGlvbiB3aWxsIHJlY2VpdmUgdGhyZWUgYXJndW1lbnRzOiB0aGUgdmFsdWUgb2YgdGhlIGN1cnJlbnRcclxuICogIHByb3BlcnR5LCB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHksIGFuZCB0aGUgb2JqZWN0IGJlaW5nIHByb2Nlc3NlZC4gVGhpcyBpc1xyXG4gKiAgcm91Z2hseSBlcXVpdmFsZW50IHRvIHRoZSBzaWduYXR1cmUgZm9yIGNhbGxiYWNrcyB0b1xyXG4gKiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBhY3Qgb24uXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBnaXZlbiBvYmplY3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBvYmplY3RGb3JlYWNoKG9iaiwgY2FsbGJhY2spIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgY2FsbGJhY2sob2JqW3Byb3BdLCBwcm9wLCBvYmopO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gb2JqO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdEZvcmVhY2g7IiwiLyoqXHJcbiAqIFdhbGtzIHRocm91Z2ggYW4gb2JqZWN0IGV4ZWN1dGluZyB1c2VyIGRlZmluZWQgZnVuY3Rpb25zIGF0IGV2ZXJ5IG5vZGUgb24gdGhlIFxyXG4gKiAgd2F5IGRvd24gYW5kIGJhY2sgdXAuIEZ1bmN0aW9ucyB3aWxsIGJlIGdpdmVuIHRocmVlIGFyZ3VtZW50czogdGhlIHZhbHVlXHJcbiAqICBvZiB0aGUgY3VycmVudCBub2RlLCB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBub2RlLCBhbmQgdGhlIG9iamVjdCBiZWluZ1xyXG4gKiAgYmVpbmcgd2Fsa2VkIHRocm91Z2guIFRoaXMgcm91Z2hseSByZXNlbWJsZXMgdGhlIGNhbGxiYWNrIHNpZ25hdHVyZSBvZlxyXG4gKiAgQXJyYXkucHJvdG90eXBlLm1hcC5cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHdhbGsgdGhyb3VnaC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2Rlc2NlbnRpb25GbiA9IGZ1bmN0aW9uICgpIHtyZXR1cm4gbnVsbDt9XSBjYWxsYmFja1xyXG4gKiAgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgYXQgZXZlcnkgbm9kZSBmcm9tIHRoZSB0b3AgZG93bi5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2FzY2VudGlvbkZuID0gZnVuY3Rpb24gKCkge3JldHVybiBudWxsO31dIGNhbGxiYWNrXHJcbiAqICBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBhdCBldmVyeSBub2RlIGZyb20gdGhlIGJvdHRvbSB1cC5cclxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0IHdpdGggZW1wdHkgdmFsdWVzIHJlbW92ZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBvYmplY3RXYWxrKG9iaiwgZGVzY2VudGlvbkZuLCBhc2NlbnRpb25Gbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBkZXNjZW50aW9uRm4gPSBkZXNjZW50aW9uRm4gfHwgZnVuY3Rpb24gKCkge3JldHVybiBudWxsO31cclxuICAgIGFzY2VudGlvbkZuID0gYXNjZW50aW9uRm4gfHwgZnVuY3Rpb24gKCkge3JldHVybiBudWxsO31cclxuICAgIHZhciBvYmplY3RGb3JlYWNoID0gcmVxdWlyZSgnb2JqZWN0LWZvcmVhY2gnKTtcclxuICAgIGZ1bmN0aW9uIHdhbGsob2JqKSB7XHJcbiAgICAgICAgb2JqZWN0Rm9yZWFjaChvYmosIGZ1bmN0aW9uICh2YWwsIHByb3AsIGFPYmopIHtcclxuICAgICAgICAgICAgZGVzY2VudGlvbkZuKHZhbCwgcHJvcCwgYU9iaik7XHJcbiAgICAgICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIHdhbGsodmFsKTtcclxuICAgICAgICAgICAgICAgIGFzY2VudGlvbkZuKHZhbCwgcHJvcCwgYU9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdhbGsob2JqKTtcclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RXYWxrOyIsIi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBub2RlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBUcmltcyBlbXB0eSB2YWx1ZXMgb3V0IG9mIGEgZ2l2ZW4gb2JqZWN0LiBFbXB0eSB2YWx1ZXMgYXJlICcnLCB1bmRlZmluZWQsXHJcbiAqICBudWxsLCBbXSwge30sIGFuZCBvYmplY3RzIHdpdGggbm8gZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gdHJpbSBlbXB0eSB2YWx1ZXMgZnJvbS5cclxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0IHdpdGggZW1wdHkgdmFsdWVzIHJlbW92ZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBvYmplY3RUcmltKG9iaikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgaXNFbXB0eSA9IHJlcXVpcmUoJ2F0cm9wYS1pcy1lbXB0eScpO1xyXG4gICAgdmFyIG9iamVjdFdhbGsgPSByZXF1aXJlKCdvYmplY3Qtd2FsaycpO1xyXG4gICAgdmFyIGFycmF5VHJpbSA9IHJlcXVpcmUoJ2FycmF5LXRyaW0nKTtcclxuICAgIGZ1bmN0aW9uIGRlc2NlbnRpb25Gbih2YWwsIHByb3AsIGFPYmopIHtcclxuICAgICAgICBpZiAoaXNFbXB0eSh2YWwpKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBhT2JqW3Byb3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgYU9ialtwcm9wXSA9IGFycmF5VHJpbSh2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGFzY2VudGlvbkZuKHZhbCwgcHJvcCwgYU9iaikge1xyXG4gICAgICAgIGlmIChpc0VtcHR5KHZhbCkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgZGVsZXRlIGFPYmpbcHJvcF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iamVjdFdhbGsob2JqLCBkZXNjZW50aW9uRm4sIGFzY2VudGlvbkZuKTtcclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUcmltOyJdfQ==
