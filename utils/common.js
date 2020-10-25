import safeStringify from "fast-safe-stringify";

// Parses JSON -> in case of error returns empty object
export const parseJson = (v) => {
  try {
    return JSON.parse(v);
  } catch (error) {
    return {};
  }
};

// returns true if value is array and it has enties
export const isValidArray = (v) => Array.isArray(v) && v.length > 0;

// returns true if the given value is an object
export const isObject = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};

// returns true if it is an object and it has keys
export const isValidObject = (v) => isObject(v) && Object.keys(v).length > 0;

// used as a replacer function in stringify -> to stringify error objects also
export const replaceErrors = (key, value) => {
  if (value instanceof Error) {
    const errors = {};
    Object.getOwnPropertyNames(value).forEach(function (key) {
      errors[key] = value[key].toString();
    });
    return errors;
  } else return value;
};

// returns stringified version of value passed
export const stringifyAll = (v) => safeStringify(v, replaceErrors());

// Object.freeze -> freezes shallow level -> so freezing nested levels
export const deepFreeze = (object) => {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);
  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
};

// returns the request key of the given object
export const get = (from, selector, defaultVal) => {
  const value = selector
    .replace(/\[([^[\]]*)\]/g, ".$1.")
    .split(".")
    .filter((t) => t !== "")
    .reduce((prev, cur) => prev && prev[cur], from);
  return value === undefined || value === null ? defaultVal : value;
};

// returns true if value is number
export function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

// Promise Timeout
export const promiseTimeout = (promise, ms) => {
  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject("Timed out in " + ms + "ms.");
    }, ms);
  });
  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout]);
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
