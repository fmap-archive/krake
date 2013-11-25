var process = require('./process');
var _       = require('underscore');

var sendCompleted = function(emitter) {
  return function() {
    emitter.emit('completed');
  };
};

module.exports = function (tasks, emitter) {
  var done = _.after(tasks.length, sendCompleted(emitter));
  tasks.forEach(function(task) {
    process(task, function(result) {
      emitter.emit('retrieved', result);
      done();
    });
  });
};
