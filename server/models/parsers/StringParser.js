const BaseParser = require('./BaseParser');

const validFormats = [
  'chineseName', 'englishName', 'email', 'phone', 'idCard',
  'address', 'company', 'title', 'sentence', 'paragraph',
  'url', 'ip', 'uuid', 'custom'
];

class StringParser extends BaseParser {
  constructor() {
    super('string', {
      format: null,
      pattern: null,
      minLength: 1,
      maxLength: 20,
      options: [],
      prefix: '',
      suffix: ''
    });
  }

  validate(rule, fieldName) {
    if (rule.format) {
      this.validateEnum(rule, 'format', validFormats, fieldName);
    }

    if (rule.format === 'custom') {
      this.validateRequired(rule, 'pattern', fieldName, `字段 ${fieldName} 使用 custom 格式时必须提供 pattern`);
    }

    if (rule.pattern) {
      this.validateRegex(rule, 'pattern', fieldName);
    }

    if (rule.minLength !== undefined) {
      this.convertToNumber(rule, 'minLength', fieldName, 1);
    }

    if (rule.maxLength !== undefined) {
      this.convertToNumber(rule, 'maxLength', fieldName, 20);
    }

    this.validateMinMax(rule, 'minLength', 'maxLength', fieldName);
  }

  transform(rule, fieldName) {
    return {
      format: this.getValue(rule, 'format', null),
      pattern: this.getValue(rule, 'pattern', null),
      minLength: this.convertToNumber(rule, 'minLength', fieldName, 1),
      maxLength: this.convertToNumber(rule, 'maxLength', fieldName, 20),
      options: this.getValue(rule, 'options', []),
      prefix: this.getValue(rule, 'prefix', ''),
      suffix: this.getValue(rule, 'suffix', '')
    };
  }
}

module.exports = StringParser;
