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