var dom = require('dom');
var range = require('selection-range');
var within = require('within-selection');
var assert = require('assert');

describe('within-selection', function () {
  var el, el;

  beforeEach(function () {
    $el = dom('<div><p> hi there </p><p> another <span> paragraph</span> </p></div>');
    dom(document.body).append($el);
    el = $el[0];
  });

  afterEach(function () {
    $el.remove();
  })

  it('should return all the elements within a selection', function () {
    range(el, { start: 0, end: $el.text().length});
    var ps = within();
    assert(ps.length === 3);
  });

  it('should return elements matching the selector', function () {
    range(el, { start: 0, end: $el.text().length});
    assert(within('p').length === 2);
    assert(within('span').length === 1);
    assert(within('.bacon').length === 0);
  });

  it('should return an empty array when no selection', function () {
    assert(within().length === 0);
  });
});
