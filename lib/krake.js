var url    = require('./krake/url');
var cols   = require('./krake/cols');
var events = require('events');
var _      = require('underscore');

Krake = function (options) {
  this.options = options;  
};

Krake.prototype.scrape = function (task, options) {
  var emitter = new events.EventEmitter();
  _.each(url.normalise(task), function() {
    cols.createChannel(task, emitter);
  });
  return emitter;
};

module.exports = Krake;
