var fs = require('fs');

var kittens = function() {
  var path = 'tests/fixtures/kittens.html';
  return fs.readFileSync(path).toString();
}();

module.exports = {
  list_url: require('../fixtures/list_url.js'),
  patterned_url: require('../fixtures/patterned_url.js'),
  kittens: kittens
};
