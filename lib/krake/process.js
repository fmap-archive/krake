var jsdom   = require('jsdom');
var _       = require('underscore');
var xpath   = require('jsdom-xpath');
var expect  = require('./expect');
var URL     = require('url');
var utils   = require('./utils');
var jQuery  = require('jquery');

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

function runQuery(query, document) {
// The CSS parser almost always rejects XPath selectors. 
// The XPath parser almost always accepts CSS selectors.
// 
// If we accept a slight performance overhead, we can discriminate between them
// automatically:

  try {
    var window = document.defaultView;
    return window.$(query);
  } catch (_) {
    return xpath(query, document);
  }
}

function getContent(window) {
  return function(column) {
    return _.extend(column, {
      nodes: runQuery(column.sel, window.document)
    });
  };
}

function getContents(task, callback) {
  utils.get(task.url, function(err, resp, body) {
    if (!err && resp.statusCode == 200) {
      jsdom.env(
        body, [], function (err, window) {
          window.$ = jQuery.create(window);
          task.cols = _.map(task.cols, getContent(window));
          callback(task);
        }
      );
    } else { 
      console.error("Something went wrong, and we couldn't retrieve <" + task.url +">.");
      console.error(err);
      resp && console.error(resp.statusCode);
    }
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

function sendResults(results, last, callback) {
  callback(results, last);
}

function appendNode (column, index, callback) {
  var node = column.nodes[index];
  !hasColumns(column) ? callback(node) : zip(node.cols, callback);
}

function zip(subjects, callback) {
  var nodesLength = _(subjects).pluck('nodes')[0].length;
  var last = _.after(nodesLength, function(){return true;});
  _.times(nodesLength, function(i) {
    var results = {};
    var done = _.after(subjects.length, sendResults);
    _.each(subjects, function(v) {
      appendNode(v, i, function(res) {
        results[v.desc] = res;
        done(results, last(), callback);
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
