var root       = __dirname + '/../../';
var definition = require(root + 'lib/krake/definition');
var fixtures   = require(root + 'tests/helpers/fixtures');
var _          = require('underscore');

describe("definition.expand()", function() {
  var expand = definition.expand;

  it("Should return a list", function(){
    var has = fixtures.task2;
    var expanded = expand(has);
    expect(expanded.constructor).toEqual(Array);
  });

  it("Each URL of each of the sup. tasks should correspond to one URL from the original/unexpanded.", function() {
    var has = fixtures.task2;
    var old_urls = has.url.map(function(p) { return p.pattern; });
    var new_urls = expand(has).map(function(task) { return task.url.pattern; });
    old_urls.forEach(function(url) {
      expect(new_urls).toContain(url);
    });
  });
});

describe("definition#unpattern()", function() {
  var unpattern = definition.unpattern;
  var task = 
    { url: 
        { pattern: "https://www.flickr.com/search/?q=@keywords@&l=@licenses@",
          keywords: ["kitten", "cat", "meow"],
          licenses: ["comm", "deriv"]
        }
    };
  var unpatterned = unpattern(task);
  it("Should return a list of tasks with string url properties", function() {
    expect(unpatterned.constructor).toEqual(Array);
    _.each(unpatterned, function (task) {
      expect(task.url.constructor).toEqual(String); 
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
      var first = _.findWhere(unpatterned, { url: url });
      expect(first).not.toBe(undefined);
    });
  });
});

describe("definition#normalise", function() {
  _.each(fixtures, function(fixture) {
    var normalised = definition.normalise(fixture);
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
