var _         = require('underscore');
var expect    = require('./expect');
var utils     = require('./utils');

var expand = function(def) {
  expect.isList(def.url);
  return def.url.map(function(o) {
    return _.defaults({url: o}, def); 
  });
};

var context = function (obj) {
  return _.map(obj, function(values, key) {
    return _.map(values, function(value) {
      return [key, value];
    });
  });
};

var surround = function(s0, s1) {
  return [s1,s0,s1].join('');
};

var replaceURL = function(url, pair) {
  pattern = surround(pair[0], '@');
  replacement = pair[1];
  return url.replace(pattern, replacement);
};

var unpattern = function(def) {
  expect.isObject(def.url);
  var permutations = utils.collect(context(
    _.omit(def.url, 'pattern')
  ));
  return _.map(permutations, function(permutation) {
    url = def.url.pattern;
    _.each(permutation, function(pair) {
      url = replaceURL(url, pair);
    });
    return _.extend(_.clone(def),{url:url});
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
