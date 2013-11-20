var url          = require('./krake/url');
var cols         = require('./krake/cols');
var EventEmitter = require('events').EventEmitter;

Krake = function (options) {
  this.options = options;  
};

Krake.prototype.scrape = function (task, options) {
  var emitter = new EventEmitter();
  url.normalise(task).forEach(function(subtask){
    cols.createChannel(subtask, emitter);
  });
  return emitter;
};

module.exports = Krake;
