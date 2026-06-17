const StringParser = require('./StringParser');
const NumberParser = require('./NumberParser');
const BooleanParser = require('./BooleanParser');
const DateParser = require('./DateParser');
const EnumParser = require('./EnumParser');
const ReferenceParser = require('./ReferenceParser');
const BaseParser = require('./BaseParser');

class ParserFactory {
  constructor() {
    this.parsers = new Map();
    this._registerDefaultParsers();
  }

  _registerDefaultParsers() {
    this.register('string', new StringParser());
    this.register('number', new NumberParser());
    this.register('boolean', new BooleanParser());
    this.register('date', new DateParser());
    this.register('enum', new EnumParser());
    this.register('reference', new ReferenceParser());
  }

  register(type, parser) {
    if (!(parser instanceof BaseParser)) {
      throw new Error(`解析器必须继承自 BaseParser`);
    }
    this.parsers.set(type, parser);
  }

  getParser(type) {
    const parser = this.parsers.get(type);
    if (!parser) {
      throw new Error(`未知的字段类型: ${type}，支持的类型: ${this.getValidTypes().join(', ')}`);
    }
    return parser;
  }

  getValidTypes() {
    return Array.from(this.parsers.keys());
  }

  hasParser(type) {
    return this.parsers.has(type);
  }

  parseRule(type, rule, fieldName) {
    const parser = this.getParser(type);
    return parser.parse(rule, fieldName);
  }
}

const parserFactory = new ParserFactory();

module.exports = {
  ParserFactory,
  parserFactory,
  BaseParser,
  StringParser,
  NumberParser,
  BooleanParser,
  DateParser,
  EnumParser,
  ReferenceParser,
  getValidTypes: () => parserFactory.getValidTypes(),
  parseRule: (type, rule, fieldName) => parserFactory.parseRule(type, rule, fieldName)
};
