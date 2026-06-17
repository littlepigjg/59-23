const { parserFactory, getValidTypes } = require('./parsers');
const { RuleValidator } = require('./validators');

class ModelParser {
  constructor() {
    this.parserFactory = parserFactory;
  }

  get validTypes() {
    return this.parserFactory.getValidTypes();
  }

  get validFormats() {
    return [
      'chineseName', 'englishName', 'email', 'phone', 'idCard',
      'address', 'company', 'title', 'sentence', 'paragraph',
      'url', 'ip', 'uuid', 'custom'
    ];
  }

  parse(model) {
    RuleValidator.validateType(model, 'object', 'model');
    RuleValidator.validateRequired(model.name, 'model.name', '模型必须包含 name 字段');
    RuleValidator.validateType(model.name, 'string', 'model.name');

    RuleValidator.validateRequired(model.fields, 'model.fields', '模型必须包含 fields 数组');
    RuleValidator.validateType(model.fields, 'array', 'model.fields');

    if (model.fields.length === 0) {
      throw new Error('模型至少需要一个字段');
    }

    const parsedFields = model.fields.map((field, index) => {
      return this.parseField(field, index);
    });

    const fieldNames = parsedFields.map(f => f.name);
    const duplicates = fieldNames.filter((name, index) => fieldNames.indexOf(name) !== index);
    if (duplicates.length > 0) {
      throw new Error(`存在重复的字段名: ${duplicates.join(', ')}`);
    }

    return {
      name: model.name,
      fields: parsedFields
    };
  }

  parseField(field, index) {
    RuleValidator.validateType(field, 'object', `第 ${index + 1} 个字段`);
    RuleValidator.validateRequired(field.name, `第 ${index + 1} 个字段.name`, `第 ${index + 1} 个字段必须包含 name 属性`);
    RuleValidator.validateType(field.name, 'string', `第 ${index + 1} 个字段.name`);

    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(field.name)) {
      throw new Error(`字段名 ${field.name} 格式不正确，只能包含字母、数字和下划线，且不能以数字开头`);
    }

    RuleValidator.validateRequired(field.type, `字段 ${field.name}.type`, `字段 ${field.name} 必须包含 type 属性`);
    RuleValidator.validateEnum(field.type, this.validTypes, `字段 ${field.name}.type`);

    const rule = this.parseRule(field.rule || {}, field.type, field.name);

    return {
      name: field.name,
      type: field.type,
      label: field.label || field.name,
      rule: rule,
      nullable: field.nullable || false,
      nullProbability: field.nullProbability || 0
    };
  }

  parseRule(rule, type, fieldName) {
    return this.parserFactory.parseRule(type, rule, fieldName);
  }
}

module.exports = ModelParser;
