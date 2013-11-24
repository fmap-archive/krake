var instances = require('typeclasses')();
var jsdom     = require('jsdom');
var request   = require('request');

module.exports.get = function(u,c) {
  request.get(u,c);
};

module.exports.clone = function(o) {
  // :'(
  return JSON.parse(JSON.stringify(o));
};

module.exports.collect = function collect(subject) {
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
