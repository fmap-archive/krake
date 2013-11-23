var root       = __dirname + '/../../';
var normalise  = require(root + 'lib/krake/normalise');
var fixtures   = require(root + 'tests/helpers/fixtures');
var _          = require('underscore');

describe("normalise", function() {
  var tasks = [fixtures.patterned_url, fixtures.list_url];
  _.each(tasks, function(task) {
    var normalised = normalise(task);
    it("Should return a list of tasks with string url properties", function() {
      expect(normalised.constructor).toEqual(Array);
      _.each(normalised, function(task) {
        expect(task.url.constructor).toBe(String);
      });
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
