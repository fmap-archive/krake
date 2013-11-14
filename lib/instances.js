var _    = require('underscore');
var type = require('./typecheck').type;

var instances = {
  Array: require('./instances/list')
};

var errC = function(name) {
  var msg = _.template("There aren't any instances for type <%=name%>!");
  return new Error(msg({name:name}));
};

var errT = function(k,v) {
  var msg = _.template("Missing <%=tc%> instance for <%=type%>!");
  return new Error(msg({tc: k, type: type(v)}));
};

var retrieve = function(value, wants) {//pick
  var name = type(value);
  var types = instances[name] || errC(name);
  var result = {};
  _.each(wants, function(name) {
    var type = types[name]; 
    result[name] = type!==undefined?type:errT(name,value);
  });
  return result;
};

module.exports.retrieve = retrieve;

var endow = function(value, wants) {
  var instances = retrieve(value, wants);
  return _.extend(value, instances);
};

module.exports.endow = endow;
