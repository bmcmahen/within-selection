var matches = require('matches-selector');

function isMatch(node, selector){
  return node.nodeType !== 3 && matches(node, selector);
}

module.exports = function(selector){
  // Good browsers
  if (window.getSelection) {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var start = range.startContainer;
    var end = range.endContainer;

    var current = start;
    var nodes = [];

    while (current != end) {
      if (selector){
        if (isMatch(current, selector)){
          nodes.push(current);
        }
      } else {
        nodes.push(current);
      }
      current = current.nextSibling;
    };

    return nodes;

  // Older IE
  } else if (document.selection){
    // Give prayers.
  }
}