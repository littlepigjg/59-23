const BaseParser = require('./BaseParser');

class NumberParser extends BaseParser {
  constructor() {
    super('number', {
      min: 0,
      max: 100,
      decimal: 0,
      step: 1
    });
  }

  validate(rule, fieldName) {
    const min = this.convertToNumber(rule, 'min', fieldName, 0);
    const max = this.convertToNumber(rule, 'max', fieldName, 100);
    this.validateMinMax({ min, max }, 'min', 'max', fieldName);

    if (rule.decimal !== undefined) {
      this.convertToNumber(rule, 'decimal', fieldName, 0);
    }

    if (rule.step !== undefined) {
      this.convertToNumber(rule, 'step', fieldName, 1);
    }
  }

  transform(rule, fieldName) {
    return {
      min: this.convertToNumber(rule, 'min', fieldName, 0),
      max: this.convertToNumber(rule, 'max', fieldName, 100),
      decimal: this.convertToNumber(rule, 'decimal', fieldName, 0),
      step: this.convertToNumber(rule, 'step', fieldName, 1)
    };
  }
}

module.exports = NumberParser;
