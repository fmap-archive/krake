var _       = require('underscore');
var helpers = require('./helpers');

// Given a Krake describing a set of patterns, expand to a list of Krakes, each
// associated with one pattern.

expand = function(def) {
  if (helpers.isObject(def.url)) { return def; }
  var template = _.omit(def, 'url');
  return def.url.map(function(o) {
    return _.defaults({url: o}, template); 
  });
};

module.exports = {
  expand: expand
};
