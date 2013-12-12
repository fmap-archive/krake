var fs = require('fs');

function readFile(path) {
  return fs.readFileSync(path).toString();
}

var flickr = {
  index:  readFile('tests/fixtures/flickr/index.html'),
  detail: readFile('tests/fixtures/flickr/detail.html') 
};

module.exports = {
  list_url:         require('../fixtures/list_url.js'),
  patterned_url:    require('../fixtures/patterned_url.js'),
  simple:           require('../fixtures/simple.js'),
  simple_with_fn:   require('../fixtures/simple_with_fn.js'),
  simple_recursive: require('../fixtures/simple_recursive.js'),
  simple_no_attr:   require('../fixtures/simple_no_attr.js'),
  total:            require('../fixtures/total.js'),
  flickr:           flickr
};
