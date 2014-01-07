var matches = require('matches-selector');

var NODETYPE_TEXT_NODE = 3;

function isMatch(node, selector){
  return node.nodeType !== 3 && matches(node, selector);
}

module.exports = function(selector){
  var range, selection, ancestor, all;
  var nodes = [];


  // Good browsers
  if (window.getSelection) {
    
    selection = window.getSelection();
    range = selection.getRangeAt(0);
    nodes = [];

    ancestor = range.commonAncestorContainer;
    if (ancestor.nodeType === NODETYPE_TEXT_NODE) {
      return nodes;
    }

    all = ancestor.getElementsByTagName('*');

    for (var i = 0, len = all.length; i < len; i++) {
      var el = all[i];
      if (selection.containsNode(el, true)){
        if (selector) {
          if (isMatch(el, selector)) {
            nodes.push(el);
          }
        } else {
          nodes.push(el); 
        }
      }
    }

    return nodes;

  // Older IE
  } else if (document.selection){
    // Give prayers.
    // Eventually do something like this:
    // http://stackoverflow.com/a/5801903/1198166
  }
};