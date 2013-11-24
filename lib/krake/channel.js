var process = require('./process');

module.exports = function (tasks, emitter) {
  var taskCount = tasks.length, counter = 0;
  tasks.forEach(function(task) {
    process(task, function(result) {
      emitter.emit('retrieved', result);
      counter++;
      if (counter===taskCount) { emitter.emit('completed'); }
    });
  });
};
