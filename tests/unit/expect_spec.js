var r = __dirname + '/../../';
var e = require(r + 'lib/krake/expect');
var f = require('../helpers/fixtures');

describe("expect", function() {
  stringNodes = { cols: [{nodes:["str"]}] };
  objectNodes = { cols: [{nodes:[{some:"obj"}]}] };
  it("expect.hasStringNodes", function() {
    expect(e.hasStringNodes(stringNodes)).toEqual(true);
    expect(e.hasStringNodes(objectNodes).constructor).toEqual(Error);
  });
  it("expect.hasObjectNodes", function() {
    expect(e.hasObjectNodes(objectNodes)).toEqual(true);
    expect(e.hasObjectNodes(stringNodes).constructor).toEqual(Error);
  });
  it("expect.isNormalised", function() {
    expect(e.isNormalised(f.simple)).toEqual(true);
    expect(e.isNormalised(f.list_url).constructor).toEqual(Error);
  });
  it("expect.isList", function() {
    expect(e.isList([])).toEqual(true);
    expect(e.isList(23).constructor).toEqual(Error);
  });
  it("isObject", function() {
    expect(e.isObject({})).toEqual(true);
    expect(e.isObject(23).constructor).toEqual(Error);
  });
});
