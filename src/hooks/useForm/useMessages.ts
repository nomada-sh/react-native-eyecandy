import { useCallback, useMemo } from 'react';

import type {
  Fields,
  Errors,
  Messages,
  Error,
  Message,
  Name,
  ValidationType,
  Validation,
} from './typings';

const firstLetterToUpperCase = (str: any) => {
  if (typeof str !== 'string') return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
};

function extractMessage<T extends ValidationType>(
  key: string,
  validation: Validation<T> | undefined,
  name: any,
  defaultMessage: (name: string, value: T) => string,
) {
  const nameFormatted = firstLetterToUpperCase(name);

  if (validation instanceof Array) {
    return typeof validation[1] === 'function'
      ? validation[1](validation[0])
      : validation[1];
  }

  if (validation !== undefined)
    return defaultMessage(nameFormatted, validation);

  return `${nameFormatted} is not valid. (${key})`;
}

export default function useMessages<T extends Fields>(
  fields: T,
  errors: Errors<T>,
): Messages<T> {
  const extractMessages = useCallback(
    (name: Name<T>, key: keyof Error) => {
      const nameFormatted = firstLetterToUpperCase(name);
      const field = fields[name];

      // !Should never happen.
      if (typeof field === 'string')
        throw new Error(`Field ${name} has no validation requirements`);

      switch (key) {
        case 'required':
          return typeof field.required === 'string'
            ? field.required
            : `${nameFormatted} is required.`;
        case 'maxLength':
          return extractMessage(
            'maxLength',
            field.maxLength,
            name,
            (n, v) => `${n} must be at most ${v} characters long.`,
          );
        case 'minLength':
          return extractMessage(
            'minLength',
            field.minLength,
            name,
            (n, v) => `${n} must be at least ${v} characters long.`,
          );
        case 'validate':
          return extractMessage(
            'validate',
            field.validate,
            name,
            n => `${n} is not valid.`,
          );
        case 'is':
          return extractMessage(
            'is',
            field.is,
            name,
            (n, v) => `${n} must be a valid ${v}.`,
          );
        default:
          throw new Error(`Unknown error key: ${key}`);
      }
    },
    [fields],
  );

  const getMessages = useCallback(
    (name: Name<T>, error: Error) => {
      return Object.entries(error).reduce((acc, [key, value]) => {
        if (!value) return acc;

        return {
          ...acc,
          [key]: extractMessages(name, key as keyof Error),
        };
      }, {} as Message);
    },
    [extractMessages],
  );

  const messages = useMemo(() => {
    return Object.entries(errors).reduce((m, [name, error]) => {
      return {
        ...m,
        [name]: getMessages(name, error),
      };
    }, {} as Messages<T>);
  }, [errors, getMessages]);

  return messages;
}
