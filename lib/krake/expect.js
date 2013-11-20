var _ = require('underscore');

var expect = {};

function e(str) {
  return new Error(str);
}

function isString(val) {
  return typeof(val)==="string";
}

function isObject(val) {
  return typeof(val)==="object";
}

function eachNode(task, callback) {
  return _.all(task.cols, function(col) {
    return _.all(col.nodes, callback);
  });
}

expect.stringNodes = function(task) {
  var msg = "Expected each columns' nodes to be a list of strings.";
  return (eachNode(task,isString)||e(msg));
};

expect.objectNodes = function(task) {
  var msg = "Expected each columns' nodes to be a list of objects.";
  return (eachNode(task,isObject)||e(msg));
};

expect.normalised = function(task) {
  var msg = "Expected a normalised definition.";
  return (isString(task.url)||e(msg));
};

module.exports = expect;
