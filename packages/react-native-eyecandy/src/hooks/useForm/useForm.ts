import { useCallback, useRef } from 'react';

import type { Fields, InputProps, Message, Name, Error } from './types';
import useErrors from './useErrors';
import useMessages from './useMessages';
import useValues from './useValues';

export default function useForm<T extends Fields>(initialFields: T) {
  const fieldsRef = useRef<T>(initialFields);
  if (JSON.stringify(fieldsRef.current) !== JSON.stringify(initialFields))
    fieldsRef.current = initialFields;

  const fields = fieldsRef.current;

  const { values, setValue, clearValues } = useValues(fields);
  const { errors, setError, clearErrors, validate } = useErrors(fields);

  const messages = useMessages(fields, errors);

  const onChange = useCallback(
    (name: Name<T>) => (value: string) => {
      const field = fields[name];
      const error = validate(name, value);

      setError(name, error);
      setValue(name, value);

      typeof field !== 'string' && field.onChange?.(value);
    },
    [fields, setError, setValue, validate],
  );

  const register = useCallback(
    (name: Name<T>) => {
      const createErrors = () => {
        // TODO: Refactor this.
        const errs = errors[name] as Error;
        const msgs = messages[name] as Message;

        const result: [boolean, string][] = [];
        for (let k in errs) {
          const err = errs[k as keyof typeof errs] as boolean;
          const msg = msgs[k as keyof typeof msgs] as string;
          if (err && msg) result.push([err, msg]);
        }

        return result;
      };

      let props: InputProps = {
        onChangeText: onChange(name),
        value: values[name],
        errors: createErrors(),
      };

      const field = fields[name];
      if (typeof field !== 'string') {
        if (typeof field.maxLength === 'number')
          props.maxLength = field.maxLength;
        else if (field.maxLength) props.maxLength = field.maxLength[0];

        if (field.required) props.required = true;
      }

      return props;
    },
    [errors, fields, messages, onChange, values],
  );

  const onSubmit = useCallback(
    (
      handleSubmit: (v: typeof values) => void,
      extraValidation?: (v: typeof values) => boolean,
    ) => {
      const valid = Object.keys(values).reduce((result, name) => {
        const error = validate(name, values[name]);
        setError(name, error);
        return result && Object.keys(error).length === 0;
      }, true);

      const extra = extraValidation ? extraValidation(values) : true;

      valid && extra && handleSubmit(values);
    },
    [setError, validate, values],
  );

  const clear = useCallback(() => {
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
    clear,
  };
}
