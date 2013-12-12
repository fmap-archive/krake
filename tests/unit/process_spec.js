var root       = __dirname + '/../../';
var process    = require(root + 'lib/krake/process');
var fixtures   = require(root + 'tests/helpers/fixtures');
var _          = require('underscore');

describe("process", function() {
  it("It should be a function.", function() {
    expect(process.constructor).toEqual(Function);
  });

  var results = [], lastResult;

  process(fixtures.total, function(result, last) {
    results.push(result);
    if (last){lastResult=result;}
  });

  waitsFor(function(){
    return (typeof lastResult != 'undefined');
  }, 'lastResult to be set.', 1e5); 
  
  it("The result should have zip structure.", function() {
    [lastResult, lastResult.page].forEach(function(result) {
      expect(result.constructor).toEqual(Object);
    });
    var lastResultKeys = Object.keys(lastResult);
    Object.keys(fixtures.total).forEach(function(key) {
      expect (Object.keys(lastResult));
    });
  });
  it("It should get strings using XPath selectors and 'attr'.", function() {
    expect(lastResult.title.constructor).toEqual(String);
    expect(results.constructor).toEqual(Array);
    var someTitles = [
      'Kitten Love',
      'The Magic Kitten',
      'Kitten of Lusy',
      '"Kitten Geyser"',
      'Kittens',
      'fostering kittens',
      'Kitten',
      'Kittens',
      'Kittens!',
      'Kitten',
    ];
    var titles = _.map(results,function(r){return r.title;});
    someTitles.forEach(function(t) {
      expect(titles).toContain(t);
    });
  });
  it("It should post-process attributions with `fn` when applicable.", function() {
    expect(lastResult.image).toMatch(/_b\.[a-z]+$/);
  });
  it("It should use `innerHTML` when no `attr` is provided.", function() {
    expect(lastResult.page.description).toMatch(/<p>/);
  });
});
