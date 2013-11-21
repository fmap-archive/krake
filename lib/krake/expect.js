var _ = require('underscore');

function e(str) {
  return new Error(str);
}

function isString(val) {
  return typeof(val)==="string";
}

function isList(val) {
  return val.constructor.name ==="Array";
}

function isObject(val) {
  return typeof(val)==="object";
}

function eachNode(task, callback) {
  return _.all(task.cols, function(col) {
    return _.all(col.nodes, callback);
  });
}

module.exports.stringNodes = function(task) {
  var msg = "Expected each columns' nodes to be a list of strings.";
  return (eachNode(task,isString)||e(msg));
};

module.exports.objectNodes = function(task) {
  var msg = "Expected each columns' nodes to be a list of objects.";
  return (eachNode(task,isObject)||e(msg));
};

module.exports.normalised = function(task) {
  var msg = "Expected a normalised definition.";
  return (isString(task.url)||e(msg));
};

module.exports.isList = function(v) {
  var msg = "Expected a list." 
  return (isObject(v) || e(msg));
};

module.exports.isObject = function(v) {
  var msg = "Expected an object." 
  return (isObject(v) || e(msg));
};
