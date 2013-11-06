var _       = require('underscore');
var helpers = require('./helpers');
var monad   = require('./helpers/monad');
var string  = require('./helpers/string');

string.glue(String);
monad.list.glue(Array);
var collect = monad.list.collect;

// Given a Krake describing a set of patterns, expand to a list of Krakes, each
// associated with one pattern.

var expand = function(def) {
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

// Only works on definitions with object URLs.
unpattern = function(def) {
  var template = def.url.pattern;
  var patterns = _.omit(def.url, 'pattern');
  var permutations = collect(contexted(patterns));
  return _.map(permutations, function(permutation) {
    url = template;
    _.each(permutation, function(pair) {
      pattern = pair[0].surround('@');
      replacement = pair[1];
      url = url.replace(pattern, replacement);
    });
    def.url = url;
    return _.clone(def);
  });
};

// Normalise definitions. Returns a collection of definitions with String URLs.
normalise = function(def) {
  var url = def.url;
  if (isString(url)) {
    return [def];
  }
  else if (isObject(url)) {
    return unpattern(def);
  }
  else if (isArray(url)) {
    var expanded = expand(def);
    var normalised = _.map(expanded, normalise);
    return _.flatten(normalised);
  }
};

module.exports = {
  normalise: normalise
};
