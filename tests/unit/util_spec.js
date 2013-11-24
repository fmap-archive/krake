var root  = __dirname + '/../../';
var utils = require(root + 'lib/krake/utils');

describe("utils#collect", function() { 
  it("should take the product of lists", function() {
    var r0 = utils.collect([[2,3],[4,5],[6]]);
    var r1 = [[6,4,2],[6,5,2],[6,4,3],[6,5,3]];
    expect(r0).toEqual(r1);
  });
});

describe("utils#clone", function() {
  it("should make deep copies of objects", function() {
    var foo = {a:23};
    var bar = utils.clone(foo);
    bar.a = 42;
    expect(foo.a).toEqual(23);
  });
});
