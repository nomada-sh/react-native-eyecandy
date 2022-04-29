import { merge } from '../utils';

import { MergeThemeColorsOptions } from './types';

export default function mergeColors<T>({
  colors,
  defaultColors,
  ...variables
}: MergeThemeColorsOptions<T>): T {
  const baseColors: T = JSON.parse(JSON.stringify(defaultColors));

  if (colors instanceof Function) {
    const newColors = colors(variables);

    return merge(baseColors, newColors);
  }

  if (colors) {
    return merge(baseColors, colors);
  }

  return baseColors;
}
