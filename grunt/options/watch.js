module.exports = {
  scripts: {
    files: [
      'Gruntfile.js',
      'package.json',
      'tests/**/*.js',
      'lib/**/*.js'
    ],
    tasks: [
      'jshint',
      'jasmine_node'
    ]
  }
};
