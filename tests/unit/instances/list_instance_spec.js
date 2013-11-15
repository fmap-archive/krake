var lib = require('../../../lib/instances');
var instances = lib.retrieve([],[
  'functor', 'applicative', 'monad', 'foldable', 'indexable', 'monoid'
]);

var identity = function(x) { return x; };

describe("list functor instance", function() {
  var fmap = instances.functor.map;
  it("fmap should apply the function to each element of the list", function() {
    var succ = fmap([1,2,3], identity);
    expect(succ).toEqual([1,2,3]);

    var comp0 = fmap([1,2,3],function(f) { return f+1+2; });
    var comp1 = fmap(fmap([1,2,3],function(f) { return f+1; }) ,function(f) { return f+2; });
    expect(comp0).toEqual(comp1);
  });
});

describe("list applicative instance", function() {
  var pure = instances.applicative.pure;
  var extract = instances.applicative.extract;

  it("pure should embed pure expressions", function(){
    expect(pure(identity)).toEqual([identity]);
    expect(pure(1)).toEqual([1]);
  });
  it("extract should sequence computations and combine their results", function() {
    expect(extract(pure(identity),[1])).toEqual([1]);
    var fns = [ function(a){ return a+1; },
                function(a){ return a+2; }
              ];
    expect(extract(fns, [1])).toEqual([2,3]);
  });
});

describe("list monad instance", function() {
  var bind = instances.monad.bind;
  it("bind", function() {
     var list = [1,2,3];
     var res = bind(list, function(x) { return [x,-x]; });
     expect(res).toEqual([1,-1,2,-2,3,-3]);
  });
});
describe("list foldable instance", function() {
  var foldr = instances.foldable.foldr;
  var foldl = instances.foldable.foldl;
  it("foldr", function(){
    var add = function(x,y) { return x+y; };
    var sum = foldr([1,2,3], add, 9);
    expect(sum).toEqual(15);
  });
  it("foldl", function(){
    var join = function(x,y) { return x.concat(y); };
    var sum = foldr([[1],[2]], join, []);
    expect(sum).toEqual([2,1]);
  });
});
describe("list indexable instance", function() {
  var head = instances.indexable.head;
  var tail = instances.indexable.tail;
  var length = instances.indexable.length;
  var append = instances.indexable.append;
  it("head", function() {
    expect(head([2,3,4])).toEqual(2);
  });
  it("tail", function() {
    expect(tail([2,3,4])).toEqual([3,4]);
  });
  it("length", function() {
    expect(length([2,3,4])).toEqual(3);
  });
  it("append", function() {
    expect(append(2, [3,4])).toEqual([3,4,2]);
  });
});
describe("list monoid instance", function() {
  var plus = instances.monoid.plus;
  var zero = instances.monoid.zero;
  it("plus", function() {
    expect(plus([1,2,3],[3,4])).toEqual([1,2,3,3,4]);
  });
  it("zero", function() {
    expect(plus([1,2,3],zero)).toEqual([1,2,3]);
  });
});
