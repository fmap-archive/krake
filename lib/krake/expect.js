var _ = require('underscore');

function guard (predicate, message) {
  return function(value) {
    return predicate(value) || error(message);
  };
}

function error (str) {
  return new Error(str);
}

function eachNode(predicate) {
  return function(task) {
    return _.all(task.cols, function(col) {
      return _.all(col.nodes, predicate);
    });
  };
}

module.exports.isObject = guard(objectCheck, "expected an object");

module.exports.isList = guard(listCheck, "expected a list");

module.exports.isNormalised = function(task) {
  return guard(stringCheck, "expected a normalised definition")(task.url);
};

module.exports.hasObjectNodes = guard(eachNode(objectCheck), "expected object nodes.");

module.exports.hasStringNodes = guard(eachNode(stringCheck), "expected string nodes.");

function stringCheck(val) {
  return typeof(val)==="string";
}

function listCheck(val) {
  return val.constructor.name ==="Array";
}

function objectCheck(val) {
  return typeof(val)==="object";
}
