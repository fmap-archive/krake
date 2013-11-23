var cols = require('./cols');

module.exports = function (tasks, emitter) {
  var taskCount = tasks.length, counter = 0;
  tasks.forEach(function(task) {
    cols.cols(task, function(task) {
      cols.zip(task.cols, function(result) {
        emitter.emit('retrieved', result);
        counter++;
        if (counter===taskCount) { emitter.emit('completed'); }
      });
    }); 
  });
}
