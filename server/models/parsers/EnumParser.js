const BaseParser = require('./BaseParser');

class EnumParser extends BaseParser {
  constructor() {
    super('enum', {
      options: [],
      weights: []
    });
  }

  validate(rule, fieldName) {
    this.validateRequired(rule, 'options', fieldName, `字段 ${fieldName} 必须提供 options 数组`);
    this.validateArray(rule, 'options', fieldName, 1);

    if (rule.weights !== undefined) {
      this.validateArray(rule, 'weights', fieldName, 0);
    }
  }

  transform(rule, fieldName) {
    return {
      options: this.getValue(rule, 'options', []),
      weights: this.getValue(rule, 'weights', [])
    };
  }
}

module.exports = EnumParser;
