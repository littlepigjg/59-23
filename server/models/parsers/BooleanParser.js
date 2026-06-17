const BaseParser = require('./BaseParser');

class BooleanParser extends BaseParser {
  constructor() {
    super('boolean', {
      probability: 0.5
    });
  }

  validate(rule, fieldName) {
    if (rule.probability !== undefined) {
      const probability = this.convertToNumber(rule, 'probability', fieldName, 0.5);
      this.validateRange({ probability }, 'probability', 0, 1, fieldName);
    }
  }

  transform(rule, fieldName) {
    return {
      probability: this.convertToNumber(rule, 'probability', fieldName, 0.5)
    };
  }
}

module.exports = BooleanParser;
