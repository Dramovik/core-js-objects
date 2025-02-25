class SelectorCombine {
  constructor(selector1, combinator, selector2) {
    this.selector1 = selector1.stringify();
    this.selector2 = selector2.stringify();
    this.combinator = combinator;
    this.returned();
  }

  returned() {
    return this;
  }

  stringify() {
    return `${this.selector1} ${this.combinator} ${this.selector2}`;
  }
}

module.exports = SelectorCombine;
