"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonNullableArray = void 0;
exports.extractFields = extractFields;
exports.cleanObject = cleanObject;
exports.removeFields = removeFields;
exports.addArrayItemIfNotIncluded = addArrayItemIfNotIncluded;
exports.sumOfArrayLengths = sumOfArrayLengths;
exports.isArrayWithLength = isArrayWithLength;
exports.arrayHasMatches = arrayHasMatches;
exports.chunkArray = chunkArray;
const nonNullableArray = (arr) => arr.filter((item) => item !== null && item !== undefined);
exports.nonNullableArray = nonNullableArray;
function extractFields(obj, keys) {
    const pickedObj = {};
    for (const key of keys) {
        if (obj.hasOwnProperty(key)) {
            pickedObj[key] = obj[key];
        }
    }
    return pickedObj;
}
function cleanObject(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined && value !== null));
}
function removeFields(obj, keys) {
    const filteredObj = structuredClone(obj);
    for (const key of keys) {
        delete filteredObj[key];
    }
    return filteredObj;
}
function addArrayItemIfNotIncluded(array, newItem, optionalFindFunction) {
    const itemExists = optionalFindFunction
        ? array.some(optionalFindFunction)
        : array.includes(newItem);
    if (!itemExists) {
        return [...array, newItem];
    }
    return array;
}
function sumOfArrayLengths(...arrays) {
    return arrays.reduce((acc, arr) => acc + arr.length, 0);
}
function isArrayWithLength(array) {
    return Array.isArray(array) && array.length > 0;
}
function arrayHasMatches(array1, array2) {
    return array1.some((item) => array2.includes(item));
}
function chunkArray(array, size) {
    if (size <= 0) {
        throw new Error('Size must be greater than 0');
    }
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}
//# sourceMappingURL=object.util.js.map