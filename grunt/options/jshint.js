module.exports = function (grunt) {
  return {
    tests: {
      jshintrc: '.jshintrc',
      src: [
        'tests/**/*_spec.js',
      ]
    },
    src: {
      jshintrc: '.jshintrc',
      src: [
        'lib/**/*.js'
      ]
    }
  };
};
