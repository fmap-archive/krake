var root       = __dirname + '/../../';
var process    = require(root + 'lib/krake/process');
var utils      = require(root + 'lib/krake/utils');
var fixtures   = require(root + 'tests/helpers/fixtures');
var _          = require('underscore');

describe("process#zip", function() {
  var task = fixtures.simple;
  it("should trigger the callback with objects..", function(done) {
    process.cols(task, function(t) {
      process.zip(t.cols, function(z) {
        expect(z.constructor).toEqual(Object);
        done(); // FIIIIIIRST
      });
    });
  }, 20*1000);
  it("each of which should include each column desc as a key", function(done) {
    process.cols(task, function(t) {
      process.zip(t.cols, function(z) {
        zipKeys = _.keys(z);
        descs = _.pluck(t.cols, 'desc');
        _.each(descs, function(key){
          expect(zipKeys).toContain(key);
        });
        done(); // FIIIIIIRST
      });
    });
  }, 20*1000);
});

describe("process#cols", function() {
  var someTitles;
  beforeEach(function(){
//  spyOn(utils, 'get').andCallFake(function(i, callback) {
//    callback(false, false, fixtures.kitten);
//  });
    someTitles = [
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
  });
  it("Should attach a 'nodes' attribute to each parameter, a list of strings", function(done){
    process.cols(fixtures.simple, function(attributed) {
      _.each(attributed.cols, function(col) {
        expect(col.nodes.constructor).toEqual(Array);
        _.each(col.nodes, function(node) {
          expect(node.constructor).toEqual(String);
        });
      });
      done();
    });
  }, 20*1000);
  it("Said strings should correspond to content described by the included xml selectors..", function(done){
    process.cols(fixtures.simple, function(attributed) {
      var titles = attributed.cols[0].nodes;
      _.each(someTitles, function(title) {
        expect(titles).toContain(title);
      });
      done();
    });
  }, 20*1000);
  it("Retrieved data should be post-processed with str. functions, if provided", function(done){
    process.cols(fixtures.simple_with_fn, function(attributed) {
      var titles = attributed.cols[0].nodes;
      var transformedTitles = _.map(someTitles, attributed.cols[0].fn);
      _.each(transformedTitles, function(title) {
        expect(titles).toContain(title);
      });
      done();
    });
  }, 20*1000);
});

describe("process: attr, nested", function() {
  it("missing attr", function(done){
    process.cols(fixtures.simple_no_attr, function(attributed) {
      var node = attributed.cols[0].nodes[0];
      expect(node.constructor).toEqual(String);
      expect(node).toMatch(/kittens/i);
      done();
    });
  }, 2e5);
  it("nested tasks", function(done){
    process.cols(fixtures.simple_recursive, function(attributed) {
      var nodes = attributed.cols[0].nodes;
        expect(nodes.constructor).toEqual(Array);
        _.each(nodes.slice(0,2), function(node) {
          expect(node.constructor).toEqual(Object);
          expect(node.url.constructor).toEqual(String);
          expect(node.cols.constructor).toEqual(Array);
          expect(node.cols[0].nodes.constructor).toEqual(Array);
        });
      done();
    });
  }, 8e4);
});
