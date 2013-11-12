var root       = __dirname + '/../../';
var cols       = require(root + 'lib/krake/cols');
var fixtures   = require(root + 'tests/helpers/fixtures');
var _          = require('underscore');
var events     = require('events');

describe("cols#zip", function() {
  var task = fixtures.simple;
  it("should trigger the callback with objects..", function(done) {
    cols.cols(task, function(t) {
      cols.zip(t.cols, function(z) {
        expect(z.constructor).toEqual(Object);
        done(); // FIIIIIIRST
      });
    });
  }, 20*1000);
  it("each of which should include each column desc as a key", function(done) {
    cols.cols(task, function(t) {
      cols.zip(t.cols, function(z) {
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

describe("cols#cols", function() {
  var someTitles;
  beforeEach(function(){
    spyOn(cols, 'get').andCallFake(function(i, callback) {
      callback(false, false, fixtures.kitten);
    });
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
    cols.cols(fixtures.simple, function(attributed) {
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
    cols.cols(fixtures.simple, function(attributed) {
      var titles = attributed.cols[0].nodes;
      _.each(someTitles, function(title) {
        expect(titles).toContain(title);
      });
      done();
    });
  }, 20*1000);
  it("Retrieved data should be post-processed with str. functions, if provided", function(done){
    cols.cols(fixtures.simple_with_fn, function(attributed) {
      var titles = attributed.cols[0].nodes;
      var transformedTitles = _.map(someTitles, attributed.cols[0].fn);
      _.each(transformedTitles, function(title) {
        expect(titles).toContain(title);
      });
      done();
    });
  }, 20*1000);
});
