import { ThemeTypography, CreateThemeTypographyOptions } from './types';
import deepmerge from 'deepmerge';

import defaultTypography from './Typography';

export default function createPalette(
  typography?: CreateThemeTypographyOptions,
) {
  if (typography)
    return deepmerge(defaultTypography, typography) as ThemeTypography;

  return defaultTypography;
}
