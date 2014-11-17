/**
 * Module dependencies
 */

var matches;

try {
  matches = require('component-matches-selector');
} catch (e) {
  matches = require('matches-selector');
}

var TEXT_NODE_TYPE = 3;

/**
 * Get elements within a selection
 * @param  {String} selector
 * @return {Array}
 */

module.exports = function(selector){
  var selection = window.getSelection();
  var range = selection.getRangeAt(0);
  var nodes = [];
  if (range.collapsed) return nodes;
  var ancestor = range.commonAncestorContainer;

  if (ancestor.nodeType === TEXT_NODE_TYPE) {
    return nodes;
  }

  var all = ancestor.getElementsByTagName('*');

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
};


/**
 * Determine if node matches a selector
 * @param {Element} node
 * @param {String} selector
 */

function isMatch(node, selector){
  return node.nodeType !== 3 && matches(node, selector);
}
