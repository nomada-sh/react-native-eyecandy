import deepmerge from 'deepmerge';

import { MergeThemeColorsOptions } from './types';

export default function mergeColors<T>({
  colors,
  defaultColors,
  ...variables
}: MergeThemeColorsOptions<T>): T {
  if (colors instanceof Function) {
    const newColors = colors(variables);

    return deepmerge(defaultColors, newColors as Partial<T>);
  }

  if (colors) {
    return deepmerge(defaultColors, colors as Partial<T>);
  }

  return defaultColors;
}
