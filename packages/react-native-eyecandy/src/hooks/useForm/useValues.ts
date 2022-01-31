import {useCallback, useState} from 'react';

import {useUpdateEffect} from 'react-use';

import type {Fields, Values, Name} from './types';

export default function useValues<T extends Fields>(fields: T) {
  const createValues = useCallback(() => {
    return Object.entries(fields).reduce((vals, [name, field]) => {
      let initialValue = typeof field === 'string' ? field : field.initialValue;

      return {
        ...vals,
        [name]: initialValue || '',
      };
    }, {} as Values<T>);
  }, [fields]);

  const [values, setValues] = useState(createValues);

  const setValue = useCallback(
    (name: Name<T>, value: string) => setValues(v => ({...v, [name]: value})),
    [],
  );

  const clearValues = useCallback(
    () => setValues(createValues),
    [createValues],
  );

  useUpdateEffect(() => {
    clearValues();
  }, [clearValues]);

  return {values, setValue, setValues, clearValues};
}
