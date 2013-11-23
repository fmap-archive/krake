var root      = __dirname + '/../../';
var Krake     = require(root + 'lib/krake');
var normalise = require(root + 'lib/krake/normalise');
var cols      = require(root + 'lib/krake/cols');
var fixtures  = require(root + 'tests/helpers/fixtures');
var events    = require('events');

describe("Krake#scrape", function() {
  beforeEach(function() {
    spyOn(cols, 'get').andCallFake(function(i, callback) {
      callback(false, false, fixtures.kitten);
    });
  });
  it("Should return an emitter.", function(){
    var emitter = new Krake().scrape(fixtures.simple_with_fn);
    expect(emitter.constructor).toEqual(events.EventEmitter);
  });
  it("Should send 'retrieved' messages to the emitter when results have been retrieved, with an object as message.", function(done) {
    var emitter = new Krake().scrape(fixtures.simple_with_fn);
    emitter.addListener('retrieved', function(res) {
      expect(res.constructor).toEqual(Object);
      done(); // Test first received.
    });
  }, 2e4);
  it("Should send a 'completed' message to the emitter once all results have been retrieved", function(done) {
    var emitter = new Krake().scrape(fixtures.simple_with_fn);
    emitter.addListener('completed', function() {
      done(); // On fail, will hang indefinitely..? TODO
    });
  }, 2e4);
  it("Should send each subtask to createChannels.", function() {
    spyOn(cols, 'createChannels');
    var emitter = new Krake().scrape(fixtures.list_url);
    var normalised = normalise(fixtures.list_url);
    expect(cols.createChannels).toHaveBeenCalledWith(normalised, emitter);
  });
});
