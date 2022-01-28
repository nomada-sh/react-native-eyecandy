import { useCallback, useState } from 'react';
import { useUpdateEffect } from 'react-use';
export default function useValues(fields) {
  const createValues = useCallback(() => {
    return Object.entries(fields).reduce((vals, _ref) => {
      let [name, field] = _ref;
      let initialValue = typeof field === 'string' ? field : field.initialValue;
      return { ...vals,
        [name]: initialValue || ''
      };
    }, {});
  }, [fields]);
  const [values, setValues] = useState(createValues);
  const setValue = useCallback((name, value) => setValues(v => ({ ...v,
    [name]: value
  })), []);
  const clearValues = useCallback(() => setValues(createValues), [createValues]);
  useUpdateEffect(() => {
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