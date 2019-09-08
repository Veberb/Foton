const { isString, isNumber, isArray } = require('util');

module.exports = class Enum {
  constructor(enumValues = {}) {
    if (isArray(enumValues)) {
      enumValues.forEach(enumValue => {
        this[enumValue] = enumValue;
      });
    } else {
      Object.keys(enumValues).forEach(enumKey => {
        this[enumKey] = enumValues[enumKey];
      });
    }
  }

  list() {
    return Object.values(this).filter(prop => isString(prop) || isNumber(prop));
  }

  includes(value) {
    return this.list().includes(value.toUpperCase());
  }
};
