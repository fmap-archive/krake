var root         = __dirname + '/../../';
var channel      = require(root + 'lib/krake/channel');
var EventEmitter = require('events').EventEmitter;
var fixture      = require(root + 'tests/helpers/fixtures').simple_with_fn;

describe("channel", function() {
  var tasks = [fixture];
  it("should export a function", function() {
    expect(channel.constructor).toEqual(Function);
  });
  it("should send a 'retrieved' event to the emitter with the result of zip", function(done) {
    var emitter = new EventEmitter();
    emitter.on('retrieved', function(res) {
      done();      
    });
    channel(tasks, emitter);
  }, 2e5);
  it("should send a 'completed' event at some point", function(done) {
    var emitter = new EventEmitter();
    emitter.on('completed', function() {
      done();      
    });
    channel(tasks, emitter);
  }, 2e5);
});
