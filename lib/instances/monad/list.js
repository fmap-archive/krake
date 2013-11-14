var _           = require('underscore');
var functor     = require('../functor/list');
var applicative = require('../applicative/list');

module.exports.map = functor.map;
module.exports.pure = applicative.pure;
module.exports.extract = applicative.extract;

module.exports.bind = function(value, callback) {
  return _.flatten(value.map(callback), true);
};
