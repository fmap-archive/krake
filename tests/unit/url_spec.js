var root       = __dirname + '/../../';
var url        = require(root + 'lib/krake/url');
var fixtures   = require(root + 'tests/helpers/fixtures');
var _          = require('underscore');

describe("definition#normalise", function() {
  _.each(fixtures, function(fixture) {
    var normalised = url.normalise(fixture);
    it("Should return a list of tasks with string url properties", function() {
      expect(true).toBe(true);
      expect(normalised.constructor).toEqual(Array);
    });
    it("Said tasks should have urls constructed from permutations of 'non-pattern' properties substituted into 'pattern'..", function() {
      var permutations = [
         "https://www.flickr.com/search/?q=kitten&l=comm",
         "https://www.flickr.com/search/?q=kitten&l=deriv",
         "https://www.flickr.com/search/?q=cat&l=comm",
         "https://www.flickr.com/search/?q=cat&l=deriv",
         "https://www.flickr.com/search/?q=meow&l=comm",
         "https://www.flickr.com/search/?q=meow&l=deriv",
        ];
      _.each(permutations, function(url) {
        var first = _.findWhere(normalised, { url: url });
        expect(first).not.toBe(undefined);
      });
    });
  });
});
