var process = require('./process');

module.exports = function (tasks, emitter) {
  var taskCount = tasks.length, counter = 0;
  tasks.forEach(function(task) {
    process.cols(task, function(task) {
      process.zip(task.cols, function(result) {
        emitter.emit('retrieved', result);
        counter++;
        if (counter===taskCount) { emitter.emit('completed'); }
      });
    }); 
  });
};
