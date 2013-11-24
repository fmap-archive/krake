var normalise      = require('./krake/normalise');
var createChannels = require('./krake/channel');
var EventEmitter   = require('events').EventEmitter;

Krake = function (options) {
  this.options = options;  
};

Krake.prototype.scrape = function (task, options) {
  var emitter = new EventEmitter();
  createChannels(normalise(task), emitter);
  return emitter;
};

module.exports = Krake;
