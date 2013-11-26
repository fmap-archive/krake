var fixtures = require('./fixtures');

module.exports.request = {
  get: function(url, callback) {
    switch(url) {
      case 'kittens.html': callback(undefined, undefined, fixtures.kittens),
      else: callback(new Error, undefined, undefined)
    };
  };
};
