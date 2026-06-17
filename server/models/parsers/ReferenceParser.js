const BaseParser = require('./BaseParser');

class ReferenceParser extends BaseParser {
  constructor() {
    super('reference', {
      unique: false
    });
  }

  validate(rule, fieldName) {
    this.validateRequired(rule, 'model', fieldName, `字段 ${fieldName} 必须指定引用的 model`);
    this.validateType(rule, 'model', 'string', fieldName);

    this.validateRequired(rule, 'field', fieldName, `字段 ${fieldName} 必须指定引用的 field`);
    this.validateType(rule, 'field', 'string', fieldName);

    if (rule.unique !== undefined) {
      this.validateType(rule, 'unique', 'boolean', fieldName);
    }
  }

  transform(rule, fieldName) {
    return {
      model: this.getValue(rule, 'model', ''),
      field: this.getValue(rule, 'field', ''),
      unique: this.getValue(rule, 'unique', false)
    };
  }
}

module.exports = ReferenceParser;
