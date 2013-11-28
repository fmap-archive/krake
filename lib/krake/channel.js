var process = require('./process');
var _       = require('underscore');

function sendCompleted (emitter) {
  emitter.emit('completed');
}

module.exports = function (tasks, emitter) {
  var completed = _.after(tasks.length, sendCompleted);
  tasks.forEach(function(task) {
    process(task, function(result, last) {
      emitter.emit('retrieved', result);
      last && completed(emitter);
    });
  });
};
