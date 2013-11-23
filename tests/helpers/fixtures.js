var fs = require('fs');

var kittens = function() {
  var path = 'tests/fixtures/kittens.html';
  return fs.readFileSync(path).toString();
}();

module.exports = {
  list_url:         require('../fixtures/list_url.js'),
  patterned_url:    require('../fixtures/patterned_url.js'),
  simple:           require('../fixtures/simple.js'),
  simple_with_fn:   require('../fixtures/simple_with_fn.js'),
  simple_recursive: require('../fixtures/simple_recursive.js'),
  simple_no_attr: require('../fixtures/simple_no_attr.js'),
  kittens:          kittens
};
