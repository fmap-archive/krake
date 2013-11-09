var root       = __dirname + '/../../';
var fixtures   = require(root + 'tests/helpers/fixtures');
var _          = require('underscore');
var jsdom      = require('jsdom');
var xpath      = require(root + 'lib/krake/helpers').xpath.xpath;

describe("xpath#xpath", function() {
  it("Should return a list of objects", function(done) {
    var html  = fixtures.kittens;
    var query = "//a[contains(@class,'photo-click')]";
    jsdom.env(html, [], function(err, window) {
      var results = xpath(query, window.document);
      expect(results.constructor).toEqual(Array);
      _.map(results, function(result) {
        expect(result.constructor).toEqual(Object);
      });
      done();
    });
  });
});
