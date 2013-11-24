var _         = require('underscore');
var expect    = require('./expect');
var utils     = require('./utils');

var expand = function(def) {
  expect.isList(def.url);
  var template = _.omit(def, 'url');
  return def.url.map(function(o) {
    return _.defaults({url: o}, template); 
  });
};

var contexted = function (obj) {
  return _.map(obj, function(values, key) {
    return _.map(values, function(value) {
      return [key, value];
    });
  });
};

var surround = function(s0, s1) {
  return [s1,s0,s1].join('');
};

var unpattern = function(def) {
  expect.isObject(def.url);
  var template = def.url.pattern;
  var patterns = _.omit(def.url, 'pattern');
  var permutations = utils.collect(contexted(patterns));
  return _.map(permutations, function(permutation) {
    url = template;
    _.each(permutation, function(pair) {
      pattern = surround(pair[0], '@');
      replacement = pair[1];
      url = url.replace(pattern, replacement);
    });
    def.url = url;
    return _.clone(def);
  });
};

module.exports = function normalise(def) {
  switch (def.url.constructor.name) {
    case 'String': return [def];
    case 'Object': return unpattern(def);
    case 'Array':  return function() {
      var expanded = expand(def);
      var normalised = _.map(expanded, normalise);
      return _.flatten(normalised);
    }();
  }
};
