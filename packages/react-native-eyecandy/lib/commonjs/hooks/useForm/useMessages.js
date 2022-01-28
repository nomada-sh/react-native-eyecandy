"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMessages;

var _react = require("react");

const firstLetterToUpperCase = str => {
  if (typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function extractMessage(key, validation, name, defaultMessage) {
  const nameFormatted = firstLetterToUpperCase(name);

  if (validation instanceof Array) {
    return typeof validation[1] === 'function' ? validation[1](validation[0]) : validation[1];
  }

  if (validation !== undefined) return defaultMessage(nameFormatted, validation);
  return `${nameFormatted} is not valid. (${key})`;
}

function useMessages(fields, errors) {
  const extractMessages = (0, _react.useCallback)((name, key) => {
    const nameFormatted = firstLetterToUpperCase(name);
    const field = fields[name]; // !Should never happen.

    if (typeof field === 'string') throw new Error(`Field ${name} has no validation requirements`);

    switch (key) {
      case 'required':
        return typeof field.required === 'string' ? field.required : `${nameFormatted} is required.`;

      case 'maxLength':
        return extractMessage('maxLength', field.maxLength, name, (n, v) => `${n} must be at most ${v} characters long.`);

      case 'minLength':
        return extractMessage('minLength', field.minLength, name, (n, v) => `${n} must be at least ${v} characters long.`);

      case 'validate':
        return extractMessage('validate', field.validate, name, n => `${n} is not valid.`);

      case 'is':
        return extractMessage('is', field.is, name, (n, v) => `${n} must be a valid ${v}.`);

      default:
        throw new Error(`Unknown error key: ${key}`);
    }
  }, [fields]);
  const getMessages = (0, _react.useCallback)((name, error) => {
    return Object.entries(error).reduce((acc, _ref) => {
      let [key, value] = _ref;
      if (!value) return acc;
      return { ...acc,
        [key]: extractMessages(name, key)
      };
    }, {});
  }, [extractMessages]);
  const messages = (0, _react.useMemo)(() => {
    return Object.entries(errors).reduce((m, _ref2) => {
      let [name, error] = _ref2;
      return { ...m,
        [name]: getMessages(name, error)
      };
    }, {});
  }, [errors, getMessages]);
  return messages;
}
//# sourceMappingURL=useMessages.js.map