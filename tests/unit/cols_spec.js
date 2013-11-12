var root       = __dirname + '/../../';
var cols       = require(root + 'lib/krake/cols');
var fixtures   = require(root + 'tests/helpers/fixtures');
var _          = require('underscore');

describe("cols#zip", function() {
  var task = fixtures.simple;
  var taskKeys = ["title", "image", "owner", "page"];
  var someZipped = [ 
    { title: 'kitten hug',
      image: 'https://s.yimg.com/pw/images/spaceball.gif',
      owner: 'rodrigotrovao',
      page: '/photos/rodrigotrovao/4245998404/' 
    },
    { title: 'Kitten!',
      image: 'https://s.yimg.com/pw/images/spaceball.gif',
      owner: 'adamjseidl',
      page: '/photos/ajseidl/4981316470/' 
    },
    { title: 'Kittens!',
      image: 'https://s.yimg.com/pw/images/spaceball.gif',
      owner: 'beer_squirrel',
      page: '/photos/beersquirrel/349671331/' 
    } 
  ];
  it("should return a list of objects..", function(done) {
    cols.cols(task, function(f) {
      var zipped = cols.zip(f.cols);
      expect(zipped.constructor).toEqual(Array);
      _.each(zipped, function(rec) {
        expect(rec.constructor).toEqual(Object);
      });
      done();
    });
  }, 20*1000);
  it("each object including each of the task's keys..", function(done) {
    cols.cols(task, function(f) {
      var zipped = cols.zip(f.cols);
      _.each(zipped, function(rec) {
        var keys = _.keys(rec);
        _.each(taskKeys, function(key) {
          expect(keys).toContain(key);
        });
      });
      done();
    });
  }, 20*1000);
  it("the values being the page's processed, retrieved data..", function(done) {
    cols.cols(task, function(f) {
      var zipped = cols.zip(f.cols);
      _.each(someZipped, function(e) {
        expect(zipped).toContain(e);
      });
      done();
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
