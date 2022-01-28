"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useForm;

var _react = require("react");

var _useErrors = _interopRequireDefault(require("./useErrors"));

var _useMessages = _interopRequireDefault(require("./useMessages"));

var _useValues = _interopRequireDefault(require("./useValues"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useForm(initialFields) {
  const fieldsRef = (0, _react.useRef)(initialFields);
  if (JSON.stringify(fieldsRef.current) !== JSON.stringify(initialFields)) fieldsRef.current = initialFields;
  const fields = fieldsRef.current;
  const {
    values,
    setValue,
    clearValues
  } = (0, _useValues.default)(fields);
  const {
    errors,
    setError,
    clearErrors,
    validate
  } = (0, _useErrors.default)(fields);
  const messages = (0, _useMessages.default)(fields, errors);
  const onChange = (0, _react.useCallback)(name => value => {
    var _field$onChange;

    const field = fields[name];
    const error = validate(name, value);
    setError(name, error);
    setValue(name, value);
    typeof field !== 'string' && ((_field$onChange = field.onChange) === null || _field$onChange === void 0 ? void 0 : _field$onChange.call(field, value));
  }, [fields, setError, setValue, validate]);
  const register = (0, _react.useCallback)(name => {
    const createErrors = () => {
      // TODO: Refactor this.
      const errs = errors[name];
      const msgs = messages[name];
      const result = [];

      for (let k in errs) {
        const err = errs[k];
        const msg = msgs[k];
        if (err && msg) result.push([err, msg]);
      }

      return result;
    };

    let props = {
      onChangeText: onChange(name),
      value: values[name],
      errors: createErrors()
    };
    const field = fields[name];

    if (typeof field !== 'string') {
      if (typeof field.maxLength === 'number') props.maxLength = field.maxLength;else if (field.maxLength) props.maxLength = field.maxLength[0];
      if (field.required) props.required = true;
    }

    return props;
  }, [errors, fields, messages, onChange, values]);
  const onSubmit = (0, _react.useCallback)((handleSubmit, extraValidation) => {
    const valid = Object.keys(values).reduce((result, name) => {
      const error = validate(name, values[name]);
      setError(name, error);
      return result && Object.keys(error).length === 0;
    }, true);
    const extra = extraValidation ? extraValidation(values) : true;
    valid && extra && handleSubmit(values);
  }, [setError, validate, values]);
  const clear = (0, _react.useCallback)(() => {
    clearErrors();
    clearValues();
  }, [clearErrors, clearValues]);
  return {
    errors,
    messages,
    values,
    onChange,
    onSubmit,
    register,
    clearErrors,
    clearValues,
    clear
  };
}
//# sourceMappingURL=useForm.js.map