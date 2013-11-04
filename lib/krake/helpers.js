type = function(obj) {
  var constructor = obj.constructor.toString();
  var pattern     = /^function ([^(]+)\(/;
  var matches     = pattern.exec(constructor);
  return (matches[1] || "");
};

isT = function (obj, str) {
  return (type(obj) === str);
};

isArray = function(obj) {
  return isT(obj, "Array");
};

isObject = function(obj) {
  return isT(obj, "Object");
};

module.exports = {
  isObject: isObject 
};
