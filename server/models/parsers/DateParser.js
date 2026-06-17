const BaseParser = require('./BaseParser');

class DateParser extends BaseParser {
  constructor() {
    super('date', {
      format: 'YYYY-MM-DD HH:mm:ss'
    });
  }

  _getDefaultMin() {
    const now = Date.now();
    return new Date(now - 365 * 24 * 60 * 60 * 1000).toISOString();
  }

  _getDefaultMax() {
    return new Date(Date.now()).toISOString();
  }

  validate(rule, fieldName) {
    if (rule.min !== undefined) {
      this.validateType(rule, 'min', 'string', fieldName);
    }
    if (rule.max !== undefined) {
      this.validateType(rule, 'max', 'string', fieldName);
    }
    if (rule.format !== undefined) {
      this.validateType(rule, 'format', 'string', fieldName);
    }
  }

  transform(rule, fieldName) {
    return {
      min: this.getValue(rule, 'min', this._getDefaultMin()),
      max: this.getValue(rule, 'max', this._getDefaultMax()),
      format: this.getValue(rule, 'format', 'YYYY-MM-DD HH:mm:ss')
    };
  }
}

module.exports = DateParser;
