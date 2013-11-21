var r = __dirname + '/../../';
var e = require(r + 'lib/krake/expect');
var f = require('../helpers/fixtures');

describe("expect", function() {
  stringNodes = { cols: [{nodes:["str"]}] };
  objectNodes = { cols: [{nodes:[{some:"obj"}]}] };
  it("expect.stringNodes", function() {
    expect(e.stringNodes(stringNodes)).toEqual(true);
    expect(e.stringNodes(objectNodes).constructor).toEqual(Error);
  });
  it("expect.objectNodes", function() {
    expect(e.objectNodes(objectNodes)).toEqual(true);
    expect(e.objectNodes(stringNodes).constructor).toEqual(Error);
  });
  it("expect.normalised", function() {
    expect(e.normalised(f.simple)).toEqual(true);
    expect(e.normalised(f.list_url).constructor).toEqual(Error);
  });
  it("expect.isList", function() {
    expect(e.isList([])).toEqual(true);
    expect(e.isList(23).constructor).toEqual(Error);
  });
  it("expect.isObject", function() {
    expect(e.isList({})).toEqual(true);
    expect(e.isList(23).constructor).toEqual(Error);
  });
});
