String.prototype.surround = function(str) {
  return [str,this,str].join('');
};

var glue = function(str) {
  str.prototype.surround = String.prototype.surround;
};

module.exports = { 
  glue: glue 
};
