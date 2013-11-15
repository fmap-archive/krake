var _       = require('underscore');
var functor = require('../functor/list');

module.exports.map = functor.map;

module.exports.pure = function(f) {
  return [f];
};

module.exports.extract = function(xs,ys) {
  return _.flatten(_.map(xs, function(f) {
    return _.map(ys, function(x) {
      return f(x);
    });
  })); 
};
