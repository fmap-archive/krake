var root       = __dirname + '/../../';
var instances  = require(root + 'lib/instances');
var _          = require('underscore');

describe("retrieve", function() {
  it("Should return an error when an instance is missing.", function() {
    var instance = instances.retrieve([], ['group']).group;
    expect(instance.constructor).toEqual(Error);
  });
  it("Should return an error when there are no instances for a type.", function() {
    var Newbie = function(){};
    var instance = instances.retrieve(Newbie, ['functor']).functor;
    expect(instance.constructor).toEqual(Error);
  });
  it("Should return an object when there is an instance matching the request for the type.", function() {
    var instance = instances.retrieve([], ['monoid']);
    expect(instance.constructor).toEqual(Object);
  });
});

describe("endow", function() {
  it("Should return an object sharing the type of its argument(0) value.", function() {
    var receiver = instances.endow([],['missing', 'monoid']);
    expect(receiver.constructor).toEqual(Array);
  });
});
