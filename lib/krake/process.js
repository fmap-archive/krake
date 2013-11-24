var jsdom   = require('jsdom');
var request = require('request');
var _       = require('underscore');
var xpath   = require('jsdom-xpath');
var expect  = require('./expect');
var URL     = require('url');
var utils   = require('./utils');

function attr(task, callback) {
  expect.hasObjectNodes(task);
  _.each(task.cols, function(column) {
    var attr = column.attr;
    column.nodes = _.map(column.nodes, function(node) {
      return (_.isUndefined(attr) ? node.innerHTML : node.getAttribute(attr));
    });
  });
  callback(task);
}

function scrape(task, callback) {
  utils.get(task.url, function(err, resp, body) {
    // TODO: error handling ;-)
    var window = jsdom.jsdom(body).parentWindow;
    task.cols = _.map(task.cols, function(column) {
      var nodes = xpath(column.sel, window.document);
      return _.extend(column, { nodes: nodes });
    });
    callback(task);
  });
}

function fneval(task, callback) {
  expect.hasStringNodes(task);
  _.each(task.cols, function(col) {
    if(typeof col.fn === "function") {
      col.nodes = _.map(col.nodes, col.fn);
    }
  });
  callback(task);
}

function sendResults(results, callback) {
  return function() {
    callback(results);
  };
}

function zip(subjects, callback) {
  var longest  = _.max(_.pluck(_.pluck(subjects, 'nodes'), 'length'));
  _.times(longest, function(i) {
    var results = {};
    var done = _.after(subjects.length, sendResults(results, callback));
    _.each(subjects, function(v) {
      if (!hasColumns(v)) {
        results[v.desc] = v.nodes[i];
        done();
      } else {
        zip(v.nodes[i].cols, function(res) {
          results[v.desc] = (res);
          done();
        });
      }
    });
  });
}

var hasColumns = function (obj) {
  return obj.cols;
};

function unnest (task, callback) {
  var nested = task.cols.filter(hasColumns);
  if (!nested||!nested.length) { return callback(task); }
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
  scrape(definition, function(t0) {
    attr(t0, function(t1) {
      fneval(t1, function(t2) {
        unnest(t2, callback);
      });
    }); 
  });
}

module.exports = function(spec, cb) {
  fetch(spec, function(subj) {
    zip(subj.cols, cb);
  });
};
