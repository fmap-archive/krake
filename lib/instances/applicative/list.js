var _       = require('underscore');
var functor = require('../functor/list');

module.exports.map = functor.map;

module.exports.pure = function(f) {
  return [f];
};

module.exports.extract = function(xs,ys) {
  _.map(xs, function(f) {
    return _.flatten(_.map(ys, function(x) {
      return f(x);
    }));
  }); 
};
