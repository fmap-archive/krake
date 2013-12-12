var fixtures = require('../helpers/fixtures');
var url      = require('url');

function getFixture (url) {
  if (/search/.test(url)) {
    return fixtures.flickr.index;
  } else if (/photos/.test(url)) {
    return fixtures.flickr.detail;
  } else {
    return (new Error);
  }
}

function getURL (url, callback) {
  var fixture  = getFixture(url);
  var response = { statusCode: 200 };
  callback(undefined, response, fixture);
}

module.exports = {
  get: getURL
};
