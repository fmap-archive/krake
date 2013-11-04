module.exports = function (grunt) {
  require('load-grunt-config')(grunt, {
    configPath: 'grunt/options',
  });
  grunt.loadTasks('grunt/tasks');
};
