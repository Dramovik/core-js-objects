function joined(arr) {
  return arr.join('');
}
function queueError() {
  throw new Error(
    'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
  );
}

class SelectorBuilder {
  cssElement = null;

  cssId = null;

  cssClass = [];

  cssAttr = [];

  cssPseudoClass = [];

  cssPseudoElement = null;

  status = 0;

  /*
    status:
    1.element
    2.id
    3.class
    4.attr
    5.pseudoClass
    6.pseudoElement
  */

  element(value) {
    if (this.cssElement !== null) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    } else if (this.status >= 1) {
      queueError();
    }
    this.cssElement = `${value}`;
    this.status = 1;
    return this;
  }

  id(value) {
    if (this.cssId !== null) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    } else if (this.status >= 2) {
      queueError();
    }
    this.cssId = `#${value}`;
    this.status = 2;
    return this;
  }

  class(value) {
    if (this.status > 3) {
      queueError();
    }
    this.status = 3;
    this.cssClass.push(`.${value}`);
    return this;
  }

  attr(value) {
    if (this.status > 4) {
      queueError();
    }
    this.status = 4;
    this.cssAttr.push(`[${value}]`);
    return this;
  }

  pseudoClass(value) {
    if (this.status > 5) {
      queueError();
    }
    this.status = 5;
    this.cssPseudoClass.push(`:${value}`);
    return this;
  }

  pseudoElement(value) {
    if (this.cssPseudoElement !== null) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    } else if (this.status >= 6) {
      queueError();
    }
    this.status = 6;
    this.cssPseudoElement = `::${value}`;
    return this;
  }

  stringify() {
    let result = '';
    if (this.cssElement !== null) result = `${result}${this.cssElement}`;
    if (this.cssId !== null) result = `${result}${this.cssId}`;
    if (this.cssClass.length > 0) result = `${result}${joined(this.cssClass)}`;
    if (this.cssAttr.length > 0) result = `${result}${joined(this.cssAttr)}`;
    if (this.cssPseudoClass.length > 0)
      result = `${result}${joined(this.cssPseudoClass)}`;
    if (this.cssPseudoElement !== null)
      result = `${result}${this.cssPseudoElement}`;
    return result;
  }
}

module.exports = SelectorBuilder;
