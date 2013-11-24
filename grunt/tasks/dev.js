module.exports = function (grunt) {
  grunt.registerTask('dev', [
    'jshint',
    'jasmine_node',
    'watch'
  ]);
};
