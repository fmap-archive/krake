var jsdom   = require('jsdom');
var request = require('request');
var _       = require('underscore');
var xpath   = require('jsdom-xpath');
var upcast  = require('upcast');
var expect  = require('./expect');

function attr(task, callback) {
  expect.objectNodes(task);
  _.each(task.cols, function(column) {
    var attr = column.attr;
    column.nodes = _.map(column.nodes, function(node) {
      return (_.isUndefined(attr) ? node.innerText : node.getAttribute(attr));
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
  expect.stringNodes(task);
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

function createChannel(task, emitter) {
  cols(task, function(task) {
    zipCols(task.cols, function(res){
      emitter.emit('retrieved', res);
    });
  });
}

function cols(definition, callback) {
  expect.normalised(definition);
  scrape(definition, function(t0) {
    attr(t0, function(t1) {
      fneval(t1, callback);
    }); 
  });
}

module.exports = { cols: cols, get: get, zip: zipCols, createChannel : createChannel};
