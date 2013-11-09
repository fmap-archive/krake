type = function(obj) {
  if (typeof(obj) === "undefined") {
    return "Undefined";
  }
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

isString = function(obj) {
  return isT(obj, "String");
};

isFunction = function(obj) {
  return isT(obj, "Function");
};

module.exports = {
  isObject: isObject,
  isFunction: isFunction,
  type: type
};
