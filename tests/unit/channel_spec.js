var root         = __dirname + '/../../';
var process      = require(root + 'lib/krake/process');
var channel      = require(root + 'lib/krake/channel');
var EventEmitter = require('events').EventEmitter;

describe("channel", function() {
  beforeEach(function() {
    ['cols','zip'].forEach(function(f) {
      spyOn(process,f).andCallFake(function(task, callback) {
        callback(42);
      });
    });
  });
  it("should export a function", function() {
    expect(channel.constructor).toEqual(Function);
  });
  it("should send a 'retrieved' event to the emitter with the result of zip", function(done) {
    var emitter = new EventEmitter();
    emitter.on('retrieved', function(res) {
      expect(res).toEqual(42);
      done();      
    });
    channel([""], emitter);
  });
  it("should send a 'completed' event at some point", function(done) {
    var emitter = new EventEmitter();
    emitter.on('completed', function() {
      done();      
    });
    channel([""], emitter);
  });
});
