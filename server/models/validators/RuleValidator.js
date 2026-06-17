class RuleValidator {
  static validateRequired(value, fieldName, message) {
    if (value === undefined || value === null || value === '') {
      throw new Error(message || `字段 ${fieldName} 是必填的`);
    }
    return value;
  }

  static validateType(value, expectedType, fieldName) {
    if (value === undefined || value === null) return value;
    const actualType = Array.isArray(value) ? 'array' : typeof value;
    if (actualType !== expectedType) {
      throw new Error(`字段 ${fieldName} 必须是 ${expectedType} 类型，实际为 ${actualType}`);
    }
    return value;
  }

  static validateRange(value, min, max, fieldName) {
    if (value === undefined || value === null) return value;
    const numValue = Number(value);
    if (min !== undefined && numValue < min) {
      throw new Error(`字段 ${fieldName} 的值不能小于 ${min}`);
    }
    if (max !== undefined && numValue > max) {
      throw new Error(`字段 ${fieldName} 的值不能大于 ${max}`);
    }
    return numValue;
  }

  static validateEnum(value, validValues, fieldName) {
    if (value === undefined || value === null) return value;
    if (!validValues.includes(value)) {
      throw new Error(`字段 ${fieldName} 的值必须是: ${validValues.join(', ')}`);
    }
    return value;
  }

  static convertToNumber(value, fieldName, defaultValue) {
    if (value === undefined || value === null) return defaultValue;
    const num = Number(value);
    if (isNaN(num)) {
      throw new Error(`字段 ${fieldName} 必须是有效的数字`);
    }
    return num;
  }

  static validateRegex(pattern, fieldName) {
    if (pattern === undefined || pattern === null) return pattern;
    try {
      new RegExp(pattern);
    } catch (e) {
      throw new Error(`字段 ${fieldName} 的 pattern 不是有效的正则表达式`);
    }
    return pattern;
  }

  static validateMinMax(min, max, fieldName) {
    if (min !== undefined && max !== undefined && min > max) {
      throw new Error(`字段 ${fieldName} 的 min 不能大于 max`);
    }
  }

  static validateArray(value, fieldName, minLength = 1) {
    if (!Array.isArray(value)) {
      throw new Error(`字段 ${fieldName} 必须是数组`);
    }
    if (minLength > 0 && value.length === 0) {
      throw new Error(`字段 ${fieldName} 至少需要 ${minLength} 个元素`);
    }
    return value;
  }
}

module.exports = RuleValidator;
