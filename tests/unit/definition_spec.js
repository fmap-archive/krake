var root       = __dirname + '/../../';
var definition = require(root + 'lib/krake/definition');
var fixtures   = require(root + 'tests/helpers/fixtures');
var _          = require('underscore');

describe("definition.expand()", function() {

  var expand = definition.expand;

  it("Should return tasks without list URL properties as they are.", function() {
    var without  = fixtures.task1;
    var expanded = expand(without);
    expect(expanded).toEqual(without);
  });

  it("Should return a list of new tasks when given a task with list URL properties.", function(){
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
