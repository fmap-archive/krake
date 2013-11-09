var root = '../';
var path = require(root + 'node_modules/jsdom/lib/jsdom/level3/xpath.js');
var evaluator = new path.XPathEvaluator();
var res  = path.XPathResult;

var xpath = function(query, document) {
  var result = evaluator.evaluate(query, document, document, res.ORDERED_NODE_SNAPSHOT_TYPE);
  return(result._value.nodes);
};

module.exports = {
  xpath: xpath
};
