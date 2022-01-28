"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useValues;

var _react = require("react");

var _reactUse = require("react-use");

function useValues(fields) {
  const createValues = (0, _react.useCallback)(() => {
    return Object.entries(fields).reduce((vals, _ref) => {
      let [name, field] = _ref;
      let initialValue = typeof field === 'string' ? field : field.initialValue;
      return { ...vals,
        [name]: initialValue || ''
      };
    }, {});
  }, [fields]);
  const [values, setValues] = (0, _react.useState)(createValues);
  const setValue = (0, _react.useCallback)((name, value) => setValues(v => ({ ...v,
    [name]: value
  })), []);
  const clearValues = (0, _react.useCallback)(() => setValues(createValues), [createValues]);
  (0, _reactUse.useUpdateEffect)(() => {
    clearValues();
  }, [clearValues]);
  return {
    values,
    setValue,
    setValues,
    clearValues
  };
}
//# sourceMappingURL=useValues.js.map