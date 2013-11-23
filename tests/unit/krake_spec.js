var root      = __dirname + '/../../';
var Krake     = require(root + 'lib/krake');
var normalise = require(root + 'lib/krake/normalise');
var channel   = require(root + 'lib/krake/channel');
var fixtures  = require(root + 'tests/helpers/fixtures');
var events    = require('events');

describe("Krake#scrape", function() {
  it("Should return an emitter.", function(){
    var emitter = new Krake().scrape(fixtures.simple_with_fn);
    expect(emitter.constructor).toEqual(events.EventEmitter);
  });
  xit("Should send each subtask to createChannels.", function() {
    spyOn(cols, 'createChannels');
    var emitter = new Krake().scrape(fixtures.list_url);
    var normalised = normalise(fixtures.list_url);
    expect(cols.createChannels).toHaveBeenCalledWith(normalised, emitter);
  });
});
