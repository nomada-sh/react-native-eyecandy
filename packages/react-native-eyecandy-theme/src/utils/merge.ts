import { DeepPartial } from '../types';

/**
 * @param target is mutated.
 * @param source undefined values are ignored.
 */
export default function merge<T extends Record<string, any>>(
  target: T,
  source: DeepPartial<T>,
): T {
  Object.keys(source).forEach((key: keyof T) => {
    const targetValue = target[key];
    const sourceValue = source[key] as any;

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (
      typeof targetValue === 'object' &&
      typeof sourceValue === 'object'
    ) {
      target[key] = merge(
        Object.assign({}, targetValue),
        sourceValue as DeepPartial<T[keyof T]>,
      );
    } else if (sourceValue !== undefined) {
      target[key] = sourceValue;
    }
  });

  return target as T;
}
