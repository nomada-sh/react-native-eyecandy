import { useCallback, useState } from 'react';
import { useUpdateEffect } from 'react-use';

function getValidation(validation) {
  if (validation === undefined) return undefined;

  switch (typeof validation) {
    case 'function':
    case 'number':
    case 'string':
      return validation;
  }

  if (validation instanceof Array) return validation[0];
  return undefined;
}

function performValidation(validation, func) {
  const validationValue = getValidation(validation);
  return validationValue === undefined ? true : func(validationValue);
}

export default function useErrors(fields) {
  const createErrors = useCallback(() => {
    return Object.entries(fields).reduce((vals, _ref) => {
      let [name] = _ref;
      return { ...vals,
        [name]: {}
      };
    }, {});
  }, [fields]);
  const [errors, setErrors] = useState(createErrors);
  const setError = useCallback((name, error) => setErrors(prevErrors => {
    const newErrors = { ...prevErrors,
      [name]: error
    };
    const equal = JSON.stringify(newErrors) === JSON.stringify(prevErrors);
    return equal ? prevErrors : newErrors;
  }), []);
  const clearErrors = useCallback(() => setErrors(createErrors), [createErrors]);
  const validate = useCallback((name, value) => {
    const error = {};
    const field = fields[name];
    if (typeof field === 'string') return error; // Required validation

    const required = field.required ? value.length > 0 : true; // Custom validation

    let validation = performValidation(field.validate, v => v(value)); // Max length validation

    let maxLength = performValidation(field.maxLength, v => value.length <= v); // Min length validation

    let minLength = performValidation(field.minLength, v => value.length >= v); // Is validation

    let is = performValidation(field.is, v => {
      switch (v) {
        case 'email':
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        case 'number':
          return /^\d+$/.test(value);
      }
    });
    if (!required) error.required = true;
    if (!validation) error.validate = true;
    if (!maxLength) error.maxLength = true;
    if (!minLength) error.minLength = true;
    if (!is) error.is = true;
    return error;
  }, [fields]);
  useUpdateEffect(() => {
    clearErrors();
  }, [clearErrors]);
  return {
    errors,
    setErrors,
    setError,
    clearErrors,
    validate
  };
}
//# sourceMappingURL=useErrors.js.map