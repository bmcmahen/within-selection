var matches = require('matches-selector');

function isMatch(node, selector){
  return node.nodeType !== 3 && matches(node, selector);
}

module.exports = function(selector){
  // Good browsers
  if (window.getSelection) {
    
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var all = range.commonAncestorContainer.getElementsByTagName('*');
    var nodes = [];

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
  }
}