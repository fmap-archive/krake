var normalise    = require('./krake/url').normalise;
var cols         = require('./krake/cols');
var EventEmitter = require('events').EventEmitter;

Krake = function (options) {
  this.options = options;  
};

Krake.prototype.scrape = function (task, options) {
  var emitter = new EventEmitter();
  cols.createChannels(normalise(task), emitter);
  return emitter;
};

module.exports = Krake;
