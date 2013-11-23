var _         = require('underscore');
var type      = require('upcast').type;
var instances = require('typeclasses')();
var expect    = require('./expect');

var collect = function(subject) {
  var wants = ['indexable', 'monoid', 'monad'];
  with(instances.retrieve(subject, wants)) {
    switch(indexable.length(subject)) {
      case 0: return monoid.zero ;
      case 1: return monad.map(indexable.head(subject), monad.pure);
      default: return monad.bind(indexable.head(subject), function(y) {
        return monad.bind(collect(indexable.tail(subject)), function(ys) {
          return monad.pure(indexable.append(y,ys));
        });
      });
    }
  }
};

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

surround = function(s0, s1) {
  return [s1,s0,s1].join('');
};

unpattern = function(def) {
  expect.isObject(def.url);
  var template = def.url.pattern;
  var patterns = _.omit(def.url, 'pattern');
  var permutations = collect(contexted(patterns));
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
  switch(type(def.url)) {
    case 'string': return [def];
    case 'object': return unpattern(def);
    case 'array':  return function() {
      var expanded = expand(def);
      var normalised = _.map(expanded, normalise);
      return _.flatten(normalised);
    }();
  }
};
