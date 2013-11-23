var jsdom   = require('jsdom');
var request = require('request');
var _       = require('underscore');
var xpath   = require('jsdom-xpath');
var upcast  = require('upcast');
var expect  = require('./expect');
var URL     = require('url');

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

function get(url, callback) {
  request.get(url, callback);
}

function scrape(task, callback) {
  get(task.url, function(err, resp, body) {
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
    if (upcast.is(col.fn, 'function')) {
      col.nodes = _.map(col.nodes, col.fn);
    }
  });
  callback(task);
}

function zipCols(subjects, callback) {
  var longest  = _.max(_.pluck(_.pluck(subjects, 'nodes'), 'length'));
  _.times(longest, function(i) {
    var result = {};
    _.each(subjects, function(v) {
      result[v.desc] = v.nodes[i];
    });
    callback(result);  
  });
}

function createChannels(tasks, emitter) {
  var length = tasks.length, latest = 0;
  tasks.forEach(function(task, index) {
    latest++;
    createChannel(task, emitter, latest==length);
  });
}

function createChannel(task, emitter, last) {
  cols(task, function(task) {
    zipCols(task.cols, function(res){
      emitter.emit('retrieved', res);
      if (last) { emitter.emit('completed'); }
    });
  });
}

var hasColumns = function (obj) {
  return obj.cols;
};

function clone(o) {
  // :'(
  return JSON.parse(JSON.stringify(o));
}

function unnest (task, callback) {
  var nested = task.cols.filter(hasColumns);
  if (!nested) { return callback(task); }
  if (!nested.length) { return callback(task); }
  var total  = (nested.length * nested[0].nodes.length),
      called = 0;
  nested.forEach(function(column) {
    column.nodes.forEach(function(url,index) {
      var absoluteURL = URL.resolve(task.url, url); 
      cols({url: absoluteURL, cols: column.cols}, (function(d,i) {
        return function (res) {
          d.nodes[i] = clone(res);
          called++;
          if (called===total) {callback(task);}
        };
      })(column, index));
    });
  });
}

function cols(definition, callback) {
  expect.isNormalised(definition);
  scrape(definition, function(t0) {
    attr(t0, function(t1) {
      fneval(t1, function(t2) {
        unnest(t2, callback);
      });
    }); 
  });
}

module.exports = { cols: cols, get: get, zip: zipCols, createChannel : createChannel, createChannels: createChannels};
