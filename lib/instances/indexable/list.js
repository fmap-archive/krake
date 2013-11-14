var _ = require('underscore');

module.exports.length = function(xs) {
  return xs.length; 
};

module.exports.head = function(x) {
  return (x.length > 0 ? x[0] : []);
};

module.exports.tail = function(xs) {
  return xs.slice(1, xs.length);
};

module.exports.append = function(x, xs) {
  xs.push(x);
  return xs;
};
