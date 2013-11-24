var jsdom   = require('jsdom');
var _       = require('underscore');
var xpath   = require('jsdom-xpath');
var expect  = require('./expect');
var URL     = require('url');
var utils   = require('./utils');

function getAttribute(attr) {
  return function(node) {
    return _.isUndefined(attr) ? node.innerHTML : node.getAttribute(attr);
  };
}

function getAttributes(task, callback) {
  expect.hasObjectNodes(task);
  _.each(task.cols, function(column) {
    column.nodes = _.map(column.nodes, getAttribute(column.attr));
  });
  callback(task);
}

function getContent(window) {
  return function(column) {
    return _.extend(column, {
      nodes: xpath(column.sel, window.document)
    });
  };
}

function getContents(task, callback) {
  utils.get(task.url, function(err, resp, body) {
    var window = jsdom.jsdom(body).parentWindow;
    task.cols = _.map(task.cols, getContent(window));
    callback(task);
  });
}

function runFunction(col) {
  if (typeof col.fn === "function")
    col.nodes = _.map(col.nodes, col.fn);
  return col;
}

function runFunctions(task, callback) {
  expect.hasStringNodes(task);
  _.map(task.cols, runFunction);
  callback(task);
}

function sendResults(results, callback) {
  return function() {
    callback(results);
  };
}

function appendNode (column, index, callback) {
  var node = column.nodes[index];
  !hasColumns(column) ? callback(node) : zip(node.cols, callback);
}

function zip(subjects, callback) {
  _.chain(subjects).pluck('nodes').pluck('length').max().times(function(i) {
    var results = {};
    var done = _.after(subjects.length, sendResults(results, callback));
    _.each(subjects, function(v) {
      appendNode(v, i, function(res) {
        results[v.desc] = res;
        done();
      });
    });
  });
}

var hasColumns = function (obj) {
  return obj.cols;
};

function resolveNested (task, callback) {
  var nested = task.cols.filter(hasColumns);
  if (!nested||!nested.length) {return callback(task);}
  var total = (nested.length * nested[0].nodes.length);
  var done = _.after(total,function(){callback(task);});
  nested.forEach(function(column) {
    column.nodes.forEach(function(url,index) {
      var absoluteURL = URL.resolve(task.url, url); 
      fetch({url: absoluteURL, cols: column.cols}, (function(d,i) {
        return function (res) {
          d.nodes[i] = utils.clone(res);
          done();
        };
      })(column, index));
    });
  });
}

function fetch(definition, callback) {
  expect.isNormalised(definition);
  getContents(definition, function(t0) {
    getAttributes(t0, function(t1) {
      runFunctions(t1, function(t2) {
        resolveNested(t2, callback);
      });
    }); 
  });
}

module.exports = function(spec, cb) {
  fetch(spec, function(subj) {
    zip(subj.cols, cb);
  });
};
