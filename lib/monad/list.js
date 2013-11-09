var _ = require('underscore');

Array.prototype.mbind = function(callback) {
  return _.flatten(this.map(callback), true);
};

Array.mreturn = function(value) {
  return [value]; 
};

var collect = function(arr) {
  switch (arr.length) {
    case 0: return [];
    case 1: return _.head(arr).map(Array.mreturn);
    default: return _.head(arr).mbind(function(y) {
      return collect(_.tail(arr)).mbind(function(ys) {
        ys.push(y);
        return Array.mreturn(ys);
      });
    });
  }
};

function glue(array) {
  array.prototype.mbind = Array.prototype.mbind;
  array.mreturn = Array.mreturn;
}

module.exports = {
  glue: glue,
  collect: collect
};
