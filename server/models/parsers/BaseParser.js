const { RuleValidator } = require('../validators');

class BaseParser {
  constructor(type, defaults = {}) {
    this.type = type;
    this.defaults = defaults;
  }

  parse(rule, fieldName) {
    const mergedRule = { ...this.defaults, ...rule };
    this.validate(mergedRule, fieldName);
    return this.transform(mergedRule, fieldName);
  }

  validate(rule, fieldName) {
  }

  transform(rule, fieldName) {
    return rule;
  }

  getValue(rule, key, defaultValue) {
    return rule[key] !== undefined ? rule[key] : defaultValue;
  }

  validateRequired(rule, key, fieldName, message) {
    return RuleValidator.validateRequired(rule[key], `${fieldName}.${key}`, message);
  }

  validateType(rule, key, expectedType, fieldName) {
    return RuleValidator.validateType(rule[key], expectedType, `${fieldName}.${key}`);
  }

  validateRange(rule, key, min, max, fieldName) {
    return RuleValidator.validateRange(rule[key], min, max, `${fieldName}.${key}`);
  }

  validateEnum(rule, key, validValues, fieldName) {
    return RuleValidator.validateEnum(rule[key], validValues, `${fieldName}.${key}`);
  }

  convertToNumber(rule, key, fieldName, defaultValue) {
    return RuleValidator.convertToNumber(rule[key], `${fieldName}.${key}`, defaultValue);
  }

  validateRegex(rule, key, fieldName) {
    return RuleValidator.validateRegex(rule[key], fieldName);
  }

  validateMinMax(rule, minKey, maxKey, fieldName) {
    const min = rule[minKey];
    const max = rule[maxKey];
    return RuleValidator.validateMinMax(min, max, fieldName);
  }

  validateArray(rule, key, fieldName, minLength = 1) {
    return RuleValidator.validateArray(rule[key], `${fieldName}.${key}`, minLength);
  }
}

module.exports = BaseParser;
